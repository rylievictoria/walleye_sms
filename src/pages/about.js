import React from "react";
import HeroSection2 from "./../components/HeroSection2";
import StatsSection from "./../components/StatsSection";
import TeamBiosSection from "./../components/TeamBiosSection";
import CtaSection from "./../components/CtaSection";
import { useRouter } from "./../util/router.js";

function AboutPage(props) {
  const router = useRouter();

  return (
    <>
      <HeroSection2
        color="white"
        size="large"
        backgroundImage=""
        backgroundImageOpacity={1}
        title="We help you get in touch"
        subtitle="Send shot specials, discounts, event invites, and other important notifications with just a few clicks and concierge customer service."
      />
      <StatsSection
        color="light"
        size="medium"
        backgroundImage=""
        backgroundImageOpacity={1}
        items={[
          {
            title: "Messages",
            stat: "15k",
          },
          {
            title: "Clients",
            stat: "241",
          },
          {
            title: "Years",
            stat: "15",
          },
        ]}
      />
      <TeamBiosSection
        color="white"
        size="medium"
        backgroundImage=""
        backgroundImageOpacity={1}
        title="Meet the Team"
        subtitle=""
      />
      <CtaSection
        color="primary"
        size="medium"
        backgroundImage=""
        backgroundImageOpacity={1}
        title="Make the leap!"
        buttonText="Let's do this"
        buttonOnClick={() => {
          // Navigate to pricing page
          router.push("/pricing");
        }}
      />
    </>
  );
}

export default AboutPage;
