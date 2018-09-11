<template>
  <div id="app">
    <Navigation />
    <div class="container">
      <router-view :categoriesNew.sync="dataSet.categoriesNew"/>
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
  props: ['categoriesNew'],
  data() {
   return {
     dataSet: {
       categoriesNew: []
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
button {
  background-color: #41b883;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  color: #fff;
  padding: .5em;
}
input {
  min-height: 37px;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  padding: 0px 10px;
  width: 100%;
  margin: 0px;
}
.position-item {
	background-color: #42b983;
	border-radius: 3px;
	color:#fff;
	display: inline;
  font-size: 11px;
  padding: .3em .5em;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
