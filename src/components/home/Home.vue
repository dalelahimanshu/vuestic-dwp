<template>
  <div class="home">

    <home-info-widgets></home-info-widgets>

    <div v-if="profileList.length === 0">
      <vuestic-widget :headerText="'Please wait. Loading Profile List. This might take several minutes'">
        <div class="row" v-if="profileList.length === 0">
          <div class="col-xs-12 col-md-12 text-center">
            <div class="spinner-box-container">
              <div class="spinner-box">
                <fulfilling-bouncing-circle-spinner
                  :animation-duration="4000"
                  :size="60"
                  color="#4ae387"
                />
              </div>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>
    <div v-if="profileList.length > 0">
      <vuestic-widget class="no-padding no-v-padding">
        <vuestic-tabs
          ref="tabs"
          :names="categories"
          @tabs:clicked="onTabClicked"
        >
          <div v-for="category in categories" :slot="category">
            <profile-list-visualisation-tab
              :category="category"
              :profile-list="profileList"
              :favourite-profiles="favouriteProfiles"
              :recent-profiles="recentProfiles"
              :active="selectedCategory === category"
              @update-profile-selection="updateProfileSelection"
              @toggle-favourite-profile="toggleFavouriteProfile"
            >
            </profile-list-visualisation-tab>
          </div>
        </vuestic-tabs>
      </vuestic-widget>
      <profile-detail-widget
        :profile-list="profileList"
        :profile-selected="selectedProfile"
        @update-profile-selection="updateProfileSelection"
      >
      </profile-detail-widget>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
  import HomeInfoWidgets from './HomeInfoWidgets'
  import ProfileListVisualisationTab from './profile-list-tab/ProfileListVisualisation.vue'
  import ProfileDetailWidget from './profile-detail-widget/ProfileDetailWidget.vue'
  import ProfileListTableData from './data/ProfileListTableData'

  export default {
    name: 'home',
    components: {
      FulfillingBouncingCircleSpinner,
      ProfileListVisualisationTab,
      ProfileDetailWidget,
      HomeInfoWidgets
    },
    computed: mapGetters({
      config: 'config'
    }),
    created () {
      this.getProfileList()
    },
    data () {
      return {
        selectedProfile: {},
        profileList: [],
        categories: [],
        selectedCategory: 'All',
        favouriteProfiles: this.getStorage('EPSILON_LS.DRYAD_PROFILE_FAVOURITE_LIST') || [],
        recentProfiles: this.getStorage('EPSILON_LS.DRYAD_PROFILE_RECENT_LIST') || []
      }
    },
    methods: {
      onTabClicked (tabName) {
        this.selectedCategory = tabName
      },
      updateProfileSelection (profile) {
        this.selectedProfile = profile
        this.updateRecentProfile(profile)
      },
      getProfileList () {
        var profileListUrl = this.config.baseUrl + 'getjobslist'

        axios.get(profileListUrl).then((response) => {
          console.log('Success in loading get profile list output')
          this.getProfileListHandler(response.data.Items)
          // this.getProfileListHandler(ProfileListTableData)
        }).catch(() => {
          console.error('Problem loading get profile list output')
          this.getProfileListHandler(ProfileListTableData)
        })
      },
      getProfileListHandler (profileListData) {
        setTimeout(() => {
          this.profileList = profileListData
          this.updateCategories()
        }, 0)
      },
      updateCategories () {
        var categoryMap = {}
        var categories = []
        categories.push('All') // To Show All tab
        for (var i = 0; i < this.profileList.length; i++) {
          var category = this.profileList[i].categoryName
          if (!(category in categoryMap)) {
            categoryMap[category] = 1
            categories.push(category)
          }
        }
        this.categories = categories
      },
      updateRecentProfile (profile) {
        if (profile) {
          var index = this.recentProfiles.findIndex(function (item, i) {
            return item.profileName === profile.profileName
          })
          if (index > -1) {
            this.recentProfiles.splice(index, 1)
          }
          this.recentProfiles.unshift(profile)
          this.setStorage('EPSILON_LS.DRYAD_PROFILE_RECENT_LIST', this.recentProfiles)
        }
      },
      toggleFavouriteProfile (profile) {
        let favouriteList = JSON.parse(JSON.stringify(this.favouriteProfiles))
        var index = favouriteList.findIndex(function (item, i) {
          return item.profileName === profile.profileName
        })
        if (index > -1) {
          favouriteList.splice(index, 1)
        } else {
          favouriteList.unshift(profile)
        }
        this.setStorage('EPSILON_LS.DRYAD_PROFILE_FAVOURITE_LIST', favouriteList)
        this.favouriteProfiles = JSON.parse(JSON.stringify(favouriteList))
      },
      getStorage (item) {
        if (localStorage.getItem(item)) {
          return JSON.parse(localStorage.getItem(item))
        }
        return false
      },
      setStorage (item, obj) {
        localStorage.setItem(item, JSON.stringify(obj))
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
  .home {
    .spinner-box-container {
      text-align: center;
      padding-bottom: 40px;

      span {
        font-size: .8rem;
      }
    }

    .spinner-box {
      height: 140px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
</style>
