import {grpc} from "@improbable-eng/grpc-web";

import {LoansService} from 'domain-ps/lib/definitions/api/private/loans_service_pb_service';
import {AllLoansResponse, ClientData} from 'domain-ps/lib/definitions/api/private/loans_service_pb';
import {Empty} from 'google-protobuf/google/protobuf/empty_pb'
import {Loan} from "domain-ps/lib/definitions/loan_pb";

const HOST = "http://45.79.77.254:10368";

function onEnd(code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) {
  if (code !== grpc.Code.OK) {
    console.error("hit an error", code, msg, trailers);
  }
}

export function loadAllLoans(callback: (loans: Loan[]) => void) {
  grpc.invoke(LoansService.LoadAll, {
    request: new Empty(),
    host: HOST,
    onMessage: (loans: AllLoansResponse) => callback(loans.getLoansList()),
    onEnd: onEnd,
  });
}

export function listenToLoanUpdates(callback: (loan: Loan) => void) {
  const clientData = new ClientData();
  const randomClientId = +new Date();
  clientData.setId(randomClientId);

  grpc.invoke(LoansService.ListenToLoanUpdates, {
    request: clientData,
    host: HOST,
    onMessage: (loan: Loan) => callback(loan),
    onEnd: onEnd,
  });
}
