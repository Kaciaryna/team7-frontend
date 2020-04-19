<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal">
        <img class="modal-close" @click.stop="close" src="/assets/icon-close.svg" alt="close">
        <div class="modal-content">
          <h4 class="modal-title">{{loan.getAddress().getStreet()}}</h4>
          <h5 class="modal-subtitle">{{subtitle}}</h5>

          <label for="modal-notes" class="modal-notes-title">Notes</label>
          <textarea id="modal-notes" class="modal-notes" v-model="loanNotes" :class="updatedClass">
          </textarea>

          <button class="primary-button" @click="updateLoan">Update</button>
        </div>
        <div class="modal-actions">
          <div class="modal-dropdowns">
            <Dropdown title="Status" dropdown-value="Draft" img-src="/assets/draft-icon.svg"/>
            <Dropdown title="Lender" :dropdown-value="loan.getUser().getName()"
                      :img-src="loan.getUser().getAvatarUrl()"/>
          </div>

          <div class="modal-updates">
            <h5>Created</h5>
            <span>{{createdAt}}</span>
          </div>
          <div class="modal-updates">
            <h5>Last Updated</h5>
            <span>{{updatedAt}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Dropdown from '@/components/Dropdown.vue';
  import {shortTime} from "@/utls/date_time";
  import {updateLoan} from "@/utls/grpc";
  import Component from "vue-class-component";
  import {Prop, Watch} from "vue-property-decorator";
  import {Loan} from "domain-ts/lib/definitions/loan_pb";
  import {Address} from "domain-ts/lib/definitions/address_pb";

  @Component({
    components: {
      Dropdown,
    }
  })
  export default class Modal extends Vue {
    loanNotes!: string;
    justUpdated = false;

    @Prop()
    loan!: Loan;

    @Watch("loan", {deep: true, immediate: true})
    updateNotes(loan: Loan) {
      this.loanNotes = loan.getNotes();
    }

    @Watch("loan", {deep: true})
    updateAnimation() {
      if (!this.justUpdated) {
        this.justUpdated = true;
        setTimeout(() => this.justUpdated = false, 300)
      }
    }


    data() {
      return {
        escPressed: ((e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            this.close();
          }
        }),
      };
    }

    mounted() {
      document.addEventListener("keydown", this.$data.escPressed);
    }

    destroyed() {
      document.removeEventListener("keydown", this.$data.escPressed);
    }

    close() {
      this.$emit("close");
    }

    updateLoan() {
      this.loan.setNotes(this.loanNotes);
      updateLoan(this.loan);
    }

    get subtitle(): string {
      const address = this.loan.getAddress() as Address;
      return `${address.getState()},  ${address.getCity()} ${address.getZip()}`
    }

    get updatedAt(): string {
      return shortTime(this.loan.getUpdatedAt());
    }

    get createdAt(): string {
      return shortTime(this.loan.getCreatedAt());
    }

    get updatedClass(): string | undefined {
      if (this.justUpdated) {
        return "just-updated";
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/styles/variables";
  @import "@/styles/buttons";

  .modal {
    background-color: $background-color-grey;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    cursor: default;
    display: flex;
    margin: 0 auto;
    position: relative;
    transition: all 0.3s ease;
    width: 950px;

    &-mask {
      background-color: rgba(0, 71, 141, 0.6);
      display: table;
      height: 100%;
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
    }

    &-wrapper {
      display: table-cell;
      vertical-align: middle;
    }

    &-content {
      padding: 32px 40px 180px 50px;
      width: 65%;
    }

    &-close {
      cursor: pointer;
      right: 18px;
      position: absolute;
      top: 18px;
    }

    &-title {
      font-size: 24px;
      font-weight: 400;
      line-height: 33px;
      margin: 0 0 4px;
    }

    &-subtitle {
      font-size: 18px;
      font-weight: 300;
      line-height: 25px;
      margin: 0 0 40px;
    }

    &-notes-title {
      display: block;
      font-size: 16px;
      font-weight: 300;
      line-height: 22px;
      margin: 0 0 6px;
    }

    &-actions {
      background: $background-color;
      border-radius: 4px;
      padding: 64px 16px 270px;
      width: 35%;
    }

    &-dropdowns {
      margin-bottom: 16px;
    }

    &-updates {
      margin: 8px;

      h5 {
        color: $text-color-alt;
        font-size: 14px;
        font-weight: 300;
        line-height: 19px;
        margin: 0;
      }

      span {
        font-size: 14px;
        font-weight: 600;
      }
    }

    &-notes {
      border-color: $text-color-grey;
      display: block;
      margin-bottom: 24px;
      min-height: 155px;
      padding: 16px;
      resize: vertical;
      width: 100%;

      &:hover,
      &:focus {
        border-color: $border-hover-color;
        outline: none;
      }

      @keyframes yellow-fade {
        from {
          background: #FEE7AB;
        }
        to {
          background: white;
        }
      }

      &.just-updated {
        animation: yellow-fade 250ms;
      }
    }

    .primary-button {
      float: right;
    }
  }
</style>
