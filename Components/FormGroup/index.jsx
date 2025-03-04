import Link from "next/link";

import InputField from "../FormElements/InputField";
import InputPhone from "../FormElements/InputPhone";
import TextAreaField from "../FormElements/TextAreaField";
import DropzoneField from "../FormElements/DropzoneField";
import RadioGroup from "../FormElements/RadioGroup";
import SelectField from "../FormElements/SelectField";
import DateTimeField from "../FormElements/DateTimeField";
import CheckboxGroup from "../FormElements/CheckboxGroup";
import CheckboxSingle from "../FormElements/CheckboxSingle";
import CountryField from "../FormElements/CountryField";

const FormGroup = (props) => {
    const { item, control, errors, dropzoneData, setdropzoneData } = props;

    return (
        <>
            {item.type == "input" && (
                <div className={`${item.colWidth ? item.colWidth : ""} col_12`}>
                    <div className="relative field-container">
                        <div
                            className={`form-group ${
                                item.extraSpace ? "mb-50-mob" : ""
                            } ${props.modifier || ""} ${
                                errors[`${item.name}`] || item.hasError
                                    ? "border-red"
                                    : ""
                            } ${item.hidden ? "hidden-input" : ""}`}
                        >
                            <InputField
                                name={item.name}
                                control={control}
                                placeholder={item.placeholder || ""}
                                label={item.label || ""}
                                type={item.inputtype || ""}
                                class={item.exclass || ""}
                                eye={item.eye}
                                req={item.req}
                                editEnable={item.editEnable}
                                readOnly={item.readOnly}
                                isFieldDisabled={item.isFieldDisabled}
                                onChange={item.onChange}
                            />
                            {errors[`${item.name}`] && (
                                <span className="error">
                                    {errors[`${item.name}`]?.message}
                                </span>
                            )}
                        </div>
                        {item.bottomAnchor && (
                            <div className="anchorWrapper d-flex justify-end mt-11">
                                <Link
                                    href={item.bottomAnchorLink}
                                    className="black-col"
                                >
                                    {item.bottomAnchor}
                                </Link>
                            </div>
                        )}
                    </div>{" "}
                </div>
            )}
            {item.type == "tel" && (
                <div className={`${item.colWidth ? item.colWidth : ""} col_12`}>
                    <div
                        className={`form-group ${props.modifier || ""} ${
                            errors[`${item.name}`] ? "border-red" : ""
                        }`}
                    >
                        <InputPhone
                            name={item.name}
                            control={control}
                            placeholder={item.placeholder || ""}
                            label={item.label || ""}
                            class={item.exclass || ""}
                            req={item.req}
                            country={item.country}
                            readOnly={item.readOnly}
                            isFieldDisabled={item.isFieldDisabled}
                            disableDropdown={item.isFieldDisabled}
                        />

                        {errors[`${item.name}`] && (
                            <span className="error">
                                {errors[`${item.name}`]?.message}
                            </span>
                        )}
                    </div>
                </div>
            )}
            {item.type == "textarea" && (
                <div className={`${item.colWidth ? item.colWidth : ""} col_12`}>
                    <div
                        className={`form-group ${
                            errors[`${item.name}`] ? "border-red" : ""
                        } `}
                    >
                        <TextAreaField
                            name={item.name}
                            control={control}
                            placeholder={item.placeholder || ""}
                            label={item.label}
                            class={item.exclass || ""}
                            rows={item.rows}
                            col={item.col}
                            readOnly={item.readOnly}
                            req={item.req}
                            isFieldDisabled={item.isFieldDisabled}
                        />
                        {errors[`${item.name}`] && (
                            <span className="error">
                                {errors[`${item.name}`]?.message}
                            </span>
                        )}
                    </div>
                </div>
            )}
            {item.type == "file" && (
                <div className={`${item.colWidth ? item.colWidth : ""} col_12`}>
                    <div
                        className={`${
                            errors[`${item.name}`] ? "border-red" : ""
                        } form-group`}
                    >
                        <DropzoneField
                            name={item.name}
                            multiple={item.multiple}
                            control={control}
                            label={item.label}
                            accept={item.accept}
                            setValue={item.setValue}
                            dropzoneData={dropzoneData}
                            setdropzoneData={setdropzoneData}
                            req={item.req}
                            onChange={item.onChange}
                            value={item.value}
                            bottomLabel={item.bottomLabel}
                            maxLimit={item.maxLimit}
                            maxLimitMessage={item.maxLimitMessage}
                            uploadLabel={item.uploadLabel}
                            isFieldDisabled={item.isFieldDisabled}
                            fileRemove={item.fileRemove}
                            readOnly={item.readOnly}
                            defaultValue={item?.defaultValue}
                        />

                        {errors[`${item.name}`] && (
                            <span className="error">
                                {errors[`${item.name}`]?.message}
                            </span>
                        )}
                    </div>
                </div>
            )}
            {item.type == "radio" && (
                <div className={`form-group`}>
                    <RadioGroup
                        name={item.name}
                        control={control}
                        options={item.options}
                        onChange={item.onChange}
                        init={item.init}
                        horizontal={item.horizontal}
                        label={item.label}
                        req={item.req}
                        readOnly={item.readOnly}
                    />
                    {errors[`${item.name}`] && (
                        <span className="error">
                            {errors[`${item.name}`]?.message}
                        </span>
                    )}
                </div>
            )}
            {item.type == "select" && (
                <div className={`${item.colWidth ? item.colWidth : ""} col_12`}>
                    <div
                        className={`form-group ${
                            errors[`${item.name}`] ? "border-red" : ""
                        } `}
                    >
                        <SelectField
                            name={item.name}
                            control={control}
                            label={item.label}
                            value={item.value}
                            readOnly={item.readOnly}
                            placeholder={item.placeholder || ""}
                            options={
                                Array.isArray(item?.options)
                                    ? item.options.map((x) => {
                                          return {
                                              label:
                                                  x.name ||
                                                  x.locationName ||
                                                  x.timeZoneName,
                                              value: x.id || x.recId || x.recId,
                                          };
                                      })
                                    : []
                            }
                            exclass={item.exclass}
                            error={errors[`${item.name}`]}
                            isFieldDisabled={item.isFieldDisabled}
                            onChange={item.onChange}
                            multiSelect={item.multiSelect}
                            req={item.req}
                        />
                        {errors[`${item.name}`] && (
                            <span className="error">
                                {errors[`${item.name}`]?.message}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {item.type == "country" && (
                <div className={`${item.colWidth ? item.colWidth : ""} col_12`}>
                    <div
                        className={`form-group ${
                            errors[`${item.name}`] ? "border-red" : ""
                        } `}
                    >
                        <CountryField
                            name={item.name}
                            control={control}
                            label={item.label}
                            placeholder={item.placeholder || ""}
                            req={item.req}
                            error={errors[`${item.name}`]}
                        />
                        {errors[`${item.name}`] && (
                            <span className="error">
                                {errors[`${item.name}`]?.message}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {item.type == "date" && (
                <div className={`${item.colWidth ? item.colWidth : ""} col_12`}>
                    <div
                        className={`form-group ${
                            errors[`${item.name}`] ? "border-red" : ""
                        } `}
                    >
                        <DateTimeField
                            name={item.name}
                            control={control}
                            label={item.label}
                            placeholder={item.placeholder || ""}
                            error={errors[`${item.name}`]}
                            req={item.req}
                            dateOption={item.dateOption}
                            timeOption={item.timeOption}
                            inProgress={item.inProgress}
                            setIsInProgress={item.setIsInProgress}
                            isInProgress={item.isInProgress}
                            isFieldDisabled={item.isFieldDisabled}
                            readOnly={item.readOnly}
                            checked={item.checked}
                        />
                        {errors[`${item.name}`] && (
                            <span className="error">
                                {errors[`${item.name}`]?.message}
                            </span>
                        )}
                    </div>
                </div>
            )}
            {item.type == "checkboxGroup" && (
                <div className={`${item.colWidth ? item.colWidth : ""} col_12`}>
                    <div
                        className={`${
                            errors[`${item.name}`] ? "border-red" : ""
                        } form-group ${item.tabs ? "tabbed-checkboxes" : ""}`}
                    >
                        <CheckboxGroup
                            name={item.name}
                            control={control}
                            options={item.options}
                            label={item.label}
                        />
                        {errors[`${item.name}`] && (
                            <span className="error">
                                {errors[`${item.name}`]?.message}
                            </span>
                        )}
                    </div>
                </div>
            )}
            {item.type == "checkboxSingle" && (
                <div className={`${item.colWidth ? item.colWidth : ""} col_12`}>
                    <div
                        className={`form-group ${
                            errors[`${item.name}`] ? "border-red" : ""
                        } ${item.modifier ? item.modifier : ""}`}
                    >
                        <CheckboxSingle
                            name={item.name}
                            control={control}
                            label={item.label}
                            isFieldDisabled={item.isFieldDisabled}
                        />
                        {errors[`${item.name}`] && (
                            <span className="error">
                                {errors[`${item.name}`]?.message}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default FormGroup;
