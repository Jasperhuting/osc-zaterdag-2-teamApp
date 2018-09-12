import Vue from 'vue'
import Vuex from 'vuex'
import db from '../components/firebaseConfig'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loading: true,
		players: [],
		matches: [],
		opponents: [],
	},
	getters: {
		players(state) {
			return state.players
		},
		matches(state) {
			return state.matches
		},
		opponents(state) {
			return state.opponents
		}
	},
	mutations: {
		retrievePlayers(state, players) {
      state.players = players
		},
		addPlayer(state, player) {
      state.players.push({
        firstName: player.firstName,
        lastName: player.lastName,
        position: player.position,
				timestamp: new Date(),
				number: parseInt(player.number),
				imageUrl: player.imageUrl,
			})
		},
		deletePlayer(state, id) {
      const index = state.players.findIndex(item => item.id == id)

      if (index >= 0) {
        state.players.splice(index, 1)
      }
		},
		retrieveMatches(state, matches) {
      state.matches = matches
		},
		retrieveOpponents(state, opponents) {
      state.opponents = opponents
		},
		addMatch(state, match) {
      state.matches.push({
        matchDate: match.date,
        matchOpponent: match.opponent,
        matchCategory: match.category,
				matchTimestamp: new Date(),
			})
		},
		deleteMatch(state, id) {
      const index = state.matches.findIndex(item => item.id == id)

      if (index >= 0) {
        state.matches.splice(index, 1)
      }
    },
	},
	actions: {
    initRealtimeListeners(context) {
      db.collection('players').onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              const source = change.doc.metadata.hasPendingWrites ? 'Local' : 'Server'

              if (source === 'Server') {
                context.commit('addPlayer', {
                  firstName: change.doc.data().firstName,
                  lastName: change.doc.data().lastName,
                  number: parseInt(change.doc.data().number),
                  position: change.doc.data().position,
                  imageUrl: change.doc.data().imageUrl,
                })
              }
            }
            if (change.type === 'modified') {
							// TODO
            }
            if (change.type === 'removed') {
              context.commit('deletePlayer', change.doc.id)
            }
          })
				})
				
				db.collection('matches').orderBy('date', 'asc').onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              const source = change.doc.metadata.hasPendingWrites ? 'Local' : 'Server'

              if (source === 'Server') {
                context.commit('addMatch', {
                  matchDate: change.doc.data().date,
                  matchCategory: change.doc.data().category,
                  matchOpponent: change.doc.data().opponent,
                })
              }
            }
            if (change.type === 'modified') {
							// TODO
            }
            if (change.type === 'removed') {
              context.commit('deleteMatch', change.doc.id)
            }
          })
        })
		},
		retrievePlayers(context) {
			db.collection('players').get()
			.then(querySnapshot => {
				let tempPlayers = []
				querySnapshot.forEach(doc => {
					const data = {
						id: doc.id,
						firstName: doc.data().firstName,
						lastName: doc.data().lastName,
						position: doc.data().position,
						number: parseInt(doc.data().number),
						imageUrl: doc.data().imageUrl
					}
					tempPlayers.push(data)
				})
				context.commit('retrievePlayers', tempPlayers)
			})
		},
		retrieveOpponents(context) {
			db.collection('opponents').get()
			.then(querySnapshot => {
				let tempOpponents = []
				querySnapshot.forEach(doc => {
					const data = {
						id: doc.id,
						name: doc.data().name,
						address: doc.data().address,
					}
					tempOpponents.push(data)
				})
				context.commit('retrieveOpponents', tempOpponents)
			})
		},
		retrieveMatches(context) {
			db.collection('matches').orderBy('date', 'asc').get()
			.then(querySnapshot => {
				let tempMatches = []
				querySnapshot.forEach(doc => {
					const data = {
						id: doc.id,
						matchDate: doc.data().date,
						matchOpponent: doc.data().opponent,
						matchCategory: doc.data().category
					}
					tempMatches.push(data)
				})
				context.commit('retrieveMatches', tempMatches)
			})
		},
		addPlayer(context, player) {
      db.collection('players').add({
        firstName: player.firstName,
        lastName: player.lastName,
        number: parseInt(player.number),
        position: player.position,
        imageUrl: player.imageUrl,
        timestamp: new Date(),
      })
      .then(docRef => {
        context.commit('addPlayer', {
          id: docRef.id,
					firstName: player.firstName,
					lastName: player.lastName,
					number: parseInt(player.number),
					position: player.position,
					imageUrl: player.imageUrl,
					timestamp: new Date(),
        })
      })

		},
		addMatch(context, match) {
      db.collection('matches').add({
        date: match.date,
        opponent: match.opponent,
        category: match.category,
        timestamp: new Date(),
      })
      .then(docRef => {
        context.commit('addMatch', {
          id: docRef.id,
					date: match.date,
					category: match.category,
					opponent: match.opponent,
					timestamp: new Date(),
        })
      })

		},
		deletePlayer(context, id) {
      db.collection('players').doc(id).delete()
        .then(() => {
          context.commit('deletePlayer', id)
        })
		},
		deleteMatch(context, id) {
      db.collection('matches').doc(id).delete()
        .then(() => {
          context.commit('deleteMatch', id)
        })
    },
  }
})


