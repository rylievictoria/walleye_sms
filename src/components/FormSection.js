import React from "react";
import SectionHeader from "./SectionHeader";
import FormField from "./FormField";

function FormSection(props) {
    return(
    <div>
        <h2 className="is-primary">{props.title}</h2>
        {props.values.map((a) => (
            <FormField
                key={props.title+"|||"+a}
                name={a}
                type="checkbox"
                error={props.error}
            />)
        )}
        <br />
    </div>
    )
}

export default FormSection;