import React from "react";

type Props = {
  onChange: (event: React.SyntheticEvent<Element, Event>) => void;
  toggleDescription: () => void;
  isOpen: boolean;
  value: string;
};

export default function DescriptionInput({
  isOpen,
  value,
  onChange,
  toggleDescription
}: Props) {
  return (
    <div className="field">
      <div className="control has-text-centered ">
        <button
          type="button"
          onClick={toggleDescription}
          className={`button is-small is-inverted
          ${isOpen ? "is-danger" : "is-link"}`}
        >
          <span className="icon">
            <i className={`mdi ${isOpen ? "mdi-close" : "mdi-plus"}`} />
          </span>
          <span>{isOpen ? "Cancelar" : "Agregar descripción"}</span>
        </button>
      </div>
      <div className="control">
        <textarea
          rows={3}
          className={`textarea ${isOpen ? "" : "is-hidden"}`}
          onChange={onChange}
          value={value}
          style={{ marginTop: "0.5rem" }}
          placeholder="Descripción"
        />
      </div>
    </div>
  );
}

DescriptionInput.defaultProps = {
  isOpen: false,
  value: ""
};
