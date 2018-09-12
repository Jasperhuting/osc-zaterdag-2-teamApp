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
			// console.log(state.matches)
			return state.matches.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.matchDate) - new Date(b.matchDate);
      });
			// return state => state.sort.map(matchDate => state.matches[matchDate])
		},
		opponents(state) {
			return state.opponents
		}
	},
	mutations: {
		retrievePlayers(state, players) {
      state.players = players
		},
		retrieveMatches(state, matches) {
      state.matches = matches
		},
		retrieveOpponents(state, opponents) {
      state.opponents = opponents
		},
		addPlayer(state, player) {
      state.players.push({
				id: player.id,
        firstName: player.firstName,
        lastName: player.lastName,
        position: player.position,
				timestamp: new Date(),
				number: parseInt(player.number),
				imageUrl: player.imageUrl,
			})
		},
		addMatch(state, match) {
      state.matches.push({
				id: match.id,
        matchDate: match.date,
        matchOpponent: match.opponent,
        matchCategory: match.category,
				matchTimestamp: new Date(),
			})
		},
		addOpponent(state, opponent) {
      state.opponents.push({
				id: opponent.id,
        clubName: opponent.clubName,
				matchTimestamp: new Date(),
			})
		},
		deletePlayer(state, id) {
      const index = state.players.findIndex(item => item.id == id)

      if (index >= 0) {
        state.players.splice(index, 1)
      }
		},
		deleteMatch(state, id) {
      const index = state.matches.findIndex(item => item.id == id)

      if (index >= 0) {
        state.matches.splice(index, 1)
      }
		},
		deleteOpponent(state, id) {
      const index = state.opponents.findIndex(item => item.id == id)

      if (index >= 0) {
        state.opponents.splice(index, 1)
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
									id: change.doc.id,
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
									id: change.doc.id,
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

				db.collection('opponents').orderBy('clubName', 'asc').onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              const source = change.doc.metadata.hasPendingWrites ? 'Local' : 'Server'

              if (source === 'Server') {
                context.commit('addOpponent', {
									id: change.doc.id,
                  clubName: change.doc.data().clubName,
                })
              }
            }
            if (change.type === 'modified') {
							// TODO
            }
            if (change.type === 'removed') {
              context.commit('deleteOpponent', change.doc.id)
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
		retrieveOpponents(context) {
			db.collection('opponents').get()
			.then(querySnapshot => {
				let tempOpponents = []
				querySnapshot.forEach(doc => {
					const data = {
						id: doc.id,
						clubName: doc.data().clubName,
					}
					tempOpponents.push(data)
				})
				context.commit('retrieveOpponents', tempOpponents)
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
		addOpponent(context, opponent) {
      db.collection('opponents').add({
        clubName: opponent.clubName,
        timestamp: new Date(),
      })
      .then(docRef => {
        context.commit('addOpponent', {
          id: docRef.id,
					clubName: opponent.clubName,
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
		deleteOpponent(context, id) {
      db.collection('opponents').doc(id).delete()
        .then(() => {
          context.commit('deleteOpponent', id)
        })
    },
  }
})


