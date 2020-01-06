import React from "react";

type Props = {
  onChange: (event: React.SyntheticEvent<Element, Event>) => void;
  value: string;
  isValid: boolean;
};

export default function AmountInput({ onChange, value, isValid }: Props) {
  return (
    <div className="field">
      <p className="control has-icons-left">
        <input
          className={`input is-large ${isValid ? "" : "is-danger"}`}
          type="number"
          onChange={onChange}
          value={value}
          placeholder="0"
        />
        <span className="icon is-left">
          <i className="mdi mdi-currency-usd" />
        </span>
      </p>
      {!isValid && (
        <p className="help is-danger">La cantidad debe ser mayor a 0</p>
      )}
    </div>
  );
}

AmountInput.defaultProps = {
  value: "",
  isValid: true
};
