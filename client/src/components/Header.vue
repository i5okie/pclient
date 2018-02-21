<template>
  <v-toolbar app color="primary" dark flat>
    <v-toolbar-title class="mr-4">PowerApp</v-toolbar-title>

    <!--TODO implement me -->
    <!-- <v-toolbar-items>
      <v-btn flat dark>
        Devices
      </v-btn>
    </v-toolbar-items> -->

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn dark flat>
        <router-link to="register">
          Sign Up
        </router-link>
      </v-btn>
    </v-toolbar-items>

  </v-toolbar>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
