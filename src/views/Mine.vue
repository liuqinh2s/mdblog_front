<template>
  <Social :user-id="getUserId()"></Social>
</template>

<script>
  import BaseHeader from "../components/BaseHeader";
  import {timeStamp2Date} from "../assets/js/common.js"
  import Social from "./Social";
  import {getCookie} from "../assets/js/cookie";

  export default {
    name: "Mine",
    components: {Social, BaseHeader},
    methods: {
      getUserId(){
        this.$store.commit("setAuthorId", getCookie('userId'))
        return getCookie('userId')
      }
    },
    mounted() {
      this.$store.commit('setMode', 'book')
      // this.$store.commit("setSelectedNav", "3")
    }
  }
</script>

<style scoped>
  .mine-main li {
    list-style-type: none;
    padding: 1rem;
    border-bottom: 1px solid #f7f7f7;
  }

  .mine-main li span {
    cursor: pointer;
  }

  .mine-main li .tools {
    cursor: pointer;
  }

  .mine-main li .line {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .mine-main ul {
    padding: 0;
  }

  .mine-main li svg {
    margin-right: 8px;
  }

  .mine-wrap {
    margin: 0 auto;
    max-width: 900px;
    padding-right: 15px;
    padding-left: 15px;
  }

  .mine-main .time {
    font-size: 12px;
    color: #b4b4b4;
    padding-top: 5px;
  }

  .mine-main .back {
    padding: 1rem;
    cursor: pointer;
  }

  .modal-mask {
    background-color: rgba(0, 0, 0, .5);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    display: table;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    margin: auto;
    top: 50%;
    background-color: white;
    width: 90%;
    max-width: 500px;
    padding: 8px;
    border-radius: 5px;
  }

  .modal-header {
    /*margin-top: 30px;*/
    /*color:#42b983;*/
    text-align: center;
    border-bottom: none;
  }

  .modal-body {
    /*margin: 20px 0 40px;*/
    text-align: center;
  }

  .modal-default-button {
    background: #EE4D4D;
    color: white;
    border: none;
    width: 80%;
    line-height: 20px;
    height: 30px;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .modal-footer {
    text-align: center;
    border-top: none;
  }

  .mine-main .rename-input {
    border: none;
    outline: none;
    border-bottom: 2px #01a0e4 solid;
    width: 100%;
  }

  .modal-cancel {
    margin-right: 1rem;
    cursor: pointer;
  }

  .modal-confirm {
    color: #01a0e4;
    cursor: pointer;
  }

  @media screen and (max-width: 1042px) {
    .mine-wrap {
      padding-bottom: 60px;
    }
  }
</style>
