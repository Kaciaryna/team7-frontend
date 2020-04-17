<template>
  <span>{{shortDate}}</span>
</template>


<script>

  const MONTHS =
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
       "Oct",
       "Nov",
       "Dec"
    ];


  export default {
    name: 'Date',
    props: {
      date: {
        type: Object,
        default: () => {},
      },
    },
    computed: {
      shortDate() {
        return `${this.date.day} ${MONTHS[this.date.month - 1]} ${this.date.year}`
      }
    },
  }
</script>
