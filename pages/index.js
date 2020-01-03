import React from "react";
import Head from "next/head";

import Nav from "../components/nav";
import RedditPosts from "../components/reddit";
import API from "../utils/api";

import "../styles/styles.sass";

async function getRedditPosts() {
  const posts = await API.listRedditPosts();
  console.log(posts);
}

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <section className="hero">
      <div className="hero-body main-banner">
        <div className="greeting-container">
          <div className="greeting">Hello, Ken.</div>
          <div className="greeting-date">Today's date</div>
        </div>
      </div>
    </section>

    <section className="section hero">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Reddit</h1>
          <RedditPosts />
        </div>
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
        box-shadow: inset 0 -24px 24px 0px white;
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

      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
);

export default Home;
