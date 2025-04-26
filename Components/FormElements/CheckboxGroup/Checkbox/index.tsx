// import checked from "../../../../../../public/assets/svgs/checked.svg";

const Checkbox = (props) => {
  return (
    <label className="checkbox">
      <div className="input-wrapper">
        <input
          type="checkbox"
          value={props.value}
          {...props.field}
          checked={props.field.value.includes(props.value)}
          onChange={() => {
            const newValue = props.field.value.includes(props.value)
              ? props.field.value.filter((v) => v !== props.value)
              : [...props.field.value, props.value];
            props.field.onChange(newValue);
          }}
        />
        <div className="custom-checkbox">
          {/* <Image src={checked.src} width={9} height={7} alt="icon" /> */}
        </div>
        <p>{props.label}</p>
      </div>
    </label>
  );
};

export default Checkbox;
