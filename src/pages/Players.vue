<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2></h2>
		<input type="text" class="player-input" placeholder="Voornaam" v-model="firstName">
		<input type="text" class="player-input" placeholder="Achternaam" v-model="lastName">
		<input type="text" class="player-input" placeholder="Nummer" v-model="number">
		<multiselect v-model="position" :options="positions" :multiple="true"></multiselect>
		<input type="text" class="player-input" placeholder="ImageUrl" v-model="imageUrl">
		<button v-on:click.prevent="addPlayer">Toevoegen</button>

		<div class="columns">
			<div class="grid">
				<span class="number">Nr.</span>
				<span class="firstName">Voornaam</span>
				<span class="lastName">Achternaam</span>
				<span class="position">Positie(s)</span>
				<span class="imageUrl">Foto</span>
				<span class="change"></span>
			</div>

			<div class="grid" v-for="player in players" v-bind:key="player.id">
				<span class="number grid-item">{{ player.number }}</span>
				<span class="firstName grid-item">{{ player.firstName }}</span>
				<span class="lastName grid-item">{{ player.lastName }}</span>
				<span class="position grid-item">{{ player.position }}</span>
				<span class="imageUrl grid-item"><img v-bind:src="player.imageUrl" /></span>
				<span class="settings grid-item">
					<button class="delete" @click="removePlayer(player.id)">Delete player</button>
					<button class="edit" @click="editPlayer(player.id)">edit player</button>
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
      firstName: '',
      lastName: '',
      position: '',
      number: '',
			imageUrl: '',
			positionValue: '',
			positions: ['Aanvaller','Middenvelder','Verdediger','Keeper']
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
    addPlayer() {
      this.$store.dispatch('addPlayer', {
        firstName: this.firstName,
        lastName: this.lastName,
        number: this.number,
        position: this.position,
				imageUrl: this.imageUrl,
				timestamp: new Date(),
      })
      this.firstName = ''
      this.lastName = ''
      this.number = ''
			this.imageUrl = ''
			this.position = ''
		},
		removePlayer(id) {
			console.log(id);
      this.$store.dispatch('deletePlayer', id)
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
  grid-template-columns: 1fr 2fr 2fr 3fr 2fr 2fr;
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
