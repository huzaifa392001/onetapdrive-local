"use client";

import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

const DropdownIndicator = () => {
    return (
        <>
            <i className="fas fa-chevron-down" />
        </>
    );
};

const SelectField = (props) => {
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
                    render={({ field: { value, onChange, onBlur } }) => {
                        value = props?.multiSelect
                            ? props.options?.filter((opt) =>
                                value?.some((v) => v.value === opt.value)
                            )
                            : props.options?.find(
                                (opt) => opt.value === value
                            ) || value;
                        return (
                            <div className="select__wrapper">
                                <Select
                                    options={props.options}
                                    components={{ DropdownIndicator }}
                                    placeholder={props.placeholder}
                                    onChange={(options) => {
                                        onChange(options);
                                        props.onChange &&
                                            props.onChange(options);
                                    }}
                                    onBlur={onBlur}
                                    id="selectbox"
                                    instanceId="selectbox"
                                    value={value}
                                    isDisabled={
                                        props.readOnly || props.isFieldDisabled
                                    } // 👈 Updated here
                                    isClearable={props.clearable ? true : false}
                                    isSearchable={props.search ? true : false}
                                    isMulti={props.multiSelect ? true : false}
                                    className={`custom__select ${props.customClass || ""
                                        }`}
                                    classNamePrefix="custom__select"
                                    styles={{
                                        control: (val, state) => ({
                                            ...val,
                                            minHeight:
                                                props.minHeight || "2.84375em",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            borderColor: `${state.isFocused
                                                ? "var(--theme-color)"
                                                : props.error
                                                    ? "var(--danger-color)"
                                                    : props.borderColor ||
                                                    "var(--color-primary200)"
                                                }`,
                                            borderWidth: "0.5px",
                                            backgroundColor:
                                                "var(--color-whitecol)",
                                            "&:hover": {
                                                borderColor: `${props.error
                                                    ? "rgba(var(--rgb-dangercol), 1)"
                                                    : "var(--theme-color)"
                                                    }`,
                                            },
                                            paddingRight: "0.88em",
                                            paddingLeft: "0.88em",
                                            boxShadow: "none",
                                        }),
                                        valueContainer: (vcontain) => ({
                                            ...vcontain,
                                            fontSize: "0.875em",
                                            color: "var(--black)",
                                            padding: "0",
                                        }),
                                        singleValue: (scontain) => ({
                                            ...scontain,
                                            color: "var(--black)",
                                        }),

                                        indicatorSeparator: (icontain) => ({
                                            ...icontain,
                                            backgroundColor: "transparent",
                                        }),
                                        dropdownIndicator: (dcontain) => ({
                                            ...dcontain,
                                        }),
                                        option: (vcontain, state) => ({
                                            ...vcontain,
                                            cursor: "pointer",
                                            borderRadius: "0.75em",
                                            color: state.isFocused
                                                ? "var(--white)"
                                                : "var(--black)",
                                            backgroundColor: state.isFocused
                                                ? "var(--theme-color)"
                                                : "rgba(var(--rgb-bgcol3), 0.4)",
                                        }),
                                        menu: (styles) => ({
                                            ...styles,
                                            zIndex: 99,
                                            minHeight: "auto",
                                        }),
                                        placeholder: (place) => ({
                                            ...place,
                                            color: `${props.error
                                                ? "var(--danger-color)"
                                                : "#94A3B8"
                                                }`,
                                        }),
                                    }}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            primary:
                                                "var(--color-secondarycol)",
                                            primary50: "rgba('#262b2b', 0.5')",
                                            primary25: "rgba('#262b2b', 0.25')",
                                        },
                                    })}
                                />
                            </div>
                        );
                    }}
                />
            </div>
        </div>
    );
};

export default SelectField;
