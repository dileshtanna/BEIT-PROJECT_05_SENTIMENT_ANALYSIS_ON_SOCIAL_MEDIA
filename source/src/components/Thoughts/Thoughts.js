import React, { Component } from "react";

export class Thoughts extends Component {
  render() {
    const { score } = this.props;
    let imageType,
      extension = "";
    console.log(score);
    if (score >= 0) {
      imageType = "happy";
      extension = "jpg";
    } else {
      imageType = "sad";
      extension = "jpeg";
    }
    return (
      <section>
        <div className="mini-posts">
          <div className="title">
            <h2>
              <a href="#">Thoughts</a>
            </h2>
          </div>
          {/* <!-- Mini Post --> */}
          <article className="mini-post">
            <a href="#" className="image">
              <img src={`images/${imageType}1.${extension}`} alt="" />
            </a>
          </article>

          {/* <!-- Mini Post --> */}
          <article className="mini-post">
            <a href="#" className="image">
              <img src={`images/${imageType}2.${extension}`} alt="" />
            </a>
          </article>

          {/* <!-- Mini Post --> */}
          <article className="mini-post">
            <a href="#" className="image">
              <img src={`images/${imageType}3.${extension}`} alt="" />
            </a>
          </article>

          {/* <!-- Mini Post --> */}
          <article className="mini-post">
            <a href="#" className="image">
              <img src={`images/${imageType}4.${extension}`} alt="" />
            </a>
          </article>
        </div>
      </section>
    );
  }
}

export default Thoughts;
