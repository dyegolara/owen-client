import { findKey } from "lodash";
import { Ledger } from "types";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN"
  }).format(amount);
}

export function getFriendId(ledger: Ledger, userId: string): string {
  const { users } = ledger;
  const friendId = findKey(users, id => id !== userId) || "";
  return friendId;
}
