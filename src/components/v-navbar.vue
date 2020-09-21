<template>
	<nav class="v-navbar green">
    <div class="nav-wrapper">
      <router-link 
      	:to="{path: '/'}" 
      	class="brand-logo"

      >
      	Tasks
      </router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <router-link
        	:to="{name: 'Home'}"
        	tag="li"
        	exact
        	active-class="active"
        >
        	<a href="#">Create</a>
        </router-link>
        <router-link
        	:to="{name: 'List'}"
        	tag="li"
        	active-class="active"
        >
        	<a href="#">List</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'v-navbar',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
.v-navbar{
	padding: 0 2rem;
}
</style>