import Vue from 'vue'
import Vuex from 'vuex'
import db from '../components/firebaseConfig'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loading: true,
    players: [],
	},
	getters: {
		players(state) {
			return state.players
		}
	},
	mutations: {
		retrievePlayers(state, players) {
			console.log(state, players)
      state.players = players
		},
		addPlayer(state, player) {
			console.log(state, player);
			console.log(state.players);
      state.players.push({
        firstName: player.firstName,
        lastName: player.lastName,
        position: player.position,
				timestamp: new Date(),
				number: player.number,
				imageUrl: player.imageUrl,
			})
		},
		deletePlayer(state, id) {
      const index = state.players.findIndex(item => item.id == id)

      if (index >= 0) {
        state.players.splice(index, 1)
      }
    },
	},
	actions: {
    initRealtimeListeners(context) {
      db.collection('players').onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
							console.log('added');
              const source = change.doc.metadata.hasPendingWrites ? 'Local' : 'Server'

              if (source === 'Server') {
								console.log(change.doc.data())
								console.log(change.doc)
                context.commit('addPlayer', {
                  firstName: change.doc.data().firstName,
                  lastName: change.doc.data().lastName,
                  number: change.doc.data().number,
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
						number: doc.data().number,
						imageUrl: doc.data().imageUrl
					}
					tempPlayers.push(data)
				})
				context.commit('retrievePlayers', tempPlayers)
			})
		},
		addPlayer(context, player) {
			console.log(player)
      db.collection('players').add({
        firstName: player.firstName,
        lastName: player.lastName,
        number: player.number,
        position: player.position,
        imageUrl: player.imageUrl,
        timestamp: new Date(),
      })
      .then(docRef => {
				console.log('docRef', docRef);
        context.commit('addPlayer', {
          id: docRef.id,
					firstName: player.firstName,
					lastName: player.lastName,
					number: player.number,
					position: player.position,
					imageUrl: player.imageUrl,
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
  }
})


