"use client";

import ReactFlagsSelect from "react-flags-select";
import {Controller} from "react-hook-form";

const CountryField = (props) => {
  return (
    <div className="input-container">
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
      <div className="input-wrapper">
        <Controller
          name={props.name}
          control={props.control}
          render={({field: {value, onChange}}) => {
            return (
              <div className="select__wrapper">
                <ReactFlagsSelect
                  placeholder={props.placeholder}
                  selected={value}
                  onSelect={(options) => {
                    onChange(options);
                    props.onChange && props.onChange(options);
                  }}
                  className={`custom__select__country ${
                    props.error ? "error" : ""
                  }`}
                />
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default CountryField;
