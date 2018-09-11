<template>
	<nav>
		<div class="nav-wrapper">
      <ul class="navigation">
				<li><router-link class="brand-logo" to='/'><img v-bind:src="this.osclogo" /></router-link></li>
        <!-- <li><router-link to='/overview'><i class="fa fa-th-list"></i></router-link></li> -->
        <li><router-link to='/players'>Spelers beheren</router-link></li>
        <li><router-link to='/matches'>Wedstrijden beheren</router-link></li>
        <li><router-link to='/present'>Aanwezigheid beheren</router-link></li>
      </ul>
    </div>
	</nav>
</template>

<script>
import osclogo from '../assets/osclogo.svg'

export default {
	name: 'navigation',
	data () {
		return {
			osclogo,
		}
	},
	methods: {
		refresh: function() {
				console.log('test');
			},
	}
}
</script>

