<template>
  <div class="matches">
    <h1>{{ msg }}</h1>
    <button class="add" v-on:click="showModal()">Voeg wedstrijd toe</button>
  <modal name="match-modal" width="80%" height="auto">
		<div class="container modal-container">
      <h2>Voeg selectielid toe</h2>
      <div class="addMatch">

        <div class="form-group" :class="{ 'form-group--error': $v.matchDate.$error }">
          <label for="number">Datum + Tijd*</label>
					<datetime input-class="matchDate" v-model.trim="$v.matchDate.$model" placeholder="Kies datum + tijd" type="datetime"></datetime>
				</div>

        <div class="form-group" :class="{ 'form-group--error': $v.matchCategory.$error }">
					<label for="number">Categorie*</label>
					<multiselect v-model.trim="$v.matchCategory.$model" :options="categories" placeholder="Selecteer categorie"></multiselect>
				</div>

        <div class="form-group">
					<label for="number">Uit/Thuis*</label>
          <multiselect v-model.trim="matchHome" :options="homeAway" label="name" value="bln" placeholder="Selecteer thuis/uit"></multiselect>
				</div>

        <div class="form-group" :class="{ 'form-group--error': $v.matchOpponent.$error }">
					<label for="number">Tegenstander*</label>
          <multiselect v-model.trim="$v.matchOpponent.$model" :options="opponents" label="clubName" placeholder="Selecteer tegenstander"></multiselect>
				</div>

        <div class="button-container">
					<button class="btn-secondary hideModal" v-on:click="hideModal()">Annuleren</button>
					<button v-on:click.prevent="addMatch">Toevoegen</button>
				</div>

      </div>
    </div>
    <div class="button-container">
      <button class="btn-secondary hideModal" v-on:click="hideModal()">Annuleren</button>
      <button v-on:click.prevent="addMatch">Toevoegen</button>
    </div>
  </modal>
		<div class="columns">
			<div class="grid-header">
				<span class="date">Datum.</span>
				<span class="opponent">Tegenstander</span>
				<span class="category">Categorie</span>
				<span class="homeAway">Thuis/Uit</span>
				<span class="change"></span>
			</div>

			<div class="grid" v-for="(match, i) in matches" v-bind:key="i + '-match'"  v-bind:class="laterThanToday(match.matchDate)">
				<span class="date grid-item">{{ match.matchDate | formatDateTime }}</span>
				<!-- <span class="opponent grid-item">{{ opponents.doc(match.matchOpponent) }}</span> -->
				<span class="opponent grid-item"> {{ showOpponent(match.matchOpponent) }}</span>
				<span class="category grid-item">{{ match.matchCategory }}</span>
				<span class="homeAway grid-item">{{ match.matchHome ? 'Thuis' : 'Uit' }}</span>
				<span class="settings grid-item">
					<!-- <button class="edit" @click="editMatch(match.id)">Wijzig</button> -->
					<button class="delete" @click="removeMatch(match.id)"><font-awesome-icon icon="trash-alt" /></button>
				</span>
			</div>
		</div>

  </div>
</template>

<script>

import moment from 'moment'
import { required, integer, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Matches',
  data() {
    return {
			msg: 'matches',
      matchDate: '',
      matchOpponent: '',
      matchCategory: '',
      matchHome: '',
			clubName: '',
      opponent: [],
      categoryNamesById: new Map(),
      isDisabled: false,
      homeAway: [{name:'thuis',bln:true},{name:'uit',bln:false}],
			categories: ['Bekerwedstrijd','Competitiewedstrijd','Training','Oefenwedstrijd']
    };
  },
  validations: {
    matchDate: {
			minLength: minLength(4)
		},
		matchCategory: {
			required,
			minLength: minLength(4)
		},
		matchHome: {
			required
		},
		matchOpponent: {
			required,
			minLength: minLength(1)
		}
  },
	created() {
		this.$store.dispatch('retrieveOpponents')
    this.$store.dispatch('retrieveMatches')
    this.categoryNamesById = new Map(this.$store.getters.opponents.map(opponent => [opponent.id, opponent.clubName]))
	},
	computed: {
    matches() {
      return this.$store.getters.matches
		},
		opponents() {
      return this.$store.getters.opponents
		},
	},
	methods: {
    showModal () {
			this.$modal.show('match-modal');
		},
		hideModal () {
			this.$modal.hide('match-modal');
		},
    showOpponent(id) {
      if (id) {
        return this.categoryNamesById.get(id)
      }
    },
		laterThanToday(value) {
			if (value) {
    		return moment(value) > moment() ? 'future' : 'past'
  		}
		},
    addMatch() {
      this.$v.$touch()
			if (!this.$v.$anyError) {
        this.$store.dispatch('addMatch', {
          date: this.matchDate,
          opponent: this.matchOpponent.id,
          homeAway: this.matchHome.bln,
          category: this.matchCategory,
          timestamp: new Date(),
        })
        this.matchDate = ''
        this.matchOpponent = ''
        this.matchHome = ''
        this.matchCategory = ''
        this.hideModal()
      }
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
	grid-template-columns: 1fr ;
}
.grid-header {
	background: #eee;
}
.grid.past {
	display: none;
}
.grid, .grid-header {
  display: grid;
  grid-template-columns: 10fr 10fr 10fr 3fr 50px;
  grid-auto-rows: 2em;
	grid-row-gap: 10px;
  align-items: center;
  border-radius: 2px;
  height: 33px;
	line-height: 21px;
}
.grid-item {
  border-bottom: 1px solid #000;
	padding-bottom: 8px;
	overflow: hidden;
	height: 29px;
}
.vdatetime * {
  box-sizing: border-box;
}
.matchDate {
  width: 100% !important;
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
.settings {
	text-align: right;
}
.settings button {
	display: inline;
}

</style>
