<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

  html, body{
    font-size: 1rem;
  }

  button:focus {
    outline: none;
  }

  a:focus{
    outline: none;
  }

*, *:before, *:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
