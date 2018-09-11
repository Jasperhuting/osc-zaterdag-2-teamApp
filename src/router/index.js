import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Overview from '@/pages/Overview';
import Dashboard from '@/pages/Dashboard';
import Present from '@/pages/Present';
import Players from '@/pages/Players';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/players',
      name: 'Players',
      component: Players,
    },
    {
      path: '/overview',
      name: 'Overview',
      component: Overview,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/present',
      name: 'Present',
      component: Present,
    },
  ],
});
