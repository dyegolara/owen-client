import React from "react";
import useActiveLedger from "hooks/useActiveLedger";
import { formatCurrency } from "utils";
import * as S from "./styled";
import { Debt as DebtType } from "types";

type Props = {
  debt: DebtType;
};

export default function Debt({ debt }: Props) {
  const { activeLedger } = useActiveLedger();
  const users = activeLedger.users ?? {};

  return (
    <S.Debt>
      <div className="flex-between">
        <span>{`Para: ${users[debt.to]}`}</span>
        <span>{debt.date}</span>
      </div>
      <div>
        <span className="title is-5">{formatCurrency(debt.amount)}</span>
      </div>
      <p>{debt.description}</p>
    </S.Debt>
  );
}
