<template>
  <div class="profile-detail">
    <div v-if="dataProcessing">
      <vuestic-widget :headerText="'Please wait. Loading Profile Detail'">
        <div class="spinner-box-container">
          <div class="spinner-box">
            <fulfilling-bouncing-circle-spinner
              :animation-duration="4000"
              :size="60"
              color="#4ae387"
            />
          </div>
        </div>
      </vuestic-widget>
    </div>
    <div v-if="!dataProcessing && selectedProfile.profileName">
      <vuestic-widget :headerText="'Dryad Profile Output Table'">
        <div class="row">
          <div class="col-xs-12 col-md-12">
            <div>
              <div class="row row-padding">
                <div class="col-md-3">
                  <fieldset>
                    <vuestic-simple-select
                      v-if="profileList.length > 0"
                      :label="'Profile Name'"
                      v-model="selectedProfile"
                      option-key="profileName"
                      v-bind:options="profileList">
                    </vuestic-simple-select>
                  </fieldset>
                  <fieldset>
                    <div class="form-group">
                      <div class="input-group">
                        <vuestic-date-picker
                          id="dp-dataset-date"
                          :config="{disable: datePickerDisabled}"
                          v-model="dp.datasetDate"
                        />
                        <label class="control-label" for="dp-dataset-date">
                          	Dataset Date
                        </label>
                        <i class="bar"></i>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div class="col-md-9">
                  <div class="well well-padding"
                    v-bind:class="{
                      'well-warning': records.empty
                      }">
                    <div v-if="records.empty" class="empty">
                      <h4><i class="glyphicon glyphicon-warning-sign warning-icon"></i>&nbsp;No Record Found</h4>
                      <p>
                        Profile Name : <b>{{selectedProfile.profileName}}</b><br/>
                        Profile Id : <b>{{selectedProfile.profileId}}</b><br/>
                        Data Set Date : <b>{{dp.datasetDate}}</b>
                      </p>
                    </div>
                    <div v-if="records.length > 0" class="table-responsive">
                      <table class="table table-margin-bottom">
                        <tbody>
                        <tr>
                          <td align="middle"><h4>Column</h4></td>
                          <td>
                            <vuestic-checkbox
                              :label="'Critical'"
                              :id="'criticalColumn'"
                              :disabled="true"
                              :isCircle="true"
                              v-model="filter.column.critical"/>
                          </td>
                          <td>
                            <vuestic-checkbox
                              :label="'Warning'"
                              :id="'warningColumn'"
                              :disabled="true"
                              :isCircle="true"
                              v-model="filter.column.warning"/>
                          </td>
                          <td>
                            <vuestic-checkbox
                              :label="'Monitored'"
                              :id="'monitoredColumn'"
                              :isCircle="true"
                              v-model="filter.column.monitor"/>
                          </td>
                        </tr>
                        <tr>
                          <td align="middle"><h4>Row</h4></td>
                          <td>
                            <vuestic-checkbox
                              :label="'Critical'"
                              :id="'criticalRow'"
                              :isCircle="true"
                              v-model="filter.row.critical"/>
                          </td>
                          <td>
                            <vuestic-checkbox
                              :label="'Warning'"
                              :id="'warningRow'"
                              :isCircle="true"
                              v-model="filter.row.warning"/>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="records.length > 0" class="row row-padding">
                <div class="col-md-12">
                  <div class="table-responsive">
                    <table class="table first-td-padding table-striped table-sm color-icon-label-table">
                      <thead>
                        <tr>
                          <td></td>
                          <td
                            :class="{'monitored-column': columnData.monitor}"
                            v-if="!filter.column.monitor || (filter.column.monitor && columnData.monitor)"
                            v-for="columnData, columnName in records[records.maxColumnCountIndex]">
                              {{columnName}}
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-if="showRow(filter.row, row.metaData)"
                          v-for="row in records">
                          <td v-if="row.metaData.critical"><span class="badge badge-pill badge-danger">CRITICAL</span></td>
                          <td v-else-if="row.metaData.warning"><span class="badge badge-pill badge-warning">WARNING</span></td>
                          <td v-else></td>
                          <td v-for="columnData, columnName in records[records.maxColumnCountIndex]"
                            v-if="!filter.column.monitor || (filter.column.monitor && row[columnName] && row[columnName].monitor)"
                            v-bind:class="{
                              'table-danger': row[columnName] && row[columnName].showAlert && row[columnName].critical,
                              'table-warning': row[columnName] && row[columnName].showAlert && row[columnName].warning
                              }">
                              <div v-tooltip.top-center="row[columnName] && row[columnName].rule.message">
                                <span v-if="row[columnName]">
                                  {{row[columnName].value}}
                                  <i v-if="row[columnName].showAlert && row[columnName].critical" class="glyphicon glyphicon-alert error-icon"></i>
                                  <i v-if="row[columnName].showAlert && row[columnName].warning" class="glyphicon glyphicon-warning-sign warning-icon"></i>
                                </span>
                              </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import Vue from 'vue'
  import VTooltip from 'v-tooltip'
  import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
  import ProfileDetailBadgeColumn from './ProfileDetailBadgeColumn.vue'
  import ProfileDetailData from '../data/ProfileDetailData'

  Vue.component('profile-detail-badge-column', ProfileDetailBadgeColumn)
  Vue.use(VTooltip)

  export default {
    name: 'profile-detail-widget',
    components: {
      FulfillingBouncingCircleSpinner
    },
    props: {
      profileSelected: {
        type: Object,
        default: () => {}
      },
      profileList: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      profileSelected: function (profile) {
        this.setSelectedProfile(profile)
      },
      selectedProfile: function (profile) {
        if (profile && this.isValid(profile.profileId)) {
          this.triggerProfileSelection(profile)
        }
      },
      filter: {
        handler (data) {
          this.setStorage('EPSILON_LS.DRYAD_PROFILE_DETAIL_FILTER', data)
        },
        deep: true
      },
      dp: {
        handler (date) {
          this.fetchProfileDetail()
        },
        deep: true
      }
    },
    computed: {
      ...mapGetters(['config']),
      datePickerDisabled: () => [date => date > new Date()]
    },
    created () {
      this.setSelectedProfile(this.profileSelected)
    },
    data () {
      let yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      let defaultFilter = {
        column: {
          critical: false,
          warning: false,
          monitor: false
        },
        row: {
          critical: false,
          warning: false
        }
      }
      return {
        selectedProfile: {},
        dp: {
          datasetDate: yesterday.toISOString().slice(0, 10)
        },
        filter: this.getStorage('EPSILON_LS.DRYAD_PROFILE_DETAIL_FILTER') || defaultFilter,
        profileOutput: {},
        records: [],
        requestDate: '2018-06-30',
        dataProcessing: true
      }
    },
    methods: {
      showRow (filter, row) {
        if ((!filter.critical && !filter.warning) || (filter.critical && row.critical) || (filter.warning && row.warning)) {
          return true
        }
        return false
      },
      setSelectedProfile (profile) {
        this.selectedProfile = profile
        this.fetchProfileDetail()
      },
      triggerProfileSelection (profile) {
        this.$emit('update-profile-selection', profile)
      },
      fetchProfileDetail () {
        if (this.isValid(this.dp.datasetDate) && this.isValid(this.selectedProfile) && this.isValid(this.selectedProfile.profileId)) {
          this.dataProcessing = true
          var profileDetailUrl = this.config.baseUrl + 'fetchdwpdata'
          profileDetailUrl = profileDetailUrl + '?date=' + this.dp.datasetDate
          profileDetailUrl = profileDetailUrl + '&jobId=' + this.selectedProfile.profileId

          axios.get(profileDetailUrl).then((response) => {
            console.log('Success in loading dryad profile output')
            var data = JSON.parse(JSON.stringify(response.data))
            // var data = JSON.parse(JSON.stringify(ProfileDetailData))
            this.fetchProfileDetailHandler(data)
          }).catch((e) => {
            console.error('Problem loading dryad profile output: ' + e)
            var data = JSON.parse(JSON.stringify(ProfileDetailData))
            this.fetchProfileDetailHandler(data)
          })
        }
      },
      fetchProfileDetailHandler (profileDetailData) {
        var columnRuleMap = this.transformColumnRules(profileDetailData.rules.column)
        let maxColumnCountIndex = 0
        let maxColumnCount = 0
        for (var i = 0; i < profileDetailData.records.length; i++) {
          var row = profileDetailData.records[i]
          var rowMetaData = {}
          rowMetaData.critical = false
          rowMetaData.warning = false
          let columnCount = 0
          for (var column in row) {
            columnCount++
            if (row.hasOwnProperty(column)) {
              var val = row[column]
              row[column] = {}
              row[column].value = val
              row[column].monitor = false
              row[column].critical = false
              row[column].warning = false
              row[column].showAlert = false
              row[column].rule = {}
              if (column in columnRuleMap) {
                row[column].monitor = true
                let orderedRules = columnRuleMap[column]
                for (let i = 0; i < orderedRules.length; i++) {
                  let rule = orderedRules[i]
                  if (rule.validationType === 'REGEX') {
                    row[column].showAlert = this.testRegex(val, rule.regex)
                  } else if (rule.validationType === 'MIN_MAX') {
                    row[column].showAlert = this.testMinMax(val, rule.rangeMin, rule.rangeMax)
                  }
                  if (row[column].showAlert) {
                    row[column].rule = rule
                    row[column].severity = rule.severity
                    row[column].critical = (row[column].severity === 1)
                    row[column].warning = (row[column].severity === 2)
                    rowMetaData.warning = row[column].warning ? row[column].warning : rowMetaData.warning
                    rowMetaData.critical = row[column].critical ? row[column].critical : rowMetaData.critical
                    break
                  }
                }
              }
            }
          }
          if (columnCount > maxColumnCount) {
            maxColumnCount = columnCount
            maxColumnCountIndex = i
          }
          this.defineProperty(row, 'metaData', rowMetaData)
          profileDetailData.records[i] = row
        }
        this.records = profileDetailData.records
        this.defineProperty(this.records, 'empty', this.records.length === 0)
        this.defineProperty(this.records, 'maxColumnCountIndex', maxColumnCountIndex)
        this.dataProcessing = false
      },
      transformColumnRules (columnRules) {
        var columnMap = {}
        for (var i = 0; i < columnRules.length; i++) {
          var columnName = columnRules[i].columnName
          var columnSeverity = columnRules[i].severity
          if (!columnMap[columnName]) {
            columnMap[columnName] = {}
          }
          columnMap[columnName][columnSeverity] = columnRules[i]
        }
        return this.getOrderedColumnRules(columnMap)
      },
      getOrderedColumnRules (map) {
        let result = {}
        for (let k in map) {
          if (map.hasOwnProperty(k)) {
            result[k] = this.getOrderedRules(map[k])
          }
        }
        return result
      },
      getOrderedRules (map) {
        let list = []
        for (let k in map) {
          if (map.hasOwnProperty(k)) {
            list.push(map[k])
          }
        }
        return list.sort((a, b) => a.severity > b.severity)
      },
      testRegex (val, expr) {
        var rExp = '^' + expr + '$'
        try {
          var regex = new RegExp(rExp)
          return regex.test(val)
        } catch (e) {
          console.log('Invalid regular expression : ' + expr + ' .Error Stack : ' + e)
          return true
        }
      },
      testMinMax (val, min, max) {
        if (this.isValid(val) && this.isValid(min) && this.isValid(max)) {
          return !(val >= min && val <= max)
        }
        return false
      },
      isValid (val) {
        if (val && val !== undefined && val !== null && val !== '') {
          return true
        }
        return false
      },
      defineProperty (obj, key, val) {
        let prop = {}
        prop[key] = {}
        prop[key].value = val
        prop[key].enumerable = false
        prop[key].writable = true
        Object.defineProperties(obj, prop)
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

<style lang="scss">

  @import "../../../sass/_tooltip.scss";
  @import "../../../sass/_variables.scss";

  .profile-detail{
    .warning-icon {
      display: inline-block;
      color: $brand-warning;
    }
    .color-icon-label-table {
      td:first-child {
        width: 1rem;
      }
    }

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

    .row-padding {
      padding-bottom: 1.5rem;
    }

    .well-padding {
      padding: 0.9rem 0.2rem 0.9rem 0.6rem !important;
    }

    .table-margin-bottom {
      margin-bottom: 0 ! important;
    }

    .monitored-column {
        color: $vue-green;
    }
  }
</style>
