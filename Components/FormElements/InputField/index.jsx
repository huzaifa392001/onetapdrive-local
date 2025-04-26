import Image from "next/image";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";

const InputField = (props) => {
    const [type, setType] = useState("password");
    const [isreadonly, setisreadonly] = useState(props.editEnable);
    const toogle = () => {
        if (type == "password") {
            setType("text");
        } else {
            setType("password");
        }
    };
    const ref = useRef(null);

    const handleClick = () => {
        setisreadonly(!isreadonly);
        ref.current.focus();
    };
    return (
        <div className={"input-container"}>
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
            <div className={"input-wrapper"}>
                <Controller
                    name={props.name}
                    control={props.control}
                    render={({ field: { value, onChange } }) => {
                        return (
                            <>
                                {props?.type === "search" && (
                                    <span className={`search-icon `}>
                                        <Image
                                            src={"/assets/svgs/search.svg"}
                                            alt="search-icon"
                                            width={14}
                                            height={14}
                                        />
                                    </span>
                                )}
                                <input
                                    ref={ref}
                                    value={value || ""}
                                    type={props.eye ? type : props.type}
                                    placeholder={
                                        props.placeholder
                                            ? props.placeholder
                                            : ""
                                    }
                                    className={`input ${props.readOnly ? "readonly" : ""
                                        } ${props.editEnable && isreadonly
                                            ? "editdisable"
                                            : ""
                                        } ${props.class || ""} ${props?.type == "search"
                                            ? "searchInput"
                                            : ""
                                        }`}
                                    readOnly={
                                        props.editEnable
                                            ? isreadonly
                                            : props.readOnly
                                    }
                                    onChange={(e) => {
                                        onChange(e);
                                        props.onChange && props.onChange(e);
                                    }}
                                    disabled={props.isFieldDisabled}
                                />
                                {props.eye && (
                                    <span
                                        className={`password-icon ${props.isFieldDisabled
                                            ? "is-field-disabled"
                                            : ""
                                            }`}
                                        onClick={() => toogle()}
                                    >
                                        <i className={`fas ${type == "password"
                                            ? "fa-eye"
                                            : "fa-eye-slash"
                                            }`} />
                                    </span>
                                )}
                                {props.editEnable && isreadonly && (
                                    <button
                                        type={"button"}
                                        className="editBtn"
                                        onClick={handleClick}
                                    >
                                        Edit
                                    </button>
                                )}
                            </>
                        );
                    }}
                />
            </div>
        </div>
    );
};

export default InputField;
