<template>
  <v-toolbar app color="cyan lighten-2" dark>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="mr-4">PowerApp</v-toolbar-title>
    <v-toolbar-items>
      <v-btn
        flat
        dark
        @click="navigateTo({name: 'dashboard'})">
          Dashboard
      </v-btn>
      <v-btn
        flat
        dark
        @click="navigateTo({name: 'devices'})">
          Devices
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        dark
        @click="navigateTo({name: 'register'})">
          Sign Up
      </v-btn>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        dark
        @click="navigateTo({name: 'login'})">
          Login
      </v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        dark
        @click="logout">
          Log Out
      </v-btn>
    </v-toolbar-items>

  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
