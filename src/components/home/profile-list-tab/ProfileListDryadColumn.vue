<template>
  <div
    class="profile-list-dryad-column"
    v-on:click="openDryadPage()"
    v-on:mouseover="isHovering = true"
    v-on:mouseout="isHovering = false"
    >
      <i
        class="ion"
        :class="{
          'ion-ios-link icon-hover': isHovering,
          'ion-ios-link-outline': !isHovering
        }"
        >
      </i>
  </div>
</template>

<script>
  export default {
    name: 'profile-list-dryad-column',

    props: {
      rowData: {
        type: Object,
        required: true
      },

      rowIndex: {
        type: Number
      }
    },

    data () {
      return {
        isHovering: false
      }
    },

    computed: {
      dryadLink: function () {
        let dryadBaseUrl = 'https://dryad.amazon.com/#/VISA/profiles/'
        return (dryadBaseUrl + this.rowData.profileId)
      }
    },

    methods: {
      openDryadPage () {
        let win = window.open(this.dryadLink, '_blank')
        win.focus()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";

  .profile-list-dryad-column {
    cursor: pointer;

    .icon-hover {
      font-size: 20px;
      color: $vue-green;
    }
  }
</style>
