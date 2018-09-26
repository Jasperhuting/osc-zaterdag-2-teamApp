<template>
  <div class="opponents">
    <h1>{{ msg }}</h1>
		<button class="add" v-on:click="showModal()">Voeg tegenstander toe</button>

		<modal name="opponents-modal" width="80%" height="auto">
			<div class="container modal-container">
				<h2>Voeg tegenstander toe</h2>
				<div class="addOpponent">

					<div class="form-group" :class="{ 'form-group--error': $v.clubName.$error }">
						<label for="clubName">Naam club*</label>
						<input name="clubName" type="text" class="opponent-input" placeholder="Naam club" v-model="$v.clubName.$model">
					</div>
				</div>
				<div class="button-container">
					<button class="btn-secondary hideModal" v-on:click="hideModal()">Annuleren</button>
					<button v-on:click.prevent="addOpponent">Toevoegen</button>
				</div>
			</div>
		</modal>

		<div class="columns">
			<div class="grid-header">
				<span class="clubName">Naam club</span>
				<span class="change"></span>
			</div>

			<div class="grid" v-for="(opponent, i) in opponents" v-bind:key="i + '-opponent'">
				<span class="clubName grid-item">{{ opponent.clubName }}</span>
				<span class="grid-item">
					<!-- <button class="edit" @click="editOpponent(opponent.id)">Wijzig</button> -->
					<button class="delete" @click="removeOpponent(opponent.id)"><font-awesome-icon icon="trash-alt" /></button>
				</span>
			</div>
		</div>

  </div>
</template>

<script>

import { required, integer, minLength } from 'vuelidate/lib/validators'


export default {
	name: 'Opponents',
  data() {
    return {
			msg: 'opponents',
			id: '',
      clubName: '',
    };
	},
		validations: {
    clubName: {
      required,
			minLength: minLength(2)
		},
  },
	created() {
		this.$store.dispatch('retrieveOpponents')
	},
	computed: {
    opponents() {
      return this.$store.getters.opponents
    }
	},
	methods: {
		showModal () {
			this.$modal.show('opponents-modal');
		},
		hideModal () {
			this.$modal.hide('opponents-modal');
		},
		sortBy(opponents) {
      opponents.sort((a, b) => {
				return a.clubName - b.clubName;
			});
    },
    addOpponent() {
			this.$v.$touch()
			if (!this.$v.$anyError) {
				this.$store.dispatch('addOpponent', {
					id: this.id,
					clubName: this.clubName,
					timestamp: new Date(),
				})
				this.id = ''
				this.clubName = ''
				this.hideModal()
			}
		},
		removeOpponent(id) {
			if (id) {
				this.$store.dispatch('deleteOpponent', id)
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
.grid-header {
	background: #eee;
}
.grid, .grid-header {
  display: grid;
	grid-template-columns: 1fr auto;
	grid-auto-rows: 2em;
	align-items: center;
	padding: 0 .5em;
	border-radius: 2px;
	overflow: hidden;
	height: 33px;
	line-height: 21px;
}
.grid-item {
	border-bottom: 1px solid #000;
	padding-bottom: 8px;
	overflow: hidden;
	height: 29px;
}
.addOpponent {
	display: grid;
	grid-template-columns: 1fr ;
}

</style>
