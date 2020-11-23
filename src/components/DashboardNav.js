import React from "react";
import { Link } from "./../util/router.js";
import "./DashboardNav.scss";

function DashboardNav(props) {
  return (
    <div
      className={
        "DashboardNav tabs is-toggle is-centered" +
        (props.parentColor === "white" ? " active-tab-text-white" : "")
      }
    >
      <ul>
        <li
          className={"" + (props.activeKey === "home" ? " is-active" : "")}
        >
          <Link to="/dashboard/home">Home</Link>
        </li>
        <li
          className={"" + (props.activeKey === "send-a-text" ? " is-active" : "")}
        >
          <Link to="/dashboard/send-a-text">Send a Text</Link>
        </li>
        <li
          className={"" + (props.activeKey === "Deliveries" ? " is-active" : "")}
        >
          <Link to="/dashboard/deliveries">Deliveries</Link>
        </li>
      </ul>
    </div>
  );
}

export default DashboardNav;
