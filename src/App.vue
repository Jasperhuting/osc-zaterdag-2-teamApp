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
import db from './components/firebaseInit'

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
    this.$emit('update:categoriesNew', () => {
      this.categoriesNew = []
      db.collection('categories').orderBy("id", "asc").get().then(querySnapshot => {
				querySnapshot.forEach(doc => {
					console.log(doc.data());
					const data = {
						'id' : doc.id,
						'name' : doc.data().name
					}
					this.categoriesNew.push(data);
				})
    	})
    })
  },
  computed: {

  },
  mounted() {
  }
};
</script>

<style>

</style>
