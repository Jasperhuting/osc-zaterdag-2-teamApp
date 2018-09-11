<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2></h2>
		<input class="match-input" type="date" placeholder="Datum" v-model="matchDate">
		<select v-model="matchOpponent">
			<option disabled value="">Kies tegenstander</option>
			<option v-for="opponent in opponents" v-bind:key="opponent.id" v-bind:value="opponent.id">{{ opponent.name }}</option>
		</select>
		<select v-model="matchCategory">
			<option disabled value="">Kies categorie</option>
			<option v-for="category in categories" v-bind:key="category" v-bind:value="category">{{ category }}</option>
		</select>
		<button v-on:click.prevent="addMatch">Toevoegen</button>
		


		<div class="columns">
			<div class="grid">
				<span class="date">Datum.</span>
				<span class="opponent">Tegenstander</span>
				<span class="category">Categorie</span>
				<span class="change"></span>
			</div>

			<div class="grid" v-for="match in matches" v-bind:key="match.id">
				<span class="date grid-item">{{ match.matchDate }}</span>
				<span class="opponent grid-item">{{ opponents[match.matchOpponent] }}</span>
				<span class="category grid-item">{{ match.matchCategory }}</span>
				<span class="settings grid-item">
					<button class="edit" @click="editMatch(match.id)">Wijzig</button>
					<button class="delete" @click="removeMatch(match.id)">Verwijder</button>
				</span>
			</div>
		</div>

  </div>
</template>

<script>

export default {
  name: 'Matches',
  data() {
    return {
			msg: 'matches',
      matchDate: '',
      matchOpponent: '',
			matchCategory: '',
			opponent: [],
			categories: ['Bekerwedstrijd','Competitiewedstrijd','Training','Oefenwedstrijd']
    };
	},
	created() {
		this.$store.dispatch('initRealtimeListeners')
		this.$store.dispatch('retrieveOpponents')
		this.$store.dispatch('retrieveMatches')
	},
	computed: {
    matches() {
      return this.$store.getters.matches
		},
		opponents() {
      return this.$store.getters.opponents
    }
	},
	methods: {
    addMatch() {
      this.$store.dispatch('addMatch', {
        date: this.matchDate,
        opponent: this.matchOpponent,
        category: this.matchCategory,
				timestamp: new Date(),
      })
      this.matchDate = ''
      this.matchOpponent = ''
      this.matchCategory = ''
		},
		removeMatch(id) {
      this.$store.dispatch('deleteMatch', id)
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
.grid {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr;
  grid-auto-rows: 2em;
	grid-row-gap: 10px;
  align-items: center;
  background: #eee;
  padding: .5em;
  box-decoration-break: clone;
  border-radius: 2px;
  counter-reset: nb;
}
.grid-item {
	border-bottom: 1px solid #000;
	padding-bottom: 8px;
}
input {
  align-self: stretch;
  border-radius: 2px;
  border: 1px solid #ccc;
}
label::before {
  counter-increment: nb;
  content: counter(nb) ". ";
}
.imageUrl img {
	max-width: 40px;
}

</style>
