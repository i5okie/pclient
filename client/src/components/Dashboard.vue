<template>
  <v-layout column>
    <v-flex xs12 sm12>
      <v-card>
        <v-toolbar color="cyan" dark flat>
        <v-toolbar-title >NOC Monitoring</v-toolbar-title>
      </v-toolbar>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex
              v-bind="{ [`xs${card.flex}`]: true }"
              v-for="card in cards"
              :key="card.title"
            >
              <v-card>
                <v-toolbar flat dense>
                  <v-toolbar-title><span class="" v-text="card.title"/></v-toolbar-title>
                </v-toolbar>
                <v-container>
                  <v-layout row wrap>
                    <v-flex
                      v-for="alarm in alarms"
                      :key="alarm.title"
                    >
                      <v-card xs12 flexbox>
                        <v-container>
                          <v-layout>
                          <v-flex xs2 fill-height>
                            <v-card flat>
                              <v-toolbar flat dense two-line>
                                <v-toolbar-side-icon>
                                  <v-icon>location_on</v-icon>
                                </v-toolbar-side-icon>
                                <v-toolbar-title>IWC</v-toolbar-title>
                              </v-toolbar>
                            </v-card>
                          </v-flex>
                          <v-flex>
                            <v-card flat>
                              <v-toolbar flat dense color="error" class="px-4 title white--text">{{ alarm.description }}</v-toolbar>
                              <div>testing</div>
                              <div>
                                <v-chip dark small>
                                  <v-icon left color="grey">person</v-icon>
                                  <span class="subheading">Charlie R.</span>
                                </v-chip>
                                <v-chip dark small>
                                  <v-icon left color="grey">confirmation_number</v-icon>
                                  <span class="subheading">24575</span>
                                </v-chip>
                              </div>
                            </v-card>
                          </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>

                <v-list two-line>
                  <v-list-tile v-for="alarm in alarms" :key="alarm.description" class="my-3">
                    <v-list-avatar>
                    </v-list-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title class="headline red white--text px-2 pb-5" style="font-weight: bold; letter-spacing: 1px;">{{ alarm.description }}</v-list-tile-title>

                      <v-list-tile-sub-title class="grey lighten-2 px-2">{{ alarm.recommendedAction }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
                <!-- <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>favorite</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>bookmark</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>share</v-icon>
                  </v-btn>
                </v-card-actions> -->
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {HTTP} from '../http-common'

export default {
  name: 'Dashboard',
  components: {

  },
  data () {
    return {
      cards: [
        {title: 'West', src: '', flex: 6, data: this.van_alarms},
        {title: 'East', src: '', flex: 6, data: this.kel_alarms}
      ],
      alarms: [],
      west_alarms: ['alarm'],
      east_alarms: [],
      loading: false
    }
  },
  methods: {
    getAlarms: function () {
      this.alarms = []
      this.loading = true

      // HTTP.get('/alarms')
      //   .then(response => {
      //     // JSON resposnes are automatically parsed.
      //     this.alarms = response.data
      //     this.loading = false
      //   })
      //   .catch(e => {
      //     this.errors.push(e)
      //     this.loading = false
      //   })
    },
    sortAlarms: function () {
      HTTP.get('/deviceGroups/B2f0294-nbRootDeviceGroup/children/generations/1')
        .then(response => {
          // JSON resposnes are automatically parsed.
          this.alarms = response.data
          this.loading = false
        })
        .catch(e => {
          this.errors.push(e)
          this.loading = false
        })
    },
    getSite: function () {

    }
  },
  created () {
    this.alarms = []
    this.loading = true

    HTTP.get('/alarms')
      .then(response => {
        // JSON resposnes are automatically parsed.
        this.alarms = response.data
        this.loading = false
      })
      .catch(e => {
        this.errors.push(e)
        this.loading = false
      })
  }
}
</script>

<style scoped>
</style>
