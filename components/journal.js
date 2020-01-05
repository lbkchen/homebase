import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTshirt } from "@fortawesome/free-solid-svg-icons";

import API from "../utils/api";

import "../styles/styles.sass";

class Journal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggledOnce: false,
      isOpen: false,
    };
  }

  handleToggleOpen = () => {
    const { onToggleOpenJournal } = this.props;
    const newState = !this.state.isOpen;
    onToggleOpenJournal && onToggleOpenJournal(newState);
    this.setState({ isOpen: newState, toggledOnce: true });
  };

  render() {
    return (
      <div
        className={`${classNames("journal", {
          "journal--expanded": this.state.isOpen,
        })}`}
      >
        <div className="journal-line journal-topLine">
          <div className="journal-badge" onClick={this.handleToggleOpen}></div>
        </div>

        <div
          className={`${classNames("journal-line journal-bottomLine ", {
            "journal-bottomLine--initialState": !this.state.toggledOnce,
            "journal-bottomLine--isOpen": this.state.isOpen,
          })}`}
        >
          <div
            className={`${classNames("journal-contents", {
              "journal-contents--initialState": !this.state.toggledOnce,
              "journal-contents--isOpen": this.state.isOpen,
            })}`}
          >
            Hey this is the one
          </div>
        </div>

        <style jsx>{`
          .journal {
            position: relative;
            width: 100%;
            height: 2px;
          }

          .journal-badge {
            position: absolute;
            top: 0px;
            left: 50%;
            height: 24px;
            width: 24px;
            border: 1px solid #dbdbdb;
            border-radius: 50%;
            background-color: #ffffff;
            transform: translate(-50%, -50%);
            z-index: 999;
          }

          .journal-line {
            background-color: #ededed;
            height: 1px;
            width: 100%;
          }

          .journal-bottomLine {
            will-change: transform;
            transform-origin: top;
            animation-duration: 300ms;
            animation-timing-function: ease-in-out;
            animation-fill-mode: forwards;

            animation-name: journalBottomLineClose;
          }

          .journal-bottomLine--initialState {
            animation-name: none;
          }

          .journal-bottomLine--isOpen {
            animation-name: journalBottomLineOpen;
          }

          .journal-contents {
            will-change: transform;
            height: 100%;

            transform-origin: top;
            animation-duration: 300ms;
            animation-delay: -300ms;
            animation-timing-function: ease-in-out;
            animation-fill-mode: forwards;

            animation-name: journalContentsClose;
          }

          .journal-contents--initialState {
            animation-name: none;
          }

          .journal-contents--isOpen {
            animation-name: journalContentsOpen;
          }

          @keyframes journalBottomLineOpen {
            0% {
              transform: scaleY(1);
            }
            100% {
              transform: scaleY(200);
            }
          }

          @keyframes journalBottomLineClose {
            0% {
              transform: scaleY(200);
            }
            100% {
              transform: scaleY(1);
            }
          }

          @keyframes journalContentsOpen {
            0% {
              transform: scaleY(1);
            }
            100% {
              transform: scaleY(0.005);
            }
          }

          @keyframes journalContentsClose {
            0% {
              transform: scaleY(0.005);
            }
            100% {
              transform: scaleY(1);
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Journal;
