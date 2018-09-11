<template>
	<div id="dashboard">
		<h3>Dashboard</h3>

		Add Match
		<!-- {{ categoriesNew }} -->
		
		<form v-on:submit.prevent="addMatch">
			Id :<input type="text" name="id" v-model="matchId" disabled><br />
			Opponent: <input type="text" v-model="matchOpponent" name="opponent"><br />
			Category: <input type="text" v-model="matchCategory" name="category"><br />
			Date: <input type="date" v-model="matchDate" name="date"><br />
			<button type="submit">Add/Edit</button>
		</form>
		<ul>
			<li class="matches" v-bind:class="{ active: match.id == matchId }" v-for="match in matches" v-bind:key="match.id" v-on:click.prevent="editMatch(match)">
				{{match}}
				<button v-on:click="Delete(match)">Delete</button>	
			</li>
		</ul>

		Add category
		<form v-on:submit.prevent="addCategory">
			Id: <input type="text" name="id" v-model="categoryId" disabled><br />
			Name: <input type="text" v-model="categoryName" name="name"><br />
			<button type="submit">Add/Edit</button>
		</form>

		<!-- <ul>
			<li class="category" v-bind:class="{ active: category.id == categoryId }" v-for="category in categories" v-bind:key="category.id" v-on:click.prevent="editCategory(category)">
				{{category.id}} {{category.name}}
				<button v-on:click="Delete(category)">Delete</button>	
			</li>
		</ul> -->

	</div>
</template>

<script>

export default {
	name: 'dashboard',
	data () {
		return {
			categoryId: 0,
			categoryName: '',
			matchId: 0,
			matchOpponent: '',
			matchDate: '',
			matchCategory: '',
			matches: []
		}
	},
	methods: {

		editMatch: function(elem) {
			this.matchId = parseInt(elem.id)
			this.matchOpponent = elem.opponent
			this.matchCategory = elem.category
			this.matchDate = elem.date
		},
		DeleteMatch: function(elem) {
			console.log(elem.id);
			console.log(elem.name);

			this.$store.state.db.collection("matches").doc(String(elem.id)).delete().then(() => {
					console.log("Document successfully deleted!");
					this.getMatches()
					this.updateMatchID()
			}).catch(function(error) {
					console.error("Error removing document: ", error);
			});


		},
		editCategory: function(elem) {
			this.categoryId = parseInt(elem.id)
			this.categoryName = elem.name
		},
		DeleteCategory: function(elem) {
			console.log(elem.id);
			console.log(elem.name);

			this.$store.state.db.collection("categories").doc(String(elem.id)).delete().then(() => {
					console.log("Document successfully deleted!");
					// this.getCategories()
					this.updateCategoryID()
			}).catch(function(error) {
					console.error("Error removing document: ", error);
			});


		},
		// getCategories: function() {
		// 	this.categories = []
		// 	db.collection('categories').orderBy("id", "asc").get().then(querySnapshot => {
		// 		querySnapshot.forEach(doc => {
		// 			console.log(doc.data());
		// 			const data = {
		// 				'id' : doc.id,
		// 				'name' : doc.data().name
		// 			}
		// 			this.categories.push(data);
		// 		})
    // 	})
		// },
		getMatches: function() {
			this.matches = []
			this.$store.state.db.collection('matches').orderBy("id", "asc").get().then(querySnapshot => {
				querySnapshot.forEach(doc => {
					const data = {
						'id' : doc.id,
						'absent' : doc.data().absent,
						'present' : doc.data().present,
						'category' : doc.data().category,
						'date' : doc.data().date,
						'opponent' : doc.data().opponent,
						'scorers' : doc.data().scorers,
						'assists' : doc.data().assists,
						'total_absent' : doc.data().total_absent,
						'total_present' : doc.data().total_present
					}
					this.matches.push(data);
				})
    	})
		},
		updateMatchID: function() {
			this.$store.state.db.collection("matches").get().then((querySnapshot) => {
				console.log(this.matches);
				this.matchId = parseInt(this.matches[querySnapshot.size - 1].id) + 1;
			}).catch(function(error) {
				console.log("Error getting documents: ", error);
			});
		},
		addCategory: function(event) {
	
			this.$store.state.db.collection("categories").doc(String(this.categoryId)).set({
				name: this.categoryName,
				id: this.categoryId
			}).then(() => {
					console.log("Document successfully written!");
					// this.getCategories()
					this.updateCategoryID()
			})
			.catch(function(error) {
					console.error("Error writing document: ", error);
			});
		},
		addMatch: function(event) {
	
			this.$store.state.db.collection("matches").doc(String(this.matchId)).set({
				name: this.matchName,
				id: this.matchId
			}).then(() => {
					console.log("Document successfully written!");
					this.getMatches()
					this.updateMatchID()
			})
			.catch(function(error) {
					console.error("Error writing document: ", error);
			});
		},
		updateCategoryID: function() {
			this.$store.state.db.collection("categories").get().then((querySnapshot) => {
				// console.log(this.categories);
				// this.categoryId = parseInt(this.categories[querySnapshot.size - 1].id) + 1;
			}).catch(function(error) {
				console.log("Error getting documents: ", error);
			});
		},
		submit : function(){
      console.log(this.$refs.categories.submit());
    }
	},
	mounted() {
		// this.getCategories()
		this.getMatches()
		this.updateMatchID()
		this.updateCategoryID()
	},
	created() {
		console.log()
	}
}
</script>
