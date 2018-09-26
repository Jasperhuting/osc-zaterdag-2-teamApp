<template>
	<nav>
		<div class="nav-wrapper">
      <ul class="navigation">
				<li><router-link class="brand-logo" to='/'><img v-bind:src="this.osclogo" /></router-link></li>
        <!-- <li><router-link to='/overview'><i class="fa fa-th-list"></i></router-link></li> -->
        <li><router-link to='/selection'>Selectie</router-link></li>
        <li><router-link to='/matches'>Wedstrijden</router-link></li>
        <li><router-link to='/opponents'>Tegenstanders</router-link></li>
        <li><router-link to='/present'>Aanwezigheid</router-link></li>
      </ul>
    </div>
	</nav>
</template>

<script>
import osclogo from '../../assets/osclogo.svg'

export default {
	name: 'navigation',
	data () {
		return {
			osclogo,
		}
	},
	methods: {}
}
</script>

