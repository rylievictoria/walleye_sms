import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Clients from "./Clients";

function ClientsSection(props) {
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
        <Clients
          items={[
            {
              name: "Brigid",
              image: "https://www.name-doctor.com/nomi.png/9064.png",
              width: "150px",
            },
            {
              name: "Fox's Pub",
              image:
                "https://scontent.fapa1-2.fna.fbcdn.net/v/t1.0-9/64726558_431288677463576_6751661591147577344_n.jpg?_nc_cat=105&ccb=2&_nc_sid=85a577&_nc_ohc=dlpRA0FJ9tIAX9Bex52&_nc_oc=AQn6FsmUVYcA7cFLb35Z3zdTSR-wksjUfHdGq1v5Y1VZg0t_095mfWddoE9kX6ZNGzvj9fAarep8QklnEb5oTIxy&_nc_ht=scontent.fapa1-2.fna&oh=fd955fe35a60b03e60f08da87093d0a0&oe=5FCC3E91",
              width: "110px",
            },
            {
              name: "Big Shotz",
              image:
                "https://static.wixstatic.com/media/9c2586_f3c9feff5e5d48c6a8f391e03d52c08e~mv2.jpg/v1/fill/w_570,h_148,al_c,lg_1,q_80/Final%20logo%20design%20big%20shotz_JPG.webp",
              width: "175px",
            },
          ]}
        />
      </div>
    </Section>
  );
}

export default ClientsSection;
