<template>
  <v-layout row>
    <v-flex xs12 sm8 offset-sm4>
      <v-card>
        <v-toolbar dark color="primary" flat>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Devices</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line>
          <template v-for="(device, index) in devices">
            <v-list-tile-content>
              <v-list-title>{{device.label}}</v-list-title>
              <v-list-tile-sub-title class="text--primary">
                <span v-if="device.ipAddress">
                  {{device.ipAddress}}
                </span>
                <span v-else>
                  Virtual
                </span>
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-divider v-if="index + 1 < devices.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>
        <v-card-text>
        </v-card-text>
      </v-card>
    </v-flex>
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
      devices: [],
      errors: [],
      sites: []
    }
  },
  methods: {
    getDevices: function () {
      HTTP.get('/devices')
        .then(response => {
          // JSON resposnes are automatically parsed.
          this.devices = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
  created () {
    HTTP.get('/devices')
      .then(response => {
        // JSON resposnes are automatically parsed.
        this.devices = response.data
      })
      .catch(e => {
        this.errors.push(e)
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
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
