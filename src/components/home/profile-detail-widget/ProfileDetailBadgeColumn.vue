<template>
  <span class="badge badge-pill" :class="classObject">{{badgeName}}</span>
</template>

<script>
  export default {
    name: 'badgeColumn',

    props: {
      rowData: {
        type: Object,
        required: true
      },

      rowIndex: {
        type: Number
      }
    },

    computed: {
      classObject: function () {
        return {
          'badge-warning': this.rowIndex % 2 === 0,
          'badge-danger': this.rowIndex % 2 === 1
        }
      },
      badgeName: function () {
        return this.rowIndex % 2 === 0 ? 'WARNING' : 'DANGER'
      }
    }
  }
</script>
