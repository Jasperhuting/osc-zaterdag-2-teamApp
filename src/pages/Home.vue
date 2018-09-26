<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <h2>TODO:</h2>
    <v-button :onClick="consoleClick">Test</v-button>
    <ol>
      <li>All screens: add edit functionality</li>
      <li>All screens: sort functions/filter functions</li>
      <li>All screens: expand validation response</li>
      <li>selectie: filter on position</li>
      <li>selectie: change plaatje url to upload functionality (api) </li>
      <li>many more</li>
    </ol>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      players: [],
      msg: 'Welkom op de OSC zaterdag 2 app',
    };
  },
  methods: {
    consoleClick() {
      console.log('Button clicked')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
ol {
  width: 100%;
}
a {
  color: #42b983;
}
</style>
