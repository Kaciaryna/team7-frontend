<template>
  <div class="card">
    <div class="card-header">
      <h4 class="card-title">{{loan.getAddress().getStreet()}}</h4>
      <h5 class="card-subtitle">{{subtitle}}</h5>
    </div>
    <div class="card-footer">
      <span></span>
      <img :src="loan.getUser().getAvatarUrl()" alt="userAvatar" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: {
      loan: {
        type: Object,
        default: () => {},
      },
    },
    computed: {
      subtitle() {
        const address = this.loan.getAddress();
        return `${address.getState()},  ${address.getCity()} ${address.getZip()}`
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/styles/variables";

  .card {
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 16px;
    height: 200px;
    padding: 24px 16px 16px;

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

      img {
        width: 32px;
      }
    }
  }
</style>
