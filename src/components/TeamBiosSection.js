import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import TeamBios from "./TeamBios";

function TeamBiosSection(props) {
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
        <TeamBios
          people={[
            {
              avatar: "https://scontent.fapa1-2.fna.fbcdn.net/v/t1.0-9/104481546_1659183077565751_972696088281917027_n.jpg?_nc_cat=107&ccb=2&_nc_sid=174925&_nc_ohc=IpIr532aqpoAX8Deu9O&_nc_ht=scontent.fapa1-2.fna&oh=00d228243ffda054c7005aba53e4e78d&oe=5FE15F42",
              name: "Matthew Hendren",
              role: "Customer Relations",
              bio:
                "With more than 15 years of experience in small business marketing, I've seen a lot. I want to use all of that life to help you and your team communicate your customers so they're not left in the dark.",
            },
            {
              avatar: "https://scontent.fapa1-1.fna.fbcdn.net/v/t1.0-9/123343144_3336092059777870_309158529883948555_o.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_ohc=vCe45a9FibQAX9IeNzq&_nc_oc=AQlEGDDZhI1y4MYrF2Mws_XC4G6KHrFqA5f82IJ-Om4wpDn2a24dcxkWB7u2H_joY95qWJ1d9v8xO5KpXF-a06pG&_nc_ht=scontent.fapa1-1.fna&oh=207b49cf3f107aa19378f6dde6692f9d&oe=5FE0874D",
              name: "Rylie Hendren",
              role: "Data Engineer",
              bio:
                "I've helped companies scale by millions in valuation by creating data infrastructure and analysis. Contact me with ideas about how to use your new info super powers!",
            },
          ]}
        />
      </div>
    </Section>
  );
}

export default TeamBiosSection;
