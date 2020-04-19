import {Loan} from "domain-ts/lib/definitions/loan_pb";
import StateMap = Loan.StateMap;

export interface ILoanStateChange {
  readonly loanId: number;
  readonly state: StateMap[keyof StateMap];
}
