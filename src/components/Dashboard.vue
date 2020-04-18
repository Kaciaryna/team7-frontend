<template>
  <div class="dashboard">
    <h1 class="dashboard-heading">Loan Pipeline</h1>
    <div class="lanes">
      <Lane :lane="lanes[0]" :loans="draftLoans" />
      <Lane :lane="lanes[1]" :loans="submittedLoans" />
      <Lane :lane="lanes[2]" :loans="approvedLoans" />
      <Lane :lane="lanes[3]" :loans="rejectedLoans" />
    </div>
  </div>

</template>
<script>
  import {Loan} from 'domain-ps/lib/definitions/loan_pb';
  import Lane from '@/components/Lane.vue'

  export default {
    name: 'Dashboard',
    components: {
      Lane
    },
    data() {
      return {
        lanes: [
          { name: "draft" },
          { name: "submitted" },
          { name: "approved" },
          { name: "rejected"}
        ]
      }
    },
    props: {
      loans: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      draftLoans() { return this.loans.filter(loan => loan.getState() === Loan.State.DRAFT) },
      submittedLoans() { return this.loans.filter(loan => loan.getState() === Loan.State.SUBMITTED) },
      approvedLoans() { return this.loans.filter(loan => loan.getState() === Loan.State.APPROVED) },
      rejectedLoans() { return this.loans.filter(loan => loan.getState() === Loan.State.REJECTED) },
    }
  }
</script>

<style scoped lang="scss">
  .dashboard {
    padding: 24px 74px 16px 32px;

    &-heading {
      font-size: 28px;
      font-weight: 600;
      line-height: 38px;
      margin-bottom: 24px;
      margin-top: 0;
    }
  }

  .lanes {
    display: flex;
    height: 100%;
  }
</style>
