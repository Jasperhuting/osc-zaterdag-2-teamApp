<template>
	<div class="overview">
		<h3>overview</h3>
		<ul class="overview">
			<li class="overview__header">
				<h4>Players</h4>
			</li>
			<li class="overview__item" v-bind:class="{ 'overview__item--hasimage': player.imageUrl.length > 0 }" v-for="player in players" v-bind:key="player.id">
				<img class="circle" v-if="player.imageUrl" v-bind:src="player.imageUrl" alt="" />
				<span class="badge">{{player.number}}</span>
				<span class="title">{{player.firstName}} {{player.lastName}}</span>
				<p>Goals: {{ player.goals}}</p>
				<p>Clean sheets: {{ player.cleanSheets}}</p>
				<span v-for="(position, index) in player.position" :key="`position-${index}`">{{ index > 0 ? ',' : '' }} {{position}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
import db from '../components/firebaseInit'

export default {
	name: 'overview',
	data() {
    return {
      players: []
    };
	},
	methods: {
		getList: function() {
			db.collection('players').orderBy("number", "asc").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id' : doc.id,
          'firstName' : doc.data().firstName,
          'cleanSheets' : doc.data().cleanSheets,
          'goals' : doc.data().goals,
          'lastName' : doc.data().lastName,
          'number' : doc.data().number,
          'position' : doc.data().position,
          'timePlayed' : doc.data().timePlayed,
					'userId' : doc.data().userId,
					'imageUrl' : doc.data().imageUrl,
        }
        this.players.push(data);
      })
    })
		}
	},
  created() {
		this.getList()
	},
	computed: {

	}
}
</script>
