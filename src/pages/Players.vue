<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
		<button v-on:click="show()">Voeg speler toe</button>

		<modal name="hello-world">
			<div class="addPlayer">
				<input type="text" class="player-input" placeholder="Voornaam" v-model="firstName">
				<input type="text" class="player-input" placeholder="Achternaam" v-model="lastName">
				<input type="number" class="player-input" placeholder="Nummer" v-model="number">
				<!-- <multiselect v-model="number" :options="numbers" placeholder="Selecteer nummer"></multiselect> -->
				<multiselect v-model="position" :options="positions" :multiple="true" :close-on-select="false" placeholder="Selecteer positie(s)"></multiselect>
				<input type="text" class="player-input" placeholder="ImageUrl" v-model="imageUrl">
				<button v-on:click.prevent="addPlayer">Toevoegen</button>
			</div>
		</modal>

		<div class="columns">
			<div class="grid-header">
				<span class="number" v-on:click="sortBy(players)">Nr.</span>
				<span class="firstName">Voornaam</span>
				<span class="lastName">Achternaam</span>
				<span class="position">
					<span class="position-item position-item--Aanvaller" @click="togglePosition('Aanvaller')">Aanvaller</span>
					<span class="position-item position-item--Middenvelder" @click="togglePosition('Middenvelder')">Middenvelder</span>
					<span class="position-item position-item--Verdediger" @click="togglePosition('Verdediger')">Verdediger</span>
					<span class="position-item position-item--Keeper" @click="togglePosition('keeper')">Keeper</span>
				</span>
				<span class="imageUrl">Foto</span>
				<span class="change"></span>
			</div>

			<div class="grid" v-for="(player, i) in players" v-bind:key="i + '-player'">
				<span class="number grid-item">{{ player.number }}</span>
				<span class="firstName grid-item">{{ player.firstName }}</span>
				<span class="lastName grid-item">{{ player.lastName }}</span>
				<span class="position grid-item" v-html="showPositions(player.position)"></span>
				<span class="imageUrl grid-item"><img v-bind:src="player.imageUrl" /></span>
				<span class="settings grid-item">
				<button class="delete" @click="removePlayer(player.id)">Delete player</button>
					<!-- <button class="edit" @click="editPlayer(player.id)">edit player</button> -->
				</span>
			</div>
		</div>

  </div>
</template>

<script>

export default {
	name: 'Players',
  data() {
    return {
			msg: 'players',
			id: '',
      firstName: '',
      lastName: '',
      position: '',
      number: '',
			imageUrl: '',
			positionValue: '',
			positions: ['Aanvaller','Middenvelder','Verdediger','Keeper'],
			// numbers: [],
    };
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
		show () {
			this.$modal.show('hello-world');
		},
		hide () {
			this.$modal.hide('hello-world');
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
	grid-template-columns: 1fr 2fr 2fr 4fr 2fr 2fr;
	grid-auto-rows: 2em;
	align-items: center;
	padding: 0 .5em;
	border-radius: 2px;
	overflow: hidden;
	height: 38px;
	line-height: 38px;
}
.grid-item {
	border-bottom: 1px solid #000;
	padding-bottom: 8px;
	overflow: hidden;
	height: 29px;
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
.addPlayer {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(33%, 1fr) ) ;
}


</style>
