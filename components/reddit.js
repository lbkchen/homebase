import React from "react";

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
    console.log(response);
    this.setState({ sections: response.sections });
  }

  render() {
    if (this.state.sections.length === 0) {
      return null;
    }

    return (
      <>
        {this.state.sections.map((section, i) => {
          const posts = section.posts.map((post, j) => (
            <>
              <a href={post.url}>Link</a>
              <div key={`post-${j}`}>{post.title}</div>
            </>
          ));

          return (
            <div key={`section-${i}`}>
              <div>{section.name}</div>
              <div>{posts}</div>
            </div>
          );
        })}
      </>
    );
  }
}

export default RedditPosts;
