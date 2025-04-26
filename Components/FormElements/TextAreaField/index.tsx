import { useRef, useState } from "react";
import { Controller } from "react-hook-form";

const TextAreaField = (props) => {
    const [isreadonly] = useState(props.editEnable);
    const ref = useRef(null);
    // const handleClick = () => {
    //     setisreadonly(!isreadonly);
    //     ref.current.focus();
    // };
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field: { value, onChange } }) => {
                return (
                    <div className={`input-container`}>
                        <label className={"label"}>
                            {props.label}
                            {props.req && props.label && (
                                <span className="required"> *</span>
                            )}
                        </label>
                        <div className={`input-wrapper`}>
                            <textarea
                                ref={ref}
                                value={value}
                                placeholder={props.placeholder}
                                className={`input ${
                                    props.readOnly ? "readonly" : ""
                                } ${
                                    props.editEnable && isreadonly
                                        ? "editdisable"
                                        : ""
                                } ${props.class || ""}`}
                                readOnly={
                                    props.editEnable
                                        ? isreadonly
                                        : props.readOnly
                                }
                                rows={props.rows}
                                cols={props.col}
                                onChange={(e) => {
                                    onChange(e);
                                    props.onChange && props.onChange(e);
                                }}
                                disabled={
                                    props.isFieldDisabled
                                        ? props.isFieldDisabled
                                        : false
                                }
                            />
                        </div>
                    </div>
                );
            }}
        />
    );
};

export default TextAreaField;
