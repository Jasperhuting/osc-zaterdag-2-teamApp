<template>
  <div id="app">
    <v-navigation />
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navigation from './components/navigation/navigation'
import Button from './components/button/button'

export default {
  name: 'App',
  components: {
    'v-navigation' : Navigation,
    'v-button' : Button
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
    this.$store.dispatch('initRealtimeListeners')
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
  box-sizing: border-box;
}
a {
  color: #41b883;
}
.container {
	padding: 1em;
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
  margin: 0px;
}
.position-item {
	border-radius: 5px;
	color:#fff;
  background-color: lightgray;
	display: inline;
  font-size: 11px;
  padding: .3em .5em;
}
.position-item--Keeper.active,
.grid-item .position-item--Keeper {
	background-color: #FDC51C;
}
.position-item--Verdediger.active,
.grid-item .position-item--Verdediger {
	background-color: #46D1E1;
}
.position-item--Middenvelder.active,
.grid-item .position-item--Middenvelder {
	background-color: #885DF1 ;
}
.position-item--Aanvaller.active,
.grid-item .position-item--Aanvaller {
	background-color: #FC487F;
}
.btn-secondary {
  background-color: grey;
}
.add {
  margin-bottom: 10px;
}
button.hideModal {
	margin: 1em 0;
}
.button-container {
	position: absolute;
	bottom:0.4em;
	left: 1em;
	right: 1em;
	text-align: right;
}
.button-container button {
	padding:10px;
}
.form-group {
  margin-bottom: 5px;
}
.modal-container {
  padding-bottom: 80px;
}
.multiselect, .multiselect__input, .multiselect__single {
  font-size: 12px !important;
}
.form-group input {
	width: 100%;
}
.form-group--error {
	color: red;
}
.form-group--error input {
	border: 1px solid red;
}
.form-group {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 1em;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
