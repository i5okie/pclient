<template>
  <div class="device container is-fluid">
    <div v-if="device" v-on:click="collapsed = !collapsed">
      <!-- Main container -->
      <div class="box is-mobile">
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item has-text-centered">
            <div>
              <p class="title">{{device.label}}</p>
            </div>
          </div>
          <div class="level-item">
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <div class="level-item has-text-centered">
            <div v-if="device.ipAddress">
              <p class="heading">IP Address</p>
              <p class="title">{{device.ipAddress}}</p>
            </div>
            <div v-else>
              <p class="heading">Device</p>
              <p class="title">Virtual</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Sensors</p>
              <p class="title">{{sensors.length}}</p>
            </div>
          </div>
          <div class="level-item has-text-centered" v-if="site">
            <div>
              <p class="heading">Site</p>
              <p class="title">{{site}}</p>
            </div>
          </div>
        </div>
      </nav>
      </div>
      <div>
        <table class="table is-striped is-fullwidth sensors-table" v-bind:class="{'is-collapsed' : collapsed}">
          <thead>
            <tr>
              <th class="tsens">Sensor</th>
              <th class="tval">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(sensor, index) of sensors" :key="index">
              <td>{{sensor.label}}</td>
              <td>{{sensor.value}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <ul v-if="errors && errors.length">
      <li v-for="error of errors" :key="error">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>
import {HTTP} from '../http-common'
var ip = require('ip')

export default {
  name: 'Device',
  props: ['device', 'sites'],
  data () {
    return {
      sensors: [],
      errors: [],
      collapsed: true,
      site: ''
    }
  },
  created () {
    HTTP.get('/devices/' + this.device.isxcGuid + '/sensors')
      .then(response => {
        // JSON resposnes are automatically parsed.
        this.sensors = response.data
      })
      .catch(e => {
        this.errors.push(e)
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

.dhead {
  padding: 0;
  border-bottom: solid 3px #42b983;
  text-align: left;
  font-size: 2em;
}

.is-collapsed {
  display: none;
}

.device .title {
  font-size: auto;
}
</style>
