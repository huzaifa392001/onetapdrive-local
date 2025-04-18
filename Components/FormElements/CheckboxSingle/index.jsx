import { Controller } from "react-hook-form";
import Image from "next/image";

const CheckboxSingle = (props) => {
    return (
        <div className="input-container">
            <div className="checkbox-wrapper">
                <Controller
                    control={props.control}
                    name={props.name}
                    render={({ field }) => (
                        <>
                            <label
                                className={`checkbox single-checkbox ${props.isFieldDisabled
                                        ? "is-field-disabled"
                                        : ""
                                    }`}
                            >
                                <div className={`input-wrapper`}>
                                    <input
                                        id={props.name}
                                        type="checkbox"
                                        aria-label={props.label}
                                        {...field}
                                        value={props.value}
                                        checked={field.value || false} // Ensure correct checked state
                                        disabled={
                                            props.isFieldDisabled
                                                ? props.isFieldDisabled
                                                : false
                                        }
                                    />
                                    <div className={`custom-checkbox`}>
                                        <i className="fas fa-check" />
                                    </div>
                                </div>
                                <p>{props.label}</p>
                            </label>
                        </>
                    )}
                />
            </div>
        </div>
    );
};

export default CheckboxSingle;
