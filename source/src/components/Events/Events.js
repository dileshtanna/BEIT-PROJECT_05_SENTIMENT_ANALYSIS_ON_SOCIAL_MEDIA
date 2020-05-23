import React, { Component } from "react";

export default class Events extends Component {
  render() {
    return (
      <section>
        <div className="title">
          <h2>
            <a href="#">EVENTS</a>
          </h2>
        </div>
        <ul className="posts">
          <li>
            <article>
              <header>
                <h3>
                  <a href="#">Event1</a>
                </h3>
                <time className="published" dateTime="2015-10-20">
                  October 20, 2015
                </time>
              </header>
              <a href="#" className="image">
                <img src="images/pic08.jpg" alt="" />
              </a>
            </article>
          </li>
          <li>
            <article>
              <header>
                <h3>
                  <a href="#">Event2</a>
                </h3>
                <time className="published" dateTime="2015-10-15">
                  October 15, 2015
                </time>
              </header>
              <a href="#" className="image">
                <img src="images/pic09.jpg" alt="" />
              </a>
            </article>
          </li>
          <li>
            <article>
              <header>
                <h3>
                  <a href="#">Event3</a>
                </h3>
                <time className="published" dateTime="2015-10-10">
                  October 10, 2015
                </time>
              </header>
              <a href="#" className="image">
                <img src="images/pic10.jpg" alt="" />
              </a>
            </article>
          </li>
          <li>
            <article>
              <header>
                <h3>
                  <a href="#">Event4</a>
                </h3>
                <time className="published" dateTime="2015-10-08">
                  October 8, 2015
                </time>
              </header>
              <a href="#" className="image">
                <img src="images/pic11.jpg" alt="" />
              </a>
            </article>
          </li>
          <li>
            <article>
              <header>
                <h3>
                  <a href="#">Event5</a>
                </h3>
                <time className="published" dateTime="2015-10-06">
                  October 7, 2015
                </time>
              </header>
              <a href="#" className="image">
                <img src="images/pic12.jpg" alt="" />
              </a>
            </article>
          </li>
        </ul>
      </section>
    );
  }
}
