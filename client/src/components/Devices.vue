<template>
  <v-layout row wrap justify-center>
    <v-container fill-height justify-center>
      <v-layout row wrap>
        <v-flex flexbox>
          <v-card style="background-color: #eee">
            <v-toolbar color="cyan lighten-3" dense flat>
              <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
              <v-toolbar-title>Devices</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    v-model="search"
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn icon v-on:click.native="getDevices()">
                <v-icon>refresh</v-icon>
              </v-btn>
            </v-toolbar>

            <v-dialog dark v-model="modalVisible" transition="fade-transition" max-width="80%">
              <v-layout>
                <v-flex>
                  <v-toolbar card dark>
                    <v-toolbar-title>Device View</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon v-on:click.native="closeModal()" dark>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card style="background-color: #ccc">
                    <v-container fluid grid-list-md>
                      <Device v-if="modalVisible" v-bind='{ device, sites }'></Device>
                    </v-container>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-dialog>

            <v-container fill-height>
              <v-flex>
                <v-card>
                  <v-data-table
                    :headers="headers"
                    :items="devices"
                    :search="search"
                    :loading=loading
                    :rows-per-page-items='[10,15,25,50,100,150,{"text":"All","value":-1}]'
                    class="elevation-1"
                  >
                    <v-progress-linear slot="progress" color="grey" indeterminate></v-progress-linear>
                    <template slot="items" slot-scope="props">
                      <td class="">{{ props.item.type}}</td>
                      <td class=""><span class="title">{{ props.item.label}}</span></td>
                      <td class="">{{ props.item.ipAddress}}</td>
                      <td class="" v-if="props.item.severity===0"><v-icon color="success">check_circle</v-icon></td>
                      <td class="" v-if="props.item.severity>0"><v-icon color="warning">warning</v-icon></td>
                      <td class="justify-center layout px-0">
                        <v-btn icon class="mx-0" slot="activator" v-on:click.native="openModal(props.item)">
                          <v-icon color="teal">more_vert</v-icon>
                        </v-btn>
                      </td>
                    </template>
                    <template slot="no-data" v-if="devices.length==0 && loading==false">
                      <v-alert :value="true" color="error" icon="warning">
                        Sorry, nothing to display here :(
                      </v-alert>
                    </template>
                    <template slot="no-data" v-if="devices.length==0 && loading==true">
                      <v-container justify-center>
                        <v-flex flexbox>
                          <v-alert :value="true" color="info lighten-3" icon="info">
                            Loading . . .
                          </v-alert>
                        </v-flex>
                      </v-container>
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
    </v-container>
  </v-layout>
</template>

<script>
import Device from './device'
import {HTTP} from '../http-common'

export default {
  name: 'Devices',
  components: {
    Device
  },
  data () {
    return {
      search: '',
      devices: [],
      errors: [],
      sites: [],
      modalVisible: false,
      device: null,
      loading: true,
      headers: [
        {
          text: 'Type',
          align: 'center',
          value: 'type',
          width: '15%',
          class: ['title']
        },
        {
          text: 'Label',
          align: 'center',
          value: 'label',
          width: '40%',
          class: ['title']
        },
        {
          text: 'IP',
          align: 'center',
          value: 'ipAddress',
          class: ['title']
        },
        {
          text: 'In Alarm',
          align: 'center',
          value: 'severity',
          class: ['title']
        },
        {
          text: '',
          align: 'center',
          sortable: false,
          value: 'name'
        }
      ]
    }
  },
  methods: {
    getDevices: function () {
      this.devices = []
      this.loading = true
      HTTP.get('/devices')
        .then(response => {
          // JSON resposnes are automatically parsed.
          this.devices = response.data
          this.loading = false
        })
        .catch(e => {
          this.errors.push(e)
          this.loading = false
        })
    },
    openModal: function (device) {
      this.device = device
      this.modalVisible = true
      console.log('Making modal visible ', this.modalVisible)
      console.log('trying to open Modal with ', this.device)
    },
    closeModal: function () {
      this.device = null
      this.modalVisible = false
    }
  },
  created () {
    HTTP.get('/devices')
      .then(response => {
        // JSON resposnes are automatically parsed.
        this.devices = response.data
        this.loading = false
      })
      .catch(e => {
        this.errors.push(e)
        this.loading = false
      })

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
