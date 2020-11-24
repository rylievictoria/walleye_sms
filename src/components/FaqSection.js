import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Faq from "./Faq";

function FaqSection(props) {
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
        <Faq
          items={[
            {
              question: "How do I contact you?",
              answer:
                "See the contact page. Otherwise email walleye.sms@gmail.com for technical or customer support questions.",
            },
            {
              question: "Can I schedule messages to send at a later date?",
              answer:
                "Not yet, but we're working hard to bring you these priority features.",
            },
            {
              question: "Do you secure my data?",
              answer:
                "Using Stripe for payments, Firebase for storage, and Firestore for authentication, you can be sure that your information will be for your eyes only.",
            },
          ]}
        />
      </div>
    </Section>
  );
}

export default FaqSection;
