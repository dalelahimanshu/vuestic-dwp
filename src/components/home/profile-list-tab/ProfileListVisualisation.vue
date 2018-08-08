<template>
  <div class="profile-list-visualisation-tab home-tab" v-if="tableData.data.length > 0">
    <div class="row">
      <div class="col-md-4">
        <div class="overview-col">
          <div class="overview-item">
            <div class="overview-icon-container">
              <h5><i class="list-profile-icon fa fa-star"></i>Favourite</h5>
            </div>
            <div v-for="profile in favouriteProfileList.slice(0, 5)">
              <profile-list-fav-recent
                :profile=profile
                @updateProfileSelection="updateProfileSelection"
              >
              </profile-list-fav-recent>
            </div>
          </div>
          <br/>
          <div class="overview-item">
            <div class="overview-icon-container">
              <h5><i class="list-profile-icon vuestic-icon vuestic-icon-time"></i>Recent</h5>
            </div>
            <div v-for="profile in recentProfileList.slice(0, 5)">
              <profile-list-fav-recent
                :profile=profile
                @updateProfileSelection="updateProfileSelection"
              >
              </profile-list-fav-recent>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8" v-if="tableData.data.length > 0">
        <vuestic-data-table
          :apiMode="apiMode"
          :tableData="tableData"
          :tableFields="tableFields"
          :itemsPerPage="itemsPerPage"
          :onEachSide="onEachSide"
          :sortFunctions="sortFunctions"
          :dataModeFilterableFields="dataModeFilterableFields"
          @vuetable:cell-clicked="onCellClicked"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ProfileListFavRecent from './ProfileListFavRecent.vue'
  import ProfileListBadgeColumn from './ProfileListBadgeColumn.vue'
  import ProfileListCategoryColumn from './ProfileListCategoryColumn.vue'
  import ProfileListDryadColumn from './ProfileListDryadColumn.vue'
  import ProfileListFieldsDef from './ProfileListFieldsDefinition'
  import ProfileCategoryColorMap from './ProfileCategoryColorMap'

  Vue.component('profile-list-fav-recent', ProfileListFavRecent)
  Vue.component('profile-list-badge-column', ProfileListBadgeColumn)
  Vue.component('profile-list-category-column', ProfileListCategoryColumn)
  Vue.component('profile-list-dryad-column', ProfileListDryadColumn)


  export default {
    name: 'profile-list-visualisation-tab',
    props: {
      category: {
        type: String,
        default: ''
      },
      profileList: {
        type: Array,
        default: () => []
      },
      favouriteProfiles: {
        type: Array,
        default: () => []
      },
      recentProfiles: {
        type: Array,
        default: () => []
      },
      active: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      profileList: function (newVal, oldVal) {
        if (newVal.length >= 0) {
          this.updateProfileList()
        }
      },
      active: function (active) {
        if (active) {
          this.tabSelected()
        }
      }
    },
    computed: {
      recentProfileList: function () {
        var records = []
        if (this.recentProfiles.length >= 0) {
          records = [...this.recentProfiles]
          records = records.filter(el => (this.category !== 'All') ? (el.categoryName === this.category) : true)
        }
        return records
      },
      favouriteProfileList: function () {
        var records = []
        if (this.favouriteProfiles.length >= 0) {
          records = [...this.favouriteProfiles]
          records = records.filter(el => (this.category !== 'All') ? (el.categoryName === this.category) : true)
        }
        return records
      }
    },
    data () {
      var tableData = {}
      tableData.data = []
      tableData.filterableFields = ['profileName', 'categoryName']
      return {
        apiMode: false,
        sortFunctions: ProfileListFieldsDef.sortFunctions,
        tableData: tableData,
        onEachSide: 1,
        tableFields: ProfileListFieldsDef.tableFields,
        dataModeFilterableFields: ['profileName', 'categoryName'],
        itemsPerPage: [
          { value: 5 },
          { value: 10 }
        ]
      }
    },
    mounted () {
      if (this.profileList.length > 0) {
        this.updateProfileList()
      }
      if (this.profileList.length > 0) {
        this.updateProfileList()
      }
      if (this.active) {
        this.tabSelected()
      }
    },
    methods: {
      tabSelected () {
        if (this.recentProfiles.length > 0) {
          this.$emit('update-profile-selection', this.recentProfileList[0])
        } else if (this.tableData.data.length > 0) {
          this.$emit('update-profile-selection', this.tableData.data[0])
        }
      },
      onCellClicked (profile, field, event) {
        switch (field.name) {
          case 'profileName':
            this.$emit('update-profile-selection', profile)
            break
          case 'favourite':
            this.$emit('toggle-favourite-profile', profile)
            break
        }
      },
      updateProfileSelection (profile) {
        this.$emit('update-profile-selection', profile)
      },
      updateProfileList () {
        var records = [...this.profileList]
        records = records.filter(el => (this.category !== 'All') ? (el.categoryName === this.category) : true)
        for (var i = 0; i < records.length; i++) {
          let profile = records[i]
          profile['favourite'] = this.isFavouriteProfile(profile) ? 'Remove' : 'Add'
          records[i] = profile
        }
        this.tableData.data = records
      },
      isFavouriteProfile: function (profile) {
        let index = this.favouriteProfileList.findIndex((item, i) => {
          return item.profileName === profile.profileName
        })
        return index > -1
      },
      className: function (profile) {
        return ProfileCategoryColorMap[profile.categoryName]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins/breakpoints";

  .profile-list-visualisation-tab {
    .list-profile-icon {
      font-size: 19px;
      color: #4ae387;
      margin-right: 14px;
    }
  }
</style>
