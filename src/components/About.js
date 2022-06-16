import React from "react";

const About = (props) => {
  return (
    <div className="container">
      <div className="jumbotron my-3 ">
        <h2 className="display-4">About This React App</h2>

        <p className="lead">
          This is web app in Made in React by &nbsp;
          <a
            href="https://www.instagram.com/its_.monster._/"
            target="_blank"
            rel="noreferrer"
          >
            Himanshu Gunwant
          </a>
        </p>
        <hr className="my-4" />
        <p>
          <b>Contact Me :</b>
          <br />
          Email : <b>himanshu.20bca0025@dbit.ac.in</b> <br />
        </p>
        <ul>
          <li>
            <a
              href="https://www.facebook.com/anshu.monster/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/its_.monster._/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://github.com/monster-anshu"
              target="_blank"
              rel="noreferrer"
            >
              Git-Hub
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
