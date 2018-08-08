<template>
  <span :class="className">{{rowData.categoryName}}</span>
</template>

<script>
  import ProfileCategoryColorMap from './ProfileCategoryColorMap'
  export default {
    name: 'categoryColumn',

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
        return ('text-' + ProfileCategoryColorMap[this.rowData.categoryName])
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
