<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2></h2>

		TODO <br />

		Datum: 8 september <br />
		Tegenstander: Uni vv <br />
		Categorie: beker <br />

	</div>

</template>

<script>

import moment from 'moment'

export default {
  name: 'PresentList',
  data() {
    return {
			msg: 'Aanwezigheid',
      presentDate: '',
      presentOpponent: '',
			presentCategory: '',
			categories: ['Bekerwedstrijd','Competitiewedstrijd','Training','Oefenwedstrijd'],
			players: [],
			presentPlayers: [],
			absentPlayers: [],
			assists: [],
			scorers: [],
    };
	},
	created() {
		// this.$store.dispatch('retrieveOpponents')
		// this.$store.dispatch('retrieveMatches')
	},
	computed: {
    // matches() {
    //   return this.$store.getters.matches
		// },
		// opponents() {
    //   return this.$store.getters.opponents
    // }
	},
	methods: {
		laterThanToday(value) {
			if (value) {
    		return moment(value) > moment() ? 'future' : 'past'
  		}
		},
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.columns {
  column-width: auto;
  max-width: 100%;
  margin: 0 auto;
}
.addMatch {
  display: grid;
  grid-template-columns: 10fr 10fr 10fr 3fr;
	padding: .5em;
}
.grid-header {
	background: #eee;
}
.grid.past {
	display: none;
}
.grid, .grid-header {
  display: grid;
  grid-template-columns: 10fr 10fr 10fr 3fr;
  grid-auto-rows: 2em;
	grid-row-gap: 10px;
  align-items: center;
  padding: .5em;
  border-radius: 2px;
}
.grid-item {
	border-top: 1px solid #000;
	padding-top: 14px;
	height: 36px;
	overflow: hidden;
}

input {
  align-self: stretch;
  border-radius: 2px;
	border: 1px solid #f90 !important;
  /* border: 1px solid #ccc; */
}
.imageUrl img {
	max-width: 40px;
}

</style>
