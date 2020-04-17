<template>
  <div class="lane">
    <h3 class="lane-name">{{lane.name}}<span></span></h3>
    <div class="cards-list">
      <Card v-for="loan in loans" :key="loan.id" :loan="loan" />
    </div>
  </div>
</template>

<script>

  import Card from '@/components/Card.vue'

  export default {
    name: 'Lane',
    components: {
      Card
    },
    props: {
      lane: {
        type: Object,
        default: () => {},
      },
      loans: {
        type: Array,
        default: () => [],
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "@/styles/variables";

  $lane-height: calc(100vh - 24px - 16px);
  $lane-header-height: 25px + 40px;

  .lane {
    background: $background-color;
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
  }

  .cards-list {
    max-height: calc(100vh - 24px - 16px - 25px - 40px);
    overflow-y: scroll;
  }
</style>
