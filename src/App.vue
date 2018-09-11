<template>
  <div id="app">
    <Navigation />
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navigation from './components/navigation'

export default {
  name: 'App',
  components: {
    Navigation
  },
  data() {
   return {
     dataSet: {
     }
   };
  },
  methods: {
  },
  created() {

  },
  computed: {

  },
  mounted() {
  }
};
</script>

<style>
* {
  font-family: 'Roboto', sans-serif;
}
a {
  color: #41b883;
}
.brand-logo {
  
}
.brand-logo img {
  height: 40px;
  width: 80px;
}
.navigation {
  list-style: none;
  width: 100%;
  border-bottom: 1px solid #41b883;
  display: block;
  padding-left: 0;
}
.navigation li {
  display: inline-block;
}
.navigation li a{
  padding: .5em;
  text-decoration: none;
  display: block;
}
.navigation li a.router-link-active:not(.brand-logo), .navigation li a.router-link-exact-active {
  background-color: #41b883;
  color: #fff;
  text-decoration: none;
}
button {
  background-color: #41b883;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  color: #fff;
  padding: .5em;
  cursor: pointer;
}
button:hover {
  color: #41b883;
  background-color: #fff;
}
input {
  min-height: 37px;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  padding: 0px 10px;
  width: 100%;
  margin: 0px;
}
.position-item--Keeper {
	background-color: #b9b142;
}
.position-item--Verdediger {
	background-color: #427fb9;
}
.position-item--Middenvelder {
	background-color: #4cb942;
}
.position-item--Aanvaller {
	background-color: #b94283;
}
.position-item {
	border-radius: 5px;
	color:#fff;
	display: inline;
  font-size: 11px;
  padding: .3em .5em;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
