<template>
  <div class="lane">
    <h3 class="lane-name">{{lane.name}}<span> {{loans.length}}</span></h3>
    <div class="cards-list" :data-state="lane.id">
      <Card v-for="loan in orderedLoans" :key="loan.getId()" :loan="loan"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from "vue-class-component";

  import Card from '@/components/Card.vue'
  import {Prop} from "vue-property-decorator";

  import {Loan} from 'domain-ts/lib/definitions/loan_pb';
  import {ILane} from "@/models/Lane";
  import Sortable from "sortablejs";
  import {ILoanStateChange} from "@/models/Loan";

  @Component({
    components: {
      Card,
    }
  })
  export default class Lane extends Vue {
    @Prop()
    lane!: ILane;

    @Prop()
    loans!: Loan[];

    get orderedLoans(): Loan[] {
      return this.loans.sort((a, b) => b.getUpdatedAt() - a.getUpdatedAt());
    }

    mounted() {
      const container = this.$el.querySelector(".cards-list");
      new Sortable(container as HTMLElement, {
        group: "cards-list",
        ghostClass: "sortable-ghost",
        chosenClass: "sortable-chosen",
        dragClass: "sortable-drag",
        onEnd: (event) => {
          this.$emit("loan-state-changed", {
            loanId: parseInt(event.item.dataset["loanId"] || "-1"),
            state: parseInt(event.to.dataset["state"] || "-1"),
          } as ILoanStateChange);
        },
      });
    }
  }
</script>

<style scoped lang="scss">
  @import "@/styles/variables";

  $lane-height: calc(100vh - 24px - 16px - 64px);
  $lane-header-height: 25px + 40px;

  .lane {
    background: $background-color;
    border-radius: 4px;
    height: $lane-height;
    margin-right: 24px;
    padding: 16px;
    width: 300px;

    &:last-child {
      margin-right: 0;
    }
  }

  .lane-name {
    color: $text-color;
    font-size: 18px;
    font-weight: 600;
    line-height: 25px;
    margin-bottom: 40px;
    margin-top: 0;
    text-transform: capitalize;

    span {
      color: $text-color-grey;
    }
  }

  .cards-list {
    max-height: calc(100vh - 24px - 16px * 3 - 25px - 40px - 64px);
    min-height: calc(100vh - 24px - 16px * 3 - 25px - 40px - 64px);
    overflow-y: scroll;
  }
</style>
