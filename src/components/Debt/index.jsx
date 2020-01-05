import React from "react";
import useActiveLedger from "hooks/useActiveLedger";
import { formatCurrency } from "utils";
import * as S from "./styled";
import DebtShape from "./propTypes";

const Debt = ({ debt }) => {
  const {
    activeLedger: { users }
  } = useActiveLedger();
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
};

Debt.propTypes = {
  debt: DebtShape.isRequired
};

export default Debt;
