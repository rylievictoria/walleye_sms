import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Pricing from "./Pricing";

function PricingSection(props) {
  return (
    <Section
      id="pricing"
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
        <Pricing
          buttonText="Select"
          items={[
            {
              id: "starter",
              name: "Starter",
              price: "75",
              perks: [
                "Low commitment",
                "$225 billed quarterly",
                "Begin to build a marketing platform",
                "6¢ per text"
              ],
            },
            {
              id: "pro",
              name: "Pro",
              price: "50",
              perks: [
                "First-priority customer service",
                "$600 billed annually",
                "Launch successful campaigns with an established audience",
                "6¢ per text",
              ],
            },
          ]}
        />
      </div>
    </Section>
  );
}

export default PricingSection;
