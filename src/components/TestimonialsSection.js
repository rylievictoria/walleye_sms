import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Testimonials from "./Testimonials";

function TestimonialsSection(props) {
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
        <Testimonials
          items={[
            {
              avatar: "https://media-exp1.licdn.com/dms/image/C4E03AQHR7-oWt9tPww/profile-displayphoto-shrink_800_800/0?e=1611792000&v=beta&t=eHgByTpfZ9CyiTa8r8An7ozvul9CtQwInk37SrmOa3U",
              name: "Jordan Laster",
              quote: "A great value. It's so simple for me to contact my followers.",
              company: "Violet Inc.",
            },
          ]}
        />
      </div>
    </Section>
  );
}

export default TestimonialsSection;
