<template>
</template>

<script>
  import {HTTP} from '../http-common'

  export default {
    name: 'Sensor',
    props: ['sensor', 'device'],
    data () {
      return {

      }
    },
    methods: {
      getData: function () {
        this.sensors = []
        this.loading = true
        HTTP.get('/sensors/' + this.sensor.isxcGuid)
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
    }
  }
</script>

<style scoped>
</style>
