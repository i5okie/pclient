<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <panel title="Login">
        <v-form>
          <v-text-field
            prepend-icon="email"
            name="email"
            label="Email"
            type="email"
            v-model="email"
          ></v-text-field>
          <v-text-field
            prepend-icon="lock"
            name="password"
            label="Enter your password"
            hint="At least 8 characters"
            v-model="password"
            min="8"
            :append-icon="e1 ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (e1 = !e1)"
            :type="e1 ? 'password' : 'text'"
            counter></v-text-field>
        </v-form>
        <v-alert type="warning" dismissible icon="warning" transition="scale-transition" v-model="alert" v-html="error"></v-alert>
        <v-btn color="primary" @click="login">Login</v-btn>
    </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      error: null,
      alert: false,
      e1: true
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
        this.alert = true
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
