<template>
  <div id="app">
    <v-navbar />
    <div class="container">
      <router-view/>
    </div>
    
  </div>
</template>
<script>
import vNavbar from "@/components/v-navbar.vue"
import axios from 'axios'
 export default{
  data(){
    return {
    }
  },
  mounted(){
      return axios({
        url: 'http://localhost:3009/tasks',
        method: 'get'
      })
      .then(response => {
        response.data.map(task => {
          if (new Date(task.date) < new Date() && task.status !== 'completed') {
            task.status = 'outdated'
          }
        })
        this.$store.dispatch('PASS_TASKS_TO_ACTIONS', response.data)
      })
  },
  components: {
    vNavbar
  },
 } 
</script>
<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css"

</style>
