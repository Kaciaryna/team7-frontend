<template>
  <div class="dashboard">
    <div class="lanes">
      <Lane v-for="lane in lanes" :key="lane.name" :lane="lane" :loans="loans" />
    </div>
  </div>

</template>
<script>

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
    methods: {

    }
  }
</script>

<style scoped lang="scss">
  .dashboard {
    padding: 24px 74px 16px 32px;
  }


  .lanes {
    border-radius: 4px;
    display: flex;
    height: 100%;
  }
</style>
