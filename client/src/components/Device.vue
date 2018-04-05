<template>
  <v-layout row wrap>
    <v-flex fill-height flexbox >
      <v-card>
        <v-toolbar flat>
          <v-subheader>Device: </v-subheader>
          <v-toolbar-title>{{device.label}}</v-toolbar-title>

        </v-toolbar>
          <v-card-text>
              <div v-if="device.ipAddress">
                <p class="heading">IP Address</p>
                <p class="title">{{device.ipAddress}}</p>
              </div>
              <div v-else>
                <p class="heading">Device</p>
                <p class="title">Virtual</p>
              </div>

              <div>
                <p class="heading">Sensors</p>
                <p class="title">{{sensors.length}}</p>
              </div>

              <div v-if="site">
                <p class="heading">Site</p>
                <p class="title">{{site}}</p>
              </div>
          </v-card-text>
      </v-card>
    </v-flex>
    <v-flex flexbox>
      <v-card fill-height>
        <v-toolbar color="grey lighten-3" flat>
          <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
          <v-toolbar-title>Sensors</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
                append-icon="search"
                label="Search"
                single-line
                hide-details
                v-model="search"
          ></v-text-field>
          <v-btn icon v-on:click.native="getSensors()">
            <v-icon color="blue">refresh</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container fill-height justify-center>
          <v-flex>
            <v-card>
              <v-data-table
                :headers="headers"
                :items="sensors"
                :search="search"
                :loading=loading
                :rows-per-page-items='[10,25,50,100,{"text":"All","value":-1}]'
              >
                <v-progress-linear slot="progress" color="grey" indeterminate></v-progress-linear>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-right">{{ props.item.label}}</td>
                  <td class="text-xs-left">{{ props.item.value}}</td>
                </template>
                <template slot="no-data" v-if="sensors.length==0 && loading==false">
                  <v-alert :value="true" color="error" icon="warning">
                    Sorry, nothing to display here :(
                  </v-alert>
                </template>
                <template slot="no-data" v-if="sensors.length==0 && loading==true">
                  <v-alert :value="true" color="info lighten-3" icon="info">
                    Loading . . .
                  </v-alert>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {HTTP} from '../http-common'
var ip = require('ip')

export default {
  name: 'Device',
  props: ['device', 'sites'],
  data () {
    return {
      search: '',
      sensors: [],
      errors: [],
      loading: true,
      headers: [
        {
          text: 'Label',
          align: 'right',
          value: 'label'
        },
        {
          text: 'Value',
          align: 'left',
          value: 'value',
          sortable: false
        }
      ],
      site: ''
    }
  },
  methods: {
    getSensors: function () {
      this.sensors = []
      this.loading = true
      HTTP.get('/devices/' + this.device.isxcGuid + '/sensors')
        .then(response => {
          // JSON resposnes are automatically parsed.
          this.sensors = response.data
          this.loading = false
        })
        .catch(e => {
          console.log("can't get sensors because: ", e)
          this.errors.push(e)
          this.loading = false
        })
    }
  },
  created () {
    console.log('Ive been created. I am a device.')
    HTTP.get('/devices/' + this.device.isxcGuid + '/sensors')
      .then(response => {
        // JSON resposnes are automatically parsed.
        this.sensors = response.data
        this.loading = false
      })
      .catch(e => {
        console.log("can't get sensors because: ", e)
        this.errors.push(e)
        this.loading = false
      })

    function site (net) {
      switch (net) {
        case '172.16.78.0':
          return 'LEP'
        case '172.16.90.0':
          return 'FTB'
        case '172.16.92.0':
          return 'DCC'
        case '172.21.173.0':
          return 'IWC'
        case '172.21.180.0':
          return 'SWG'
      }
    }
    if (this.device.ipAddress) {
      var network = ip.subnet(this.device.ipAddress, '255.255.255.0')['networkAddress']
      this.site = site(network)
    }
    // async / await version (created() becomes async created())
    //
    // try {
    //   const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`)
    //   this.posts = response.data
    // } catch (e) {
    //   this.errors.push(e)
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
