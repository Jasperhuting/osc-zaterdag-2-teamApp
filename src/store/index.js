import Vue from 'vue'
import Vuex from 'vuex'
import db from '../components/firebaseConfig'
import players from '../store/modules/players'
import matches from '../store/modules/matches'
import opponents from '../store/modules/opponents'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		players,
		matches,
		opponents
	},
	state: {
		loading: true,
	},
	getters: {
	},
	mutations: {
		filterOnPosition(state, players, position) {
			state.players = players.filter(player => player.position.includes(position))
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

  }
})


