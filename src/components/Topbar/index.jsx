import React from "react";
import SignOut from "components/SignOut";
import Ledgers from "components/Ledgers";
import NewLedger from "components/NewLedger";
import * as S from "./styled";

export default function Topbar(props) {
  return (
    <S.Topbar>
      <SignOut />
      <Ledgers {...props} />
      <NewLedger />
    </S.Topbar>
  );
}
