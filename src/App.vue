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
  import { loans } from "./api/data";

  export default {
    name: 'App',
    components: {
      Dashboard
    },
    data() {
      return {
        loans: loans,
      }
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
    position: sticky;
    top: 0;
    width: 64px;
  }
</style>
