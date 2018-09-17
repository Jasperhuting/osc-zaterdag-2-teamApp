<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
		<button class="add" v-on:click="showModal()">Voeg speler toe</button>

		<modal name="player-modal" width="80%" height="auto">
			<div class="container modal-container">
				<h2>Voeg selectielid toe</h2>
			<div class="addPlayer">
				<div class="form-group" :class="{ 'form-group--error': $v.firstName.$error }">
					<label for="firstName">Voornaam*</label>
					<input type="text" name="firstName" class="player-input" placeholder="Voornaam"  v-model.trim="$v.firstName.$model">
				</div>
				<div class="form-group" :class="{ 'form-group--error': $v.lastName.$error }">
					<label for="lastName">Achternaam*</label>
					<input type="text" name="lastName" class="player-input" placeholder="Achternaam" v-model.trim="$v.lastName.$model">
				</div>
				<div class="form-group" :class="{ 'form-group--error': $v.number.$error }">
					<label for="number">Nummer*</label>
					<input type="text" name="number" class="player-input" placeholder="Nummer" v-model.trim="$v.number.$model">
				</div>
				<!-- <multiselect v-model="number" :options="numbers" placeholder="Selecteer nummer"></multiselect> -->
				<div class="form-group" :class="{ 'form-group--error': $v.position.$error }">
					<label for="position">Positie(s)*</label>
					<multiselect name="position" v-model="$v.position.$model" :options="positions" :multiple="true" :close-on-select="false" placeholder="Selecteer positie(s)"></multiselect>
				</div>
				<div class="form-group">
					<label for="imageUrl">Plaatje (url)</label>
					<input type="text" name="imageUrl" class="player-input" placeholder="ImageUrl" v-model="imageUrl">
				</div>
			</div>
			<div class="button-container">
				<button class="btn-secondary hideModal" v-on:click="hideModal()">Annuleren</button>
				<button v-on:click.prevent="addPlayer">Toevoegen</button>
			</div>
			</div>

		</modal>

		<div class="columns">
			<div class="grid-header">
				<span class="imageUrl"></span>
				<span class="number" v-on:click="sortBy(players)">Nr.</span>
				<span class="firstName">Voornaam</span>
				<span class="lastName">Achternaam</span>
				<span class="position">
					<span class="position-item position-item--Aanvaller" @click="togglePosition('Aanvaller')">Aanvaller</span>
					<span class="position-item position-item--Middenvelder" @click="togglePosition('Middenvelder')">Middenvelder</span>
					<span class="position-item position-item--Verdediger" @click="togglePosition('Verdediger')">Verdediger</span>
					<span class="position-item position-item--Keeper" @click="togglePosition('keeper')">Keeper</span>
				</span>
				<span class="change"></span>
			</div>

			<div class="grid" v-for="(player, i) in players" v-bind:key="i + '-player'">
				<span class="imageUrl grid-item"><img v-bind:src="player.imageUrl" /></span>
				<span class="number grid-item">{{ player.number }}</span>
				<span class="firstName grid-item">{{ player.firstName }}</span>
				<span class="lastName grid-item">{{ player.lastName }}</span>
				<span class="position grid-item" v-html="showPositions(player.position)"></span>
				<span class="settings grid-item">
				<button class="delete" @click="removePlayer(player.id)"><font-awesome-icon icon="trash-alt" /></button>
					<!-- <button class="edit" @click="editPlayer(player.id)">edit player</button> -->
				</span>
			</div>
		</div>

  </div>
</template>

<script>
import { required, integer, minLength, maxLength } from 'vuelidate/lib/validators'


export default {
	name: 'Selection',
  data() {
    return {
			msg: 'Selectie',
			id: '',
      firstName: '',
      lastName: '',
      position: [],
      number: '',
			imageUrl: '',
			positionValue: '',
			positions: ['Aanvaller','Middenvelder','Verdediger','Keeper'],
			// numbers: [],
    };
	},
	validations: {
    number: {
      required,
			integer,
			maxLength: maxLength(2)
		},
		lastName: {
			required,
			minLength: minLength(4)
		},
		firstName: {
			required,
			minLength: minLength(4)
		},
		position: {
			required,
			minLength: minLength(1)
		}
  },
	created() {
		this.$store.dispatch('initRealtimeListeners')
		this.$store.dispatch('retrievePlayers')
	},
	computed: {
    players() {
      return this.$store.getters.players
    }
	},
	methods: {
		showModal () {
			this.$modal.show('player-modal');
		},
		hideModal () {
			this.$modal.hide('player-modal');
		},
		sortBy: function(players) {
      players.sort(function(a, b) {
				return a.number - b.number;
			});
    },
		showPositions(positions) {
			let positionsOutput = ''
			for (var i = 0; i < this.positions.length; i ++) {
				let space = this.positions.length - 1 === i  ? '' : ' '
				let extra = ''
				if (positions) {
					extra = positions.includes(this.positions[i]) ? `position-item--${this.positions[i]}` : ''
				}
				positionsOutput += `<span class="position-item ${extra}">${this.positions[i]}</span>${space}`
			}
			return positionsOutput
		},
		togglePosition(position) {
			console.log(position)
		},

    addPlayer() {
			this.$v.$touch()
			if (!this.$v.$anyError) {
				this.$store.dispatch('addPlayer', {
					id: this.id,
					firstName: this.firstName,
					lastName: this.lastName,
					number: this.number,
					position: this.position,
					imageUrl: this.imageUrl,
					timestamp: new Date(),
				})
				this.id = ''
				this.firstName = ''
				this.lastName = ''
				this.number = ''
				this.imageUrl = ''
				this.position = ''
				this.hideModal()
			}
		},
		removePlayer(id) {
			if (id) {
				this.$store.dispatch('deletePlayer', id)
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
	grid-template-columns: 44px 44px 2fr 2fr 4fr 50px;
	grid-auto-rows: 2em;
	align-items: center;
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
.settings {
	text-align: right;
}
.settings button {
	display: inline;
}
.imageUrl {
	width: 40px;
}
.imageUrl img {
	max-width: 40px;
}
.addPlayer {
	display: grid;
	grid-template-columns: 1fr ;
}
.number {
	text-align: center;
}


</style>
