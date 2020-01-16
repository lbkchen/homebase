import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeatherAlt } from "@fortawesome/free-solid-svg-icons";

import API from "../utils/api";

import "../styles/styles.sass";

class Journal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      text: "",
    };

    this.textarea = React.createRef();
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener(
      "keydown",
      this.handleKeydown
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isOpen && !prevState.isOpen) {
      this.setState({ text: "" });
      this.focusTextarea();
    }
  }

  focusTextarea = () => {
    this.textarea.current && this.textarea.current.focus();
  };

  blurTextarea = () => {
    this.textarea.current && this.textarea.current.blur();
  };

  postJournal() {
    // Clean text to submit
    const text = this.state.text.trim();

    text && API.postJournalEntry(this.state.text);
    this.setState({ isOpen: false, text: "" });
  }

  handleKeydown = e => {
    if (this.state.isOpen) {
      if (e.code == "Enter" && (e.ctrlKey || e.metaKey)) {
        // Cmd + Enter -- Submit journal
        e.preventDefault();
        this.postJournal();
      }
    } else {
      if (e.code === "KeyO" && (e.ctrlKey || e.metaKey)) {
        // Cmd + O -- Open journal
        e.preventDefault();
        this.handleToggleOpen();
      }
    }
  };

  handleToggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleChangeText = e => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <div
        className={`${classNames("journal", {
          "journal--isOpen": this.state.isOpen,
        })}`}
      >
        <div className="journal-badge" onClick={this.handleToggleOpen}>
          <FontAwesomeIcon icon={faFeatherAlt} />
        </div>

        <div
          className={`${classNames("journal-content", {
            "journal-content--isOpen": this.state.isOpen,
          })}`}
        >
          <textarea
            autoFocus
            className="journal-textarea"
            placeholder="What's on your mind?"
            value={this.state.text}
            onChange={this.handleChangeText}
            ref={this.textarea}
          ></textarea>
        </div>

        <style jsx>
          {`
            .journal {
              position: relative;
              width: 100%;
              height: 2px;
              border-radius: 1px;
              transition: height 0.5s ease, border-radius 0.5s ease;
              background-color: #ededed;
            }

            .journal--isOpen {
              border-radius: 5px;
              height: 200px;
            }

            .journal::after {
              content: "";
              position: absolute;
              left: 0px;
              top: 0px;
              width: 100%;
              height: 100%;
              border-radius: 5px;
              z-index: -1;
              opacity: 0;
              box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
                0 0px 0 1px rgba(10, 10, 10, 0.02);
            }

            .journal--isOpen::after {
              opacity: 1;
            }

            .journal-badge {
              position: absolute;
              top: 1px;
              left: 50%;
              height: 24px;
              width: 24px;
              border: 1px solid #dbdbdb;
              border-radius: 50%;
              background-color: #ffffff;
              color: #dbdbdb;
              padding: 5px;
              font-size: 10px;
              transform: translate(-50%, -50%);
              z-index: 999;
            }

            .journal-badge:hover {
              border: 1px solid #b8b8b8;
              color: #b8b8b8;
              cursor: pointer;
            }

            .journal-content {
              padding: 24px;
              opacity: 0;
            }

            .journal-content--isOpen {
              opacity: 1;
            }

            .journal-textarea {
              border: none;
              outline: none;
              resize: none;
              width: 100%;
              background-color: transparent;
              font-size: 18px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Journal;
