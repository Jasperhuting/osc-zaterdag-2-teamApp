<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2></h2>
		
		<div class="addMatch">
			<datetime input-class="matchDate" v-model="matchDate" placeholder="Kies datum + tijd" type="datetime"></datetime>
			<multiselect v-model="matchCategory" :options="categories" @input="onChangeCat" placeholder="Selecteer categorie"></multiselect>
			<multiselect v-model="matchOpponent" :options="opponents" label="name" :disabled="isDisabled" placeholder="Selecteer tegenstander"></multiselect>
			<button v-on:click.prevent="addMatch">Toevoegen</button>
		</div>
		


		<div class="columns">
			<div class="grid-header">
				<span class="date">Datum.</span>
				<span class="opponent">Tegenstander</span>
				<span class="category">Categorie</span>
				<span class="change"></span>
			</div>

			<div class="grid" v-for="match in matches" v-bind:key="match.id"  v-bind:class="laterThanToday(match.matchDate)">
				<span class="date grid-item">{{ match.matchDate | formatDateTime }}</span>
				<span class="opponent grid-item">{{ showOpponent(opponents[match.matchOpponent]) }}</span>
				<span class="category grid-item">{{ match.matchCategory }}</span>
				<span class="settings grid-item">
					<!-- <button class="edit" @click="editMatch(match.id)">Wijzig</button> -->
					<button class="delete" @click="removeMatch(match.id)">Verwijder</button>
				</span>
			</div>
		</div>

  </div>
</template>

<script>

import moment from 'moment'

export default {
  name: 'Matches',
  data() {
    return {
			msg: 'matches',
      matchDate: '',
      matchOpponent: '',
			matchCategory: '',
			opponent: [],
			isDisabled: false,
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
		laterThanToday(value) {
			if (value) {
    		return moment(value) > moment() ? 'future' : 'past'
  		}
		},
		onChangeCat(value) {
			console.log(value)
			if (value === 'Training') {
				this.matchOpponent = {id:'1',name:'Training'}
				this.isDisabled = true
			} else {
				this.matchOpponent = ''
				this.isDisabled = false
			}
    },
		showOpponent(opponent) {
			console.log(opponent);
			let outputValue = '';
			if (opponent) {
				outputValue = opponent.name
			}
			// return opponent.name ? opponent.name : opponent
			return outputValue
		},
    addMatch() {
      this.$store.dispatch('addMatch', {
        date: this.matchDate,
        opponent: this.matchOpponent.id,
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
		editMatch() {
      this.beforeEditCache = this.title
      this.editing = true
    },
    doneEdit() {
      if (this.title.trim() == '') {
        this.title = this.beforeEditCache
      }
      this.editing = false
      this.$store.dispatch('updateMatch', {
        'id': this.id,
        'title': this.title,
        'completed': this.completed,
        'timestamp': this.timestamp,
        'editing': this.editing,
      })
    },
    cancelEdit() {
      this.title = this.beforeEditCache
      this.editing = false
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
