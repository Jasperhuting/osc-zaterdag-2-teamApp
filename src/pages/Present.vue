<template>
	<div id="present">
		<h3>Present</h3>
		<div class="present">
			<li class="present__item"  v-for="match in matches" v-bind:key="match.id">
				id : {{ match.id }} <br />
				absent : {{ match.absent }} <br />
				present : {{ match.present }} <br />
				category : {{ categories[match.category].name }} <br />
				date : {{ match.date }} <br />
				opponent : {{ opponents[match.opponent] }} <br />
				scorers : {{ match.scorers }} <br />
				total_absent : {{ match.total_absent }} <br />
				total_present : {{ match.total_present }} <br />
			</li>
		</div>

	</div>
</template>

<script>
import db from '../components/firebaseInit'

export default {
name: 'present',
	data () {
		return {
			matches: [],
			opponents: [],
			categories: [],
		}
	},
	methods: {
		getList: function() {
			db.collection('matches').orderBy("date", "asc").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.data());
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
		getOpponents: function() {
			db.collection('opponents').orderBy("id", "asc").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.data());
        const data = {
					'id' : doc.id,
					'name' : doc.data().name,
					'address' : doc.data().address
        }
        this.opponents.push(data);
      })
    })
		},
		getCategories: function() {
			db.collection('categories').orderBy("id", "asc").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.data());
        const data = {
					'id' : doc.id,
					'name' : doc.data().name
        }
        this.categories.push(data);
      })
    })
		}
	},
  created() {
		this.getOpponents()
		this.getCategories()
		this.getList()
	},
};
</script>
