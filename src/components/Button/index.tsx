import React from "react";

type Props = {
  type: "button" | "submit" | "reset" | undefined;
  icon: string;
  className: string;
  ariaLabel: string;
  children: JSX.Element;
  onClick: () => void;
};

export default function Button({
  type,
  icon,
  className,
  ariaLabel,
  children,
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={`button ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {icon && (
        <span className="icon is-small">
          <i className={`mdi mdi-${icon}`} />
        </span>
      )}
      {children && <span>{children}</span>}
    </button>
  );
}

Button.defaultProps = {
  type: "button",
  icon: "",
  className: "",
  ariaLabel: "",
  children: null
};
