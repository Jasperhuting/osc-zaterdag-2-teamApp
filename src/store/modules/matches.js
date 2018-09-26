import db from '../../components/firebaseConfig'

const matches = {
	state: {
		matches: [],
	},
	getters: {
		matches(state) {
			return state.matches.sort((a, b) => {
        return new Date(a.matchDate) - new Date(b.matchDate);
      });
		},
	},
	mutations: {
		retrieveMatches(state, matches) {
      state.matches = matches
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
		deleteMatch(state, id) {
      const index = state.matches.findIndex(item => item.id == id)

      if (index >= 0) {
        state.matches.splice(index, 1)
      }
		},
	},
	actions: {
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
		deleteMatch(context, id) {
      db.collection('matches').doc(id).delete()
        .then(() => {
          context.commit('deleteMatch', id)
        })
		},
	}
};

export default matches;