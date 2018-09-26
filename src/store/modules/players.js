import db from '../../components/firebaseConfig'

const players = {
	state: {
		players: [],
		currentPlayer: [],
	},
	getters: {
		players(state) {
			return state.players
		},
	},
	mutations: {
		// filterOnPosition(state, players, position) {
		// 	console.log(state.players)
		// 	console.log(players)
		// 	state.players = players.filter(player => player.position.includes(position))
		// },
		retrievePlayers(state, players) {
      state.players = players
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
		deletePlayer(state, id) {
      const index = state.players.findIndex(item => item.id == id)

      if (index >= 0) {
        state.players.splice(index, 1)
      }
		},
		getPlayer(state, player) {
			state.currentPlayer = player
      // const index = state.players.findIndex(item => item.id == id)

      // if (index >= 0) {
      //   state.players.splice(index, 1)
      // }
		},
	},
	actions: {
		retrievePlayersByPosition(context, filterOnPositionState) {
			db.collection('players').orderBy('number', 'asc').get()
			.then(querySnapshot => {
				let tempPlayers = []
				querySnapshot.forEach(doc => {
					let filterOnPositionArray = Object.keys(filterOnPositionState)
					console.log(filterOnPositionArray);
					console.log(doc.data().position)
					if (doc.data().position.includes(filterOnPositionArray)) {
						const data = {
							id: doc.id,
							firstName: doc.data().firstName,
							lastName: doc.data().lastName,
							position: doc.data().position,
							number: parseInt(doc.data().number),
							imageUrl: doc.data().imageUrl
						}
						tempPlayers.push(data)
					}
				})
				context.commit('retrievePlayers', tempPlayers)
			})
		},
		retrievePlayers(context) {
			console.log(context)
			db.collection('players').orderBy('number', 'asc').get()
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
		deletePlayer(context, id) {
			db.collection('players').doc(id).delete()
				.then(() => {
					context.commit('deletePlayer', id)
				})
		},
		getPlayer(context, id) {
			db.collection('players').doc(id).get()
				.then(doc => {
						const data = {
							id: doc.id,
							firstName: doc.data().firstName,
							lastName: doc.data().lastName,
							position: doc.data().position,
							number: parseInt(doc.data().number),
							imageUrl: doc.data().imageUrl
						}
					context.commit('getPlayer', data)
				})
		},
	}
};

export default players;