<template>
  <div class="dropdown-toggle">
    <img :src="imgSrc" alt="status">
    <div class="dropdown-content">
      <h5 class="dropdown-title">{{title}}</h5>
      <span class="dropdown-value">{{dropdownValue}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Dropdown',
    props: {
      title: String,
      dropdownValue: String,
      imgSrc: String,
    },
    computed: {

    }
  }
</script>

<style scoped lang="scss">
  @import "@/styles/variables";

  .dropdown {
    &-toggle {
      border: 1px solid $text-color-grey;
      cursor: pointer;
      display: flex;
      padding: 10px 8px;

      &:hover,
      &:focus {
        background: #fff;
      }

      + .dropdown-toggle {
        border-top: 0;
      }

      img {
        border-radius: 4px;
        height: 40px;
        margin-right: 16px;
        width: 40px;
      }
    }

    &-title {
      color: $text-color-alt;
      font-size: 14px;
      font-weight: 300;
      line-height: 19px;
      margin: 0;
    }

    &-value {
      font-size: 14px;
      font-weight: 600;
      line-height: 19px;
    }
  }
</style>
