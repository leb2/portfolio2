import Page from "../../shared/page";
import AnkiViz from "./anki_viz";
import './styles.scss'

const BlogAnki = () => {
  return (
    <Page className="blog-page blog-anki">
      <div>
        <div className="title">
          This is every Japanese word that I know and how likely I am to know it, as predicted by a
          neural network.
        </div>
        <h1>
          <p className="mb-5">
            Hover over the visualization to see statistics about each word! And scroll down to read more about this
            project.
          </p>
        </h1>
        <AnkiViz />
      </div>
    </Page>
  )
}

export default BlogAnki
