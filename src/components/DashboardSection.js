import React, { useState } from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import ReauthModal from "./ReauthModal";
import DashboardNav from "./DashboardNav";
import FormAlert from "./FormAlert";
import DashboardHome from "./DashboardHome";
import DashboardSms from "./DashboardSms";
import DashboardDeliveries from "./DashboardDeliveries";
import { Link, useRouter } from "./../util/router.js";
import { useAuth } from "./../util/auth.js";
import "./DashboardSection.scss";


function DashboardSection(props) {
  const auth = useAuth();
  const router = useRouter();
  const [formAlert, setFormAlert] = useState(null);

  // State to control whether we show a re-authentication flow
  // Required by some security sensitive actions, such as changing password.
  const [reauthState, setReauthState] = useState({
    show: false,
  });

  const validSections = {
    "home": true,
    "send-a-text": true,
    "deliveries": true
  };

  const section = validSections[props.section] ? props.section : "home";

  // Handle status of type "success", "error", or "requires-recent-login"
  // We don't treat "requires-recent-login" as an error as we handle it
  // gracefully by taking the user through a re-authentication flow.
  const handleStatus = ({ type, message, callback }) => {
    if (type === "requires-recent-login") {
      // First clear any existing message
      setFormAlert(null);
      // Then update state to show re-authentication modal
      setReauthState({
        show: true,
        // Failed action to try again after reauth
        callback: callback,
      });
    } else {
      // Display message to user (type is success or error)
      setFormAlert({
        type: type,
        message: message,
      });
    }
  };

  return (
    <Section color={props.color} size={props.size}>
      <div className="container">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={3}
          spaced={true}
          className="has-text-centered"
        />

        {router.query.paid && auth.user.planIsActive && (
          <article className="DashboardSection__paid-message message is-success mx-auto">
            <div className="message-body">
              You are now subscribed
              <span className="ml-2" role="img" aria-label="party">
                🥳
              </span>
            </div>
          </article>
        )}

        <div className="columns is-vcentered is-desktop mt-5">
          <div className="column is-6-desktop">
            <div className="content">
            <Section
      color={props.color}
      size={props.size}
      backgroundImage={props.backgroundImage}
      backgroundImageOpacity={props.backgroundImageOpacity}
    >
      {reauthState.show && (
        <ReauthModal
          callback={reauthState.callback}
          provider={auth.user.providers[0]}
          onDone={() => setReauthState({ show: false })}
        />
      )}

      <DashboardNav activeKey={section} parentColor={props.color} />
      <div className="DashboardSection__container container">
        {formAlert && (
          <FormAlert
            type={formAlert.type}
            message={formAlert.message}
            style={{ maxWidth: "450px" }}
          />
        )}

        {section === "home" && (
          <DashboardHome parentColor={props.color} onStatus={handleStatus} />
        )}

        {section === "send-a-text" && (
          <DashboardSms parentColor={props.color} onStatus={handleStatus} />
        )}

        {section === "deliveries" && (
          <DashboardDeliveries parentColor={props.color} onStatus={handleStatus} />
        )}

      </div>
    </Section>
            </div>
          </div>
          <div className="column is-1" />
          <div className="column">
            <figure className="DashboardSection__image image">
              <img
                src="https://uploads.divjoy.com/undraw-personal_settings_kihd.svg"
                alt="Illustration"
              />
            </figure>
          </div>
        </div>
        <div
          className="mx-auto has-text-centered mt-5"
          style={{
            maxWidth: "460px",
          }}
        >
          <nav className="panel mt-3">
            <div className="panel-block is-block">
              Logged in as&nbsp;<strong>{auth.user.email}</strong>
            </div>
            <div className="panel-block is-block">
              {auth.user.stripeSubscriptionId && (
                <>
                  Subscription data
                  <br />
                  ID: <strong>{auth.user.stripeSubscriptionId}</strong>
                  <br />
                  Price ID: <strong>{auth.user.stripePriceId}</strong>
                  <br />
                  Status: <strong>{auth.user.stripeSubscriptionStatus}</strong>
                </>
              )}

              {!auth.user.stripeSubscriptionId && (
                <Link to="/pricing">Subscribe to a plan</Link>
              )}
            </div>
            <div className="panel-block is-block">
              <Link to="/settings/general">Account settings</Link>
            </div>
          </nav>
        </div>
      </div>
    </Section>
  );
}

export default DashboardSection;
