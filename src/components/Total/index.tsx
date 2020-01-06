import React from "react";
import useAuth from "hooks/useAuth";
import { formatCurrency } from "utils";

type Props = {
  total: {
    amount: number,
    to: string
  }
}

const YOU_OWE_THEM = "Debes";
const THEY_OWE_YOU = "Te deben";

export default function Total({ total: { amount, to } }: Props) {
  const { getUserInfo } = useAuth();

  const getTotalLabel = (): string => {
    const { userId } = getUserInfo();
    if (amount === 0) return YOU_OWE_THEM;
    return to === userId ? YOU_OWE_THEM : THEY_OWE_YOU;
  };

  return (
    <div className="section flex-center">
      <div className="level">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">{getTotalLabel()}</p>
            <p className="title is-1">{formatCurrency(amount)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
