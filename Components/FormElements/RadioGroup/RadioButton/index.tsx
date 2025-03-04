const RadioButton = ({options, field}) => {
  return (
    <>
      {options.map((option) => (
        <label key={option.id} className={`inputRadio`}>
          <input
            {...field}
            type="radio"
            value={option.id}
            checked={field.value === option.id}
            onChange={() => field.onChange(option.id)}
          />
          <span className="radioBtn"></span>
          <p className="mb-0">{option.name}</p>
        </label>
      ))}
    </>
  );
};

export default RadioButton;
