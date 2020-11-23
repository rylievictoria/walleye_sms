import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import SectionButton from "./SectionButton";
import { useAuth } from "./../util/auth.js";
import { useRouter } from "./../util/router.js";
import { useForm, reset } from "react-hook-form";
import { getResponses, filterNumbers } from "./../util/sheets.js";
import { sendSms } from "./../util/twilio.js";

function DashboardSms(props) {
  const auth = useAuth();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [phoneCol, setPhoneCol] = useState("Number");
  const [customers, setCustomers] = useState({
    "Name": {responses: ["Rylie", "Jordan"], options: ["Rylie", "Jordan"]},
    "Number": {responses: ["+12624243872", "+6309010523"], options: ["+2624243872", "+6309010523"]},
    "Pizza Topping": {responses: ["Pepperoni", ["Cheese", "Sausage"]], options: ["Pepperoni", "Cheese", "Sausage"]},
    "Favorite Color": {responses: [["Red", "Blue"], "Green"], options: ["Red", "Blue", "Green"]}
  });
  const [formAlert, setFormAlert] = useState(null);

  useEffect(() => {
      console.log(auth.user);
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

    const message = data.message;
    const numbers = filterNumbers(data, customers, phoneCol);
    const cost = numbers.length * 0.10;
  
    if (!(auth.user.smsFunds > 0) || cost > auth.user.smsFunds) {
      if (auth.user.planIsActive) {
        alert(`You have ${auth.user.smsFunds} and this costs ${cost}! Refill your account.`)
        router.push(`/purchase/sms?quantity=${numbers.length}`);
      } else {
        alert("You have no subscription! Please sign up.")
        router.push(`/pricing`);
      }
    }

    console.log('Message: '+message);
    console.log('Numbers: '+numbers);

    numbers.forEach((num) => {
      sendSms(num, message)
      .then((status) => {
          let delivery = {
            to: status.to,
            from: status.from,
            body: status.body,
            dateSent: status.dateSent,
            errorMessage: status.errorMessage
          }
          if (auth.user.deliveries) {
            delivery = [...auth.user.deliveries, delivery];
          } else {
            delivery = [delivery];
          }
          auth.updateProfile({
            smsFunds: auth.user.smsFunds - 0.10,
            deliveries: delivery
          });
      })
      .catch((error) => {
          alert(error.message);
      })
      .finally(() => {
        console.log('SMS Funds left: '+auth.user.smsFunds);
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
