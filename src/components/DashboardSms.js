import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import SectionButton from "./SectionButton";
import { useAuth } from "./../util/auth.js";
import { useForm, reset } from "react-hook-form";
import { getResponses, filterNumbers } from "./../util/sheets.js";
import { redirectToCheckout } from "./../util/stripe.js";
import { sendSms } from "../util/twilio.js";

function DashboardSms(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(false);
  const [phoneCol, setPhoneCol] = useState("Number");
  const [deliveries, setDeliveries] = useState([]);  // Need to find a good way to display
  const [customers, setCustomers] = useState({
    "Name": {responses: ["Rylie", "Jordan"], options: ["Rylie", "Jordan"]},
    "Number": {responses: ["+12624243872", "+6309010523"], options: ["+2624243872", "+6309010523"]},
    "Pizza Topping": {responses: ["Pepperoni", ["Cheese", "Sausage"]], options: ["Pepperoni", "Cheese", "Sausage"]},
    "Favorite Color": {responses: [["Red", "Blue"], "Green"], options: ["Red", "Blue", "Green"]}
  });
  const [formAlert, setFormAlert] = useState(null);

  useEffect(() => {
      if (auth.user.planIsActive && !auth.user.sheetLink) {
        alert("You need to enter a sheet link first to not use default values!");
      } else if (auth.user.planIsActive && !auth.user.phoneCol) {
        alert("You need to specify the phone number column first to not use default values!");
      } else if (!auth.user.planIsActive) {
        alert("You need to sign up for a subscription not to use default values!");
      } else if (auth.user.planIsActive && auth.user.sheetLink && auth.user.phoneCol) {
        setPending(true);
        getResponses(auth.user.sheetLink)
        .then((c) => {
          setCustomers(c);
          setPhoneCol(auth.user.phoneCol);
        })
        .catch((e) => {
          console.error('Error: ', e);
        });
        setPending(false);
      }
      else {
        // Alert that no subscription and should sign up
        // Redirect to checkout?
        console.log(auth.user);
      }
    }, [auth.user]);

  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data) => {
    setPending(true);
    setDeliveries([]);

    const message = data.message;
    const numbers = filterNumbers(data, customers, phoneCol);

    console.log('Message: '+message);
    console.log('Numbers: '+numbers);

    // Stripe checkout
    // Use webhook for some flag to see if was successful
  
    // Maybe have pending / loading icon while messages sending?

    // Text request
    numbers.forEach((num) => {
      sendSms(num, message)
      .then((status) => {
          setDeliveries([{
              to: status.to,
              from: status.from,
              body: status.body,
              dateSent: status.dateSent,
              errorMessage: status.errorMessage,
              price: status.price
          }, ...deliveries]);
      })
      .catch((error) => {
          alert(error.message);
      });
    });

    // Reset filters and what not
    reset();
    setPending(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!pending && Object.entries(customers).map(([q, values]) => (
          <div>
              <h3 className="is-primary">{q}</h3>
              {values.options.map((a) => (
                  <FormField
                      id={a}
                      name={q+"|||"+a}
                      type="checkbox"
                      inputRef={register()}
                      error={errors.q}
                  />)
              )}
              <br />
          </div>
        )
      )}
      <FormField
        name="message"
        type="textarea"
        label="Please enter your SMS"
        placeholder="Write to your people"
        error={errors.message}
        inputRef={register({
          required: "Please enter your text message to send!",
        })}
      />
      <div className="field">
        <div className="control">
          <SectionButton
            parentColor={props.parentColor}
            size="medium"
            state={pending ? "loading" : "normal"}
          >
            Send
          </SectionButton>
        </div>
      </div>
    </form>
  );
}

export default DashboardSms;
