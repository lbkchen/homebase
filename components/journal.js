import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTshirt,
  faPenFancy,
  faFeatherAlt,
} from "@fortawesome/free-solid-svg-icons";

import API from "../utils/api";

import "../styles/styles.sass";

class Journal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  handleToggleOpen = () => {
    const newState = !this.state.isOpen;
    this.setState({ isOpen: newState });
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
              z-index: -1;
              width: 100%;
              height: 100%;
              opacity: 0;
              border-radius: 5px;
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
          `}
        </style>
      </div>
    );
  }
}

export default Journal;
