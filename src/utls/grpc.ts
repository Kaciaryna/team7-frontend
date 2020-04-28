import {grpc} from "@improbable-eng/grpc-web";

import {LoansService} from 'domain-ts/lib/definitions/api/private/loans_service_pb_service';
import {Empty} from 'google-protobuf/google/protobuf/empty_pb'
import {Loan} from "domain-ts/lib/definitions/loan_pb";
import {WebClient} from "domain-ts/lib/definitions/api/web_client_pb";

const host = "http://localhost:10368";

function onEnd(code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) {
  if (code !== grpc.Code.OK) {
    console.error("hit an error", code, msg, trailers);
  }
}

function noop() {}

export function loadLoans(onMessage: (loan: Loan) => void) {
  grpc.invoke(LoansService.LoadAll, {
    request: new Empty(),
    host,
    onMessage,
    onEnd,
  });
}

export function updateLoan(loan: Loan) {
  grpc.invoke(LoansService.Update, {
    request: loan,
    host,
    onMessage: noop,
    onEnd,
  });
}

export function listenToLoanUpdates(onMessage: (loan: Loan) => void) {
  const clientData = new WebClient();
  const randomClientId = +new Date();
  clientData.setId(randomClientId);

  grpc.invoke(LoansService.ListenToUpdates, {
    request: clientData,
    host,
    onMessage,
    onEnd,
  });
}
