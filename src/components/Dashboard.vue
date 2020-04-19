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
<script lang="ts">
  import Vue from "vue";
  import {Loan} from 'domain-ts/lib/definitions/loan_pb';
  import Lane from '@/components/Lane.vue'
  import Component from "vue-class-component";
  import {ILane} from "@/models/Lane";
  import {Prop} from "vue-property-decorator";

  @Component({
    components: {
      Lane,
    }
  })
  export default class Dashboard extends Vue {
    lanes: ILane[] = [
      {name: "draft"},
      {name: "submitted"},
      {name: "approved"},
      {name: "rejected"}
    ];

    @Prop({default: []})
    loans!: Loan[];

    get draftLoans(): Loan[] {
      return this.loans.filter(loan => loan.getState() === Loan.State.DRAFT)
    }

    get submittedLoans(): Loan[] {
      return this.loans.filter(loan => loan.getState() === Loan.State.SUBMITTED)
    }

    get approvedLoans(): Loan[] {
      return this.loans.filter(loan => loan.getState() === Loan.State.APPROVED)
    }

    get rejectedLoans(): Loan[] {
      return this.loans.filter(loan => loan.getState() === Loan.State.REJECTED)
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
