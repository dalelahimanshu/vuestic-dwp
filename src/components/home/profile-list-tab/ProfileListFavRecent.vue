<template>
  <div
    class="profile-list-fav-recent"
    v-on:click="updateProfileSelection($event, profile)"
    >
    <component
      :is="'profile-list-badge-column'"
      :row-data="profile"
      >
    </component>
    <span
      class="profile-link-text"
      >{{profile.profileName}}
    </span>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ProfileListBadgeColumn from './ProfileListBadgeColumn.vue'

  Vue.component('profile-list-badge-column', ProfileListBadgeColumn)

  export default {
    name: 'profile-list-fav-recent',

    props: {
      profile: {
        type: Object,
        required: true
      }
    },

    methods: {
      updateProfileSelection (event, profile) {
        event.preventDefault()
        this.$emit('updateProfileSelection', profile)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";

  .profile-list-fav-recent{
    margin-left: 5px;
    cursor: pointer;

    .profile-link-text {
      margin-left: 14px;
    }
  }
  .profile-list-fav-recent:hover {
    color: $vue-green;
  }
</style>
