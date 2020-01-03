import React from "react";
import Head from "next/head";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import {
  faProductHunt,
  faHackerNews,
} from "@fortawesome/free-brands-svg-icons";

import RedditPosts from "../components/reddit";

import "../styles/styles.sass";

class Home extends React.Component {
  renderNewsMenu() {
    return (
      <div className="panel is-info">
        <p className="panel-heading">News</p>
        <a className="panel-block" href="https://www.bbc.com/" target="_blank">
          <span className="panel-icon">
            <FontAwesomeIcon icon={faNewspaper} />
          </span>
          BBC News
        </a>
        <a
          className="panel-block"
          href="https://www.nytimes.com/"
          target="_blank"
        >
          <span className="panel-icon">
            <FontAwesomeIcon icon={faNewspaper} />
          </span>
          New York Times
        </a>
        <a
          className="panel-block"
          href="https://news.ycombinator.com/"
          target="_blank"
        >
          <span className="panel-icon">
            <FontAwesomeIcon icon={faHackerNews} />
          </span>
          Hacker News
        </a>
        <a
          className="panel-block"
          href="https://www.producthunt.com/"
          target="_blank"
        >
          <span className="panel-icon">
            <FontAwesomeIcon icon={faProductHunt} />
          </span>
          Product Hunt
        </a>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <section className="hero">
          <div className="hero-body main-banner">
            <div className="greeting-container">
              <div className="greeting">Hello, Ken.</div>
              <div className="greeting-date">{moment().format("LL")}</div>
            </div>
          </div>
        </section>

        <section className="section container">
          <div className="columns">
            <div className="column">
              <RedditPosts />
            </div>
            <div className="column">Hey</div>
            <div className="column">{this.renderNewsMenu()}</div>
          </div>
        </section>

        <div className="hero">
          <div className="buttons">
            <button className="button is-primary">Primary</button>
            <button className="button is-link">Link</button>
          </div>

          <div className="buttons">
            <button className="button is-info is-light">Info</button>
            <button className="button is-success is-light">Success</button>
            <button className="button is-warning is-light">Warning</button>
            <button className="button is-danger is-light">Danger</button>
          </div>
        </div>

        <style jsx>{`
          .main-banner {
            position: relative;
            background-image: url("/images/tree-wallpaper.jpg");
            height: 400px;
            background-position: center bottom;
            background-repeat: no-repeat;
            background-size: cover;
            box-shadow: inset 0 -24px 16px 0px white;
          }

          .greeting-container {
            position: absolute;
            bottom: 0px;
            left: 50%;
            transform: translateX(-50%);
            color: black;
            font-size: 18px;
            font-weight: 300;
            padding: 24px 48px;
            text-align: center;
            background-color: white;
            border-top-right-radius: 36px;
            border-top-left-radius: 36px;
            box-shadow: 0 0 24px 24px white;
          }

          .greeting {
            font-weight: 600;
          }

          .greeting-date {
            font-weight: 300;
            font-size: 24px;
          }
        `}</style>
      </div>
    );
  }
}

export default Home;
