import React, { useState } from "react";
import Debt from "components/Debt";
import Button from "components/Button";
import * as S from "./styled";
import { Debt as DebtType } from "types";

type Props = {
  debts: DebtType[];
};

export default function History({ debts }: Props) {
  const [showFullHistory, setShowFullHistory] = useState(false);
  const debtsToShow = showFullHistory ? debts : debts.slice(0, 10);

  return (
    <S.History>
      <ul>
        {debtsToShow.map(debt => (
          <Debt key={debt.id} debt={debt} />
        ))}
      </ul>
      {!showFullHistory && (
        <Button
          className="is-inverted is-link is-fullwidth"
          onClick={() => setShowFullHistory(true)}
        >
          Mostrar historial completo
        </Button>
      )}
    </S.History>
  );
}
