import Page from "../../shared/page";
import AnkiViz from "./anki_viz";
import AnkiChart from './anki_chart';
import MathJax from 'react-mathjax';
import './styles.scss'
import BuiltWith from "../../built_with/built_with";

const BlogAnki = () => {
  return (
    <Page className="blog-page blog-anki">
      <div>
        <div className="header">
          <div className="title">
            I trained a neural network to predict how well I knew every word in my Japanese vocabulary
          </div>
          <div className="date">
            May 28, 2021
          </div>
        </div>
        <AnkiChart />
        <p>
          I trained a neural network to predict the <strong>stability</strong> of my memory of every Japanese word that I
          know. The stability is a measure of how deep a word is in my long term memory, so the higher the stability,
          the longer I am likely to remember it for. The graph above is interactive!
        </p>
        <h5>Background</h5>
        <p>
          I started trying to learn Japanese in 2018, and after doing a bit of research online, I quickly found
          an app called <a href="https://apps.ankiweb.net/">Anki</a>. It was a flashcard app based on
          the <a href="https://www.supermemo.com/en/archives1990-2015/english/ol/sm2">SM-2 algorithm</a> that
          was designed to optimally schedule reviews of a card, such that there was about a 90% chance of remembering
          that card when you next reviewed it. I immediately fell in love with the app. My plan was to grind flashcards with Anki
          and memorize ton of Japanese words using brute force. Then, I would hopefully be well equipped to start consuming
          content and learning the rest through immersion.
        </p>
        <p>
          So far, I haven't exactly been successful. Since embarking on this journey and as of June 2020, I have done <b>656,808 flashcard reviews</b>, spending a
          total of <strong>1300 hours</strong> in the process. I now know about 8,000 words, but I haven't really made significant progress
          in actually understanding stuff. I can sort of read, but each word takes a few seconds for me to
          decipher, making reading incredibly slow and painful. Below is a graph of the number of reviews I did per month, for the past 3 years.
        </p>

        <div className="img-container">
          <img src="/images/anki_stats.png" width="600" />
        </div>

        <p>
          As you can see, there is a lot of red, indicating failed reviews. There was also a period in the middle where
          I just had quit for a few months. Then I got back into it after realizing that I had nothing better to do.
          I decided to start this project to try and figure out which words were causing the most trouble.
          To do this, I trained
          an <a href="https://colah.github.io/posts/2015-08-Understanding-LSTMs">LSTM</a> model
          to predict how likely I am to to remember a word, given the entire review history of the word.
          The cards in the visualization below are from the
          the <a href="https://ankiweb.net/shared/info/1880390099">Core 2k/6k</a> vocab deck, which contains the most common
          6,000 Japanese words, which I believe are gathered from various newspaper sources.
        </p>

        <h5>Visualizations</h5>
        <p>
          The visualization below shares the same data with the chart visualization. Each data point is a single word, or card
          in the deck. Each word has some statistics calculated from it. Some of these are predicted by the neural network, and some
          are calculated from my review history. You can click on a cell on the visualization to see statistics about each word.
          Scroll down to see a more detailed explanation.
        </p>

        <AnkiViz />

        <h5>How it works</h5>
        <p>
          According
          to <a href="https://en.wikipedia.org/wiki/Forgetting_curve">forgetting theory</a>, the odds of remembering
          something exponentially decreases with time since last recalling it, according to the equation:
          <MathJax.Provider>
            <MathJax.Node formula={'R = e^{t/S}'} />
          </MathJax.Provider>
        </p>
        <p>
          Where <em>t</em> is the time since the last review, <em>R</em> is the probability of recall,
          and s is the <strong>stability</strong>. Intuitively, the stability is sort of a measure of how ingrained in my brain
          a piece of vocab was. The higher the stability, the longer the memory will take to decay. The goal of the
          model is to predict the stability of a piece of vocab.
        </p>

        <p>
          However, when I tried training with this equation directly, the model performed very poorly.
          In order to get better results, I used the following modified version of this equation:
        </p>
          <p>
            <MathJax.Provider>
              <MathJax.Node formula={'R = A + (1 - A) * (1 - B) * e^{-t/S}'} />
            </MathJax.Provider>
          </p>
        <p>
          Where <em>A</em> is the base success rate, and <em>B</em> is the base fail rate.
          I had the network take in as input the review history of the card as a time series, including whether each
          review was a pass or a fail, and the log time between each review. It would then be
          trained to predict values for <em>A</em>, <em>B</em>, and <em>S</em>.
        </p>
        <p>
          Intuitively, <em>B</em> is the base
          failure rate, and A is the base success rate. I found that during my studies, I would sometimes get a card
          wrong immediately after seeing it. This would usually be because I had confused it with another card. Allowing
          the network to model this behavior prevents it from being unreasonably punished for predicting
          higher values for the stability. Likewise, A is the base recall rate, or the value that the exponential
          asymptotically approaches as t goes to infinity. This prevents the model from being overly punished for predicting short intervals,
          and allows it to account for factors such as my seeing a card outside of Anki.
        </p>
        <p>
          The model was trained using
          binary entropy loss between the actual review result and the predicted probability of recall, where the predicted probability of recall
          was calculated using the above equation, evaluated with the predicted values of A, B, and S, and the actual time since the previous review for t.
        </p>

        <p>
          An example of a forgetting curve predicted by this model:
        </p>
        <div className="img-container">
          <img src="/images/forgetting_graph.png" />
        </div>
        <p>
          This model receives a ROC score of 0.67 on validation data, which isn't considered great for a classifier.
          But this is partly because it has to "compete" against the Anki scheduling algorithm, which was scheduling my reviews
          and was already trying to predict the recall rate. In other words, if the Anki algorithm were perfect at predicting when
          my recall rate had dropped to 90%, then there would be nothing further to predict. The fact that there is any
          discrimination at all shows that the Anki algorithm is non-optimal (or that I missed some days of reviews, which is also true).
        </p>

        <p>
          Below is a calibration plot for the model, which is sort of like a predicted-actual plot for binary predictions.
          Having predictions close to the x = y line means that the model is unbiased. That is, out of all of the times
          it predicts a chance of recall of, for example, <em>80%</em>, in 80% of those reviews I would have actually recalled the card.
          The model seems to have a harder time predicting when I will fail a card, but this is probably just because I
          get most of my reviews correct
        </p>

        <div className="img-container">
          <img src="/images/calibration_plot.png" width="500" />
        </div>

        <h5>Takeaways</h5>
        <p>
          It definitely seems like a small fraction of my cards were consuming majority of my review time. There were a bunch
          of words that only took me 1-2 minutes of total study time to memorize with high stability. While for other words
          I would spend over 30 minutes on reviews, and still have a low chance of remembering. This phenomenon is sort
          of like the <a href="https://en.wikipedia.org/wiki/Pareto_principle">80-20 rule</a>, but in my case it was
          the 65-35 rule. That is, 35% of of my cards would consume about 65% of my time.
        </p>
        <p>
          Also, many of the words that I knew really well were just loanwords from English. These are usually written using the
          katakana alphabet, and look like エアコン (air conditioning), カタログ (catalog), アンテナ (antenna). Compare this to
          words written in the <em>Kanji</em> writing system, for words like 報告 (report), 勤勉 (diligence).
        </p>
        <p>
          The main cause of failing a card for me is probably getting it mixed up with another cards. For example, I usually
          mix up the word 体験 (experience) with 実験 (experiment), since the both start with "experi" in English, and
          in Japanese they both end with 験. Another pair that I frequently confuse are 鑑賞 (viewing, enjoyment of art),
          and 観賞 (ornamental). This is because they both are pronounced as <em>kansho</em>, and they have obscure
          meanings in English.
        </p>

        <h5>Improving the Anki Algorithm</h5>
        <p>
          With a model like this one, it is actually possible to create a new scheduling algorithm, similar to the SM-2 algorithm
          which is used by Anki. Since the model produces an exponential equation as its output, we can solve this
          equation with a fixed target recall rate to figure out what the interval should be. For example, if you wanted
          a 90% chance of remembering a word, you would reschedule it to:
        </p>
        <p>
          <MathJax.Provider>
            <MathJax.Node formula={'t = S * log\\bigg(-\\frac{(A-1)(B-1)}{A - 0.9}\\bigg)'} />
          </MathJax.Provider>
        </p>
        <p>
        </p>
        <p>
          This kind of scheduling algorithm has the potential to be more accurate than Anki's scheduling algorithm.
          Anki implicitly predicts a <em>stability</em> when it schedules a card with an interval. The Anki algorithm
          also has a notion of <em>Ease</em>, which determines how much the stability should increase
          by every time you get a review correct. And when you get a review incorrect, Anki resets the interval to 0
          by default.
        </p>
        <p>
          In contrast to Anki, a model based algorithm like this one
          makes a prediction about what the stability is after you get a review
          correct or incorrect, using past data, in order to most accurately model your odds of remembering the card.
          This would ideally result in better recall, or fewer reviews in the long term.
        </p>
        <p>
          This is probably a project that I will pursue in the future, but there are some nuances that make it kind of tricky.
          First, you need a lot of data. I found that the model doesn't really generalize well between decks of different
          card types. Second is a question of training. Training is fairly CPU intensive, so it would likely have to be
          running on a dedicated server or something.
        </p>
        <div className="footer">
        </div>
        <BuiltWith
          githubUrl="https://github.com/leb2/neural-srs/blob/master/neural_srs/model/model.py"
          showPrompt
        />
      </div>
    </Page>
  )
}

export default BlogAnki
