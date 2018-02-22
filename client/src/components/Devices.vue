<template>
  <div class="devices">
    <div class="filter">
      <label>
        <input type="checkbox" value="LEP" v-model="sites">
        Kelowna
      </label>
      <label>
        <input type="checkbox" value="FTB" v-model="sites">
        Mississauga
      </label>
      <label>
        <input type="checkbox" value="DCC" v-model="sites">
        Vaughn
      </label>
      <label>
        <input type="checkbox" value="IWC" v-model="sites">
        Vancouver Vault
      </label>
      <label>
        <input type="checkbox" value="SWG" v-model="sites">
        Vancouver Downtown
      </label>
      <label>
        <input type="checkbox" value="Virt" v-model="sites">
        Virtual
      </label>
    </div>
    <div v-if="devices && devices.length">
      <ul v-if="devices">
        <li
          v-for="(device, index) in devices"
          v-bind:device="device"
          v-bind:key="index">
          {{device.label}}
          <!-- <device :device="device" :sites="sites"></device> -->
          <!-- <p><strong>{{device.label}}</strong></p> -->
        </li>
      </ul>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors" :key="error">
          {{error.message}}
        </li>
      </ul>
    </div>
  </div>
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
