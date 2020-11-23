import React from "react";

function FormField(props) {
  const { error, type, name, label, inputRef, ...inputProps } = props;

  return (
    <div className="field">
      {type !== "checkbox" && props.label && (
        <label className="label" htmlFor={props.id}>
          {props.label}
        </label>
      )}

      <div className="control">
        {type === "textarea" && (
          <textarea
            className="textarea is-medium"
            ref={inputRef}
            name={name}
            {...inputProps}
          />
        )}
        {type === "checkbox" && (
          <label className="checkbox">
          <input
            type="checkbox mr-2"
            ref={inputRef}
            type={type}
            name={name}
            {...inputProps}
          />
          {"  " + inputProps.id}
          </label>
        )}
        {type !== "textarea" && type !== "checkbox" && (
          <input
            className="input is-medium"
            ref={inputRef}
            type={type}
            name={name}
            {...inputProps}
          />
        )}
      </div>

      {error && <p className="help is-danger">{error.message}</p>}
    </div>
  );
}

export default FormField;
