import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTshirt } from "@fortawesome/free-solid-svg-icons";

import API from "../utils/api";

import "../styles/styles.sass";

class RedditPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: [],
    };
  }

  async componentDidMount() {
    const response = await API.listRedditPosts();
    this.setState({ sections: response.sections });
  }

  render() {
    if (this.state.sections.length === 0) {
      return (
        <div className="panel">
          <p className="panel-heading">Reddit</p>
          <div className="panel-block loading-panel">
            <progress className="progress is-small is-primary" max="100">
              15%
            </progress>
            <div className="loading-text">Loading...</div>
          </div>

          <style jsx>{`
            .progress {
              margin-bottom: 0px;
            }

            .loading-text {
              margin-left: 12px;
            }
          `}</style>
        </div>
      );
    }

    return (
      <>
        {this.state.sections.map((section, i) => {
          const posts = section.posts.map((post, j) => (
            <a
              className="panel-block"
              href={post.url}
              target="_blank"
              key={`section-${i}-post-${j}`}
            >
              <span className="panel-icon">
                <FontAwesomeIcon icon={faTshirt} />
              </span>
              {post.title}
            </a>
          ));

          return (
            <div className="panel" key={`section-${i}`}>
              <p className="panel-heading">{section.name}</p>
              {posts}
            </div>
          );
        })}

        <style jsx>{`
          .panel-icon {
            flex-shrink: 0;
          }
        `}</style>
      </>
    );
  }
}

export default RedditPosts;
