import db from '../../components/firebaseConfig'

const opponents = {
	state: {
		opponents: [],
	},
	getters: {
		opponents(state) {
			return state.opponents
		}
	},
	mutations: {
		retrieveOpponents(state, opponents) {
      state.opponents = opponents
		},
		
		addOpponent(state, opponent) {
      state.opponents.push({
				id: opponent.id,
        clubName: opponent.clubName,
				matchTimestamp: new Date(),
			})
		},
		
		deleteOpponent(state, id) {
      const index = state.opponents.findIndex(item => item.id == id)

      if (index >= 0) {
        state.opponents.splice(index, 1)
      }
    },
	},
	actions: {
		retrieveOpponents(context) {
			db.collection('opponents').orderBy('clubName', 'asc').get()
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

		deleteOpponent(context, id) {
      db.collection('opponents').doc(id).delete()
        .then(() => {
          context.commit('deleteOpponent', id)
        })
    },
	}
};

export default opponents;