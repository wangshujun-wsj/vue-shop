<template>
  <div id="app">
  	<v-header></v-header>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
	import header from './components/header.vue'
	import footer from './components/footer.vue'
export default {
  name: 'app',
  components: {
  	'v-header': header,
  	'v-footer': footer
  }
}
</script>

<style>
html,body {
	height: 100%;
}
#app {
	height: 100%;
	width: 100%;
	display: flex;
  flex-direction: column;
}
</style>
