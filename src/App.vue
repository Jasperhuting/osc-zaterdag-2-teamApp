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

</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>