import React from "react";

import Container from "components/Container";
import Form from "components/Form";
import Topbar from "components/Topbar";
import Total from "components/Total";
import History from "components/History";
import { ActiveLedgerWrapper } from "contexts/activeLedger";
import useActiveLedger from "hooks/useActiveLedger";

const Owen = () => {
  const { activeLedger, debts, ledgers } = useActiveLedger();

  return (
    <Container>
      <Topbar activeLedger={activeLedger} ledgers={ledgers} />
      {activeLedger && (
        <>
          <Total total={activeLedger.total} />
          <Form activeLedger={activeLedger} />
          <History debts={debts} />
        </>
      )}
    </Container>
  );
};

const OwenWithContext = () => (
  <ActiveLedgerWrapper>
    <Owen />
  </ActiveLedgerWrapper>
);

export default OwenWithContext;
