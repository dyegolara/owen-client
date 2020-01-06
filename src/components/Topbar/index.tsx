import React from "react";
import SignOut from "components/SignOut";
import Ledgers from "components/Ledgers";
import NewLedger from "components/NewLedger";
import * as S from "./styled";
import { Ledger } from "types";

type Props = {
  activeLedger: Ledger;
  ledgers: Ledger[];
};

export default function Topbar(props: Props) {
  return (
    <S.Topbar>
      <SignOut />
      <Ledgers {...props} />
      <NewLedger />
    </S.Topbar>
  );
}
