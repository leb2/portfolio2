import React from 'react';
import BuiltWith from "../built_with/built_with";

const Sections = () => {
  return (
    <div className="sections">
      <div className="section padded">
        <div className="section-inner">

          <div className="row section-row">
            <div className="col-md-5">
              <div className="image-section mr-4">
                <img src="images/stalkers.gif" />
              </div>
            </div>
            <div className="col-md-7">
              <div className="paragraph-header">
                RL w/ Starcraft II
              </div>
              <p>
                While working under Dr. Michael Littman, I developed
                a reinforcement learning agent to play Starcraft II minigames,
                using Actor Critic with <a href="https://arxiv.org/abs/1506.02438">Generalized Advantage Estimation</a>. In
                the gif to the left, you can see that the AI
                learned to teleport its units (the blue ones) away when they were becoming weak, rediscovering a technique used by professionals called "rotating".
                In fact, when I tried to play this minigame myself, I usually couldn't even score as well as my agent!
              </p>
              <BuiltWith tags={["Python", "Tensorflow"]} githubUrl="https://github.com/leb2/starcraft-rl" />
            </div>
          </div>

          <div className="row section-row">
            <div className="col-md-7">
              <div className="paragraph-header">
                <a href="https://sketchy.cs.brown.edu/">Sketchy</a>
              </div>
              <p>
                Sketchy is a web app that I worked on while I was a member of the Brown HCI Lab, led by Dr. Jeff Huang.
                It allows students in a classroom to gain inspiration from each other's sketches in real time, and features
                an admin interface where instructors can view all of the sketches in the room happening live. We
                ended up publishing <a href="https://dl.acm.org/doi/10.1145/3415243">this paper</a> to CSCW with results gathered from
                using the app in a classroom setting with 90 students.
              </p>
              <BuiltWith tags={["Javascript", "React", "Node.js", "Mongodb"]} githubUrl="https://github.com/brownhci/sketchy-1.0" />
            </div>
            <div className="col-md-5">
              <div className="image-section ml-4">
                <img src="images/sketchy.png" />
              </div>
            </div>
          </div>

          <div className="row section-row">
            <div className="col-md-5">
              <div className="image-section mr-4 cover">
                <img src="images/token.png" className="resized" />
              </div>
            </div>
            <div className="col-md-7">
              <div className="paragraph-header">
                <a href="http://brendanmle.com/token">Token Gifts</a>
              </div>
              <p>
                During my senior year at Brown, I teamed up with a group of students to create a service where
                students could gift each other alcoholic drinks. We partnered with the Grad Center Bar on
                Brown's campus, whose owner allowed drinks from the bar to be purchased through the app,
                and redeemed inside of the bar. We processed over $100 of sales
                on our opening weekend, but unfortunately had to shut down shortly after due to covid.
              </p>
              <BuiltWith tags={["Javascript", "Vue.js", "Node.js", "Mongodb"]} />
            </div>
          </div>

          <div className="row section-row">
            <div className="col-md-7">
              <div className="paragraph-header">
                <a href="http://brendanmle.com/old">Some other stuff</a>
              </div>
              <p>
                I did a lot of web development when I was in high school, including some freelance work. This was the
                porfolio website that I used to attract clients. It's fairly out of date though, so some links may be broken, sorry!
              </p>
            </div>
            <div className="col-md-5">
              <div className="image-section cover ml-4">
                <img src="images/surveyapp.png" className="resized" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Sections;
