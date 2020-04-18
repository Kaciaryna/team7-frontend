<template>
  <div class="card" @click="openModal">
    <div class="card-header">
      <h4 class="card-title">{{loan.getAddress().getStreet()}}</h4>
      <h5 class="card-subtitle">{{subtitle}}</h5>
    </div>
    <div class="card-footer">
      <span class="card-date">
        <img src="/assets/icon-clock.svg" alt="clock">
        {{date}}
      </span>
      <img class="card-avatar" :src="loan.getUser().getAvatarUrl()" alt="userAvatar"/>
    </div>

    <Modal v-if="showModal" @close="closeModal" :loan="loan"/>
  </div>
</template>

<script lang="ts">
  import Date from '@/helpers/date_time_formatter';
  import Modal from '@/components/Modal.vue';
  import Component from "vue-class-component";
  import Vue from "vue";
  import {Prop, Watch} from "vue-property-decorator";
  import {Loan} from "domain-ps/lib/definitions/loan_pb";
  import {Address} from "domain-ps/lib/definitions/address_pb";

  @Component({
    components: {
      Modal,
    }
  })
  export default class Card extends Vue {
    @Prop()
    loan!: Loan;

    showModal = false;

    openModal() {
      this.showModal = true;
    }

    closeModal() {
      this.showModal = false;
    }

    get subtitle() {
      const address = this.loan.getAddress() as Address;
      return `${address.getState()},  ${address.getCity()} ${address.getZip()}`
    }

    get date() {
      return Date.short(this.loan.getUpdatedAt())
    }
  }
</script>

<style scoped lang="scss">
  @import "@/styles/variables";

  .card {
    background: white;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 16px;
    height: 200px;
    padding: 24px 16px 16px;

    &:hover {
      background: $hover-color;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &-title {
      font-size: 18px;
      font-weight: 400;
      line-height: 25px;
      margin: 0;
    }

    &-subtitle {
      font-size: 16px;
      font-weight: 300;
      line-height: 22px;
      margin: 0;
    }

    &-footer {
      display: flex;
      justify-content: space-between;
    }

    &-avatar {
      border-radius: 4px;
      width: 32px;
    }

    &-date {
      align-items: flex-end;
      color: $grey-color;
      display: flex;
      font-size: 13px;
      font-weight: 300;

      img {
        margin-right: 4px;
        margin-bottom: 1px;
      }
    }
  }
</style>
