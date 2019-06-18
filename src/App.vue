<template>
  <div id="app">
    <BaseHeader></BaseHeader>
    <router-view/>
  </div>
</template>

<script>
  import BaseHeader from "./components/BaseHeader";

  export default {
    name: 'App',
    components: {BaseHeader}
  }
</script>

<style>

  html, body {
    font-size: 1rem;
  }

  button:focus {
    outline: none;
  }

  a:focus {
    outline: none;
  }

  *, *:before, *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
