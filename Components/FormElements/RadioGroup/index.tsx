import React from "react";
import {Controller} from "react-hook-form";
import RadioButton from "./RadioButton";

const RadioGroup = (props) => {
  const {name, control, init, options, horizontal} = props;

  return (
    <div
      className={`input-container ${horizontal ? "horizontalRadioGroup" : ""}`}>
      {props.label && (
        <label className={"label"}>
          {props.label}
          {props.req ? (
            <>
              <span className="required"> *</span>
            </>
          ) : (
            ""
          )}
        </label>
      )}
      <div className={`radio-wrapper ${horizontal ? "horizontalItems" : ""}`}>
        <Controller
          control={control}
          name={name}
          defaultValue={init}
          render={({field}) => <RadioButton field={field} options={options} />}
        />
      </div>
    </div>
  );
};

export default RadioGroup;
