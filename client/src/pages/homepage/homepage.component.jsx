/** @format */

import React, { Fragment, Component } from "react";

import CustomButton from "../../components/custom-button/custom-button.component";
import CollectionItems from "../../components/collection-item/collection-item.component";
import "./homepage.styles.scss";

const bolder = {
  fontWeight: 700,
};

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bestSellers: [
        {
          id: 1,
          linkUrl: "",
          imageUrl: "/images/homepage/sogra-green.png",
        },
        {
          id: 2,
          linkUrl: "",
          imageUrl: "/images/homepage/sogra-lava.png",
        },
        {
          id: 3,
          linkUrl: "",
          imageUrl: "/images/homepage/madheshwar.png",
        },
      ],
    };
  }

  render() {
    return (
      <Fragment>
        <img src="/images/homepage/l.jpg" alt="error" className="img-fluid-2" />
        <div className="landing-quote">
          <p>
            "We are like Tea, we don't know our strength until we're in hot
            water"
          </p>
          <span>
            <b>- SISTER BUSCHE</b>
          </span>
        </div>
        <div className="img-container">
          <img
            src="/images/homepage/freshest_tea_leaf.png"
            alt="freahest tea leafs"
            className="img-fluid"
          />
          <div className="freashest-tea-content">
            <h1>We bring you the freshest tea</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam, dolorem mollitia. Nemo ut incidunt ipsum temporibus
              iure fugiat rem atque neque voluptate asperiores, magnam eaque
              fuga cum doloribus dignissimos nisi?
            </p>
          </div>
        </div>
        <div className="heading-text">
          <h1>from the plantation to your cup</h1>
        </div>
        <div className="img-fluid-3">
          <img
            src="/images/homepage/plantation_to_cup.png"
            alt="From Plantation to Your Cup"
          />
        </div>
        <div className="heading-text">
          <p>Only the best leaves are harvested from our tea gardens</p>
        </div>
        <div className="img-container">
          <img
            src="/images/homepage/tea_leafs.png"
            alt="tea leafs"
            className="img-fluid"
          />
          <div className="order-yours-content">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam, dolorem mollitia. Nemo ut incidunt ipsum temporibus
              iure fugiat rem atque neque voluptate asperiores, magnam eaque
              fuga cum doloribus dignissimos nisi?
            </p>
            <h1>More than a lakh cups sold countrywide</h1>
            <div className="margin-30">
              <CustomButton>Order yours today</CustomButton>
            </div>
          </div>
        </div>
        <div className="heading-text">
          <h1 style={bolder}>Explore Our Bestsellers</h1>
        </div>
        <div className="margin-30">
          <CustomButton shopNow>Shop Now</CustomButton>
        </div>
        <div className="collection-preview">
          {this.state.bestSellers.map(({ id, ...otherProps }) => (
            <CollectionItems key={id} {...otherProps} />
          ))}
        </div>
        <div className="img-container">
          <img src="/images/homepage/kettle.png" alt="" className="img-fluid" />
          <div className="image-content3">
            <h1>We make exquisite tea accessible to the masses</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam, dolorem mollitia. Nemo ut incidunt ipsum temporibus
              iure fugiat rem atque neque voluptate asperiores, magnam eaque
              fuga cum doloribus dignissimos nisi?
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Homepage;
