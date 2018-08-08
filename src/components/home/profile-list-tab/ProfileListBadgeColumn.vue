<template>
  <span class="circle" :class="className"></span>
</template>

<script>
  import ProfileCategoryColorMap from './ProfileCategoryColorMap'
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
      className: function () {
        return ('badge-' + ProfileCategoryColorMap[this.rowData.categoryName])
      }
    }
  }
</script>

<style lang="scss" scoped>
  .circle {
    width: .75rem;
    height: .75rem;
    border-radius: 50%;
    display: inline-block;
  }
</style>
