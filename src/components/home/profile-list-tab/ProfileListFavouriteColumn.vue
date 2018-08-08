<template>
  <div
    class="profile-list-favourite-column"
    v-on:mouseover="isHovering = true"
    v-on:mouseout="isHovering = false"
    >
      <i
        class="fa "
        :class="{
          'fa-star icon-added': favouriteProfile,
          'fa-star-o icon-default': !favouriteProfile,
          'icon-hover': isHovering && !favouriteProfile
        }"
        >
      </i>
  </div>
</template>

<script>
  export default {
    name: 'profile-list-favourite-column',

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
      favouriteProfile: function () {
        let list = (this.getStorage('EPSILON_LS.DRYAD_PROFILE_FAVOURITE_LIST') || [])
        let index = list.findIndex((item, i) => {
          return item.profileName === this.rowData.profileName
        })
        return index > -1
      }
    },

    methods: {
      getStorage (item) {
        if (localStorage.getItem(item)) {
          return JSON.parse(localStorage.getItem(item))
        }
        return false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";

  .profile-list-favourite-column {
    cursor: pointer;

    .icon-default {
      font-size: 19px;
    }

    .icon-added {
      font-size: 20px;
      color: $vue-green;
    }

    .icon-hover {
      font-size: 19px;
      color: $vue-green;
    }
  }
</style>
