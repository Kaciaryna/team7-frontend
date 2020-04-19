<template>
  <div id="app" class="board">
    <div class="nav">
      <img class="logo" src="/assets/logo.png" alt="logo">
    </div>
    <Dashboard
      :loans="loans"
    />
  </div>
</template>

<script>
  import Dashboard from '@/components/Dashboard.vue'

  import {listenToLoanUpdates, loadLoans} from "@/utls/grpc";

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
      loadLoans((loan) => this.loans.push(loan));
      listenToLoanUpdates((newLoan) => {
        this.$set(
          this.loans,
          this.loans.findIndex(loan => loan.getId() === newLoan.getId()),
          newLoan
        );
      });
    },
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
    padding: 13px 0 0 13px;
    position: sticky;
    top: 0;
    width: 64px;
  }

  .logo {
    width: 38px;
  }
</style>
