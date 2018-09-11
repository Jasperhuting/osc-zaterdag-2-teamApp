<template>
	<nav>
		<div class="nav-wrapper">
      <router-link class="brand-logo" to='/'>OSC LOGO</router-link>
      <ul class="right hide-on-med-and-down">
        <li><router-link to='/present'><i class="fa fa-calendar"></i></router-link></li>
        <li><router-link to='/overview'><i class="fa fa-th-list"></i></router-link></li>
        <li><router-link to='/players'>Spelers beheren</router-link></li>
        <li><router-link to='/matches'>Wedstrijden beheren</router-link></li>
      </ul>
    </div>
	</nav>
</template>

<script>
export default {
	name: 'navigation',
	data () {
		return {
			
		}
	},
	methods: {
		refresh: function() {
				console.log('test');
			},
	}
}
</script>

