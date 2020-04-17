<template>
  <div id="app" class="board">
    <div class="nav"></div>
    <Dashboard
      :loans="loans"
    />
  </div>
</template>

<script>
  import Dashboard from '@/components/Dashboard.vue'
  import {grpc} from "@improbable-eng/grpc-web";

  import {LoansService} from 'domain-ps/lib/definitions/api/private/loans_service_pb_service';
  import {ClientData} from 'domain-ps/lib/definitions/api/private/loans_service_pb';
  import {Empty} from 'google-protobuf/google/protobuf/empty_pb'

  export default {
    name: 'App',
    components: {
      Dashboard
    },
    data() {
      return {
        loans: [],
      }
    },
    mounted() {
      grpc.setDefaultTransport(grpc.WebsocketTransport());

      const clientData = new ClientData();
      const randomClientId = + new Date();
      clientData.setId(randomClientId);

      grpc.invoke(LoansService.LoadAll, {
        request: new Empty(),
        host: "http://45.79.77.254:10368",
        onMessage: (loans) => this.loans = loans.getLoansList(),
        onEnd: (code, msg, trailers) => {
          if (code === grpc.Code.OK) {
            console.log("done LoadAll");
          } else {
            console.log("hit an error", code, msg, trailers);
          }
        }
      });

      grpc.invoke(LoansService.ListenToLoanUpdates, {
        request: clientData,
        host: "http://45.79.77.254:10368",
        onMessage: (newLoan) => {
          console.log("loan updated:", newLoan);
          this.$set(this.loans, this.loans.findIndex(l => l.getId() === newLoan.getId()), newLoan);
        },
        onEnd: (code, msg, trailers) => {
          if (code == grpc.Code.OK) {
            console.log("done ListenToLoanUpdates");
          } else {
            console.log("hit an error", code, msg, trailers);
          }
        }
      });
    }
  }
</script>

<style lang="scss">
  @import "@/styles/variables";
  @import "@/styles/normalize";

  html,
  body {
    height: 100vh;
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
  }

  .board {
    font-family: Open Sans, Arial, sans-serif;
    color: $text-color;
    display: flex;
    height: 100%;
  }

  .nav {
    background: $brand-color;
    height: 100vh;
    position: sticky;
    top: 0;
    width: 64px;
  }
</style>
