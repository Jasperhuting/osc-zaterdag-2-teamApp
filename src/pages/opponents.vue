<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
		<button v-on:click="show()">Voeg tegenstander toe</button>

		<modal name="hello-world">
			<div class="addOpponent">
				<input type="text" class="opponent-input" placeholder="Naam club" v-model="clubName">
				<button v-on:click.prevent="addOpponent">Toevoegen</button>
			</div>
		</modal>

		<div class="columns">
			<div class="grid-header">
				<span class="clubName">Naam club</span>
				<span class="change"></span>
			</div>

			<div class="grid" v-for="(opponent, i) in opponents" v-bind:key="i + '-opponent'">
				<span class="clubName grid-item">{{ opponent.clubName }}</span>
				<button class="edit" @click="editOpponent(opponent.id)">Wijzig</button>
				<button class="delete" @click="removeOpponent(opponent.id)">Verwijder</button>
			</div>
		</div>

  </div>
</template>

<script>

export default {
	name: 'Opponents',
  data() {
    return {
			msg: 'opponents',
			id: '',
      clubName: '',
    };
	},
	created() {
		this.$store.dispatch('initRealtimeListeners')
		this.$store.dispatch('retrieveOpponents')
	},
	computed: {
    opponents() {
      return this.$store.getters.opponents
    }
	},
	methods: {
		show () {
			this.$modal.show('hello-world');
		},
		hide () {
			this.$modal.hide('hello-world');
		},
		sortBy: function(opponents) {
      opponents.sort(function(a, b) {
				return a.clubName - b.clubName;
			});
    },
    addOpponent() {
      this.$store.dispatch('addOpponent', {
				id: this.id,
        clubName: this.clubName,
				timestamp: new Date(),
      })
			this.id = ''
			this.clubName = ''
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
	grid-template-columns: 4fr 1fr 1fr;
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
.addOpponent {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(50%, 1fr) ) ;
}


</style>
