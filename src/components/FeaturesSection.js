import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Features from "./Features";
import "./FeaturesSection.scss";

function FeaturesSection(props) {
  return (
    <Section
      color={props.color}
      size={props.size}
      backgroundImage={props.backgroundImage}
      backgroundImageOpacity={props.backgroundImageOpacity}
    >
      <div className="container">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={3}
          spaced={true}
          className="has-text-centered"
        />
        <div className="FeaturesSection__box box">
          <Features
            columns={2}
            imageRatio="4by3"
            items={[
              {
                title: "Custom Forms",
                body:
                  "We work with you to create a page that you and your customers will love.",
                image: "forms.svg",
              },
              {
                title: "Data Storage",
                body:
                  "Forget the paper sheets - we'll store your information for you so you never have to worry about access or security.",
                image: "following.svg",
              },
              {
                title: "Simple Interface",
                body:
                  "Texting shouldn't be complicated. We're here to make powerful tools easy for you to learn and use.",
                image:
                  "mobile.svg",
              },
              {
                title: "Efficient Organization",
                body:
                  "Don't send shot specials to the wrong people... select who to message by their responses to your form.",
                image:
                  "organization.svg",
              },
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

export default FeaturesSection;
