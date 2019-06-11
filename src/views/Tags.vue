<template>
  <div class="tags-main">
    <ul>
      <li v-for="tag in concerns">
        <div>{{tag.tagName}}</div>
        <span>{{tag.concernsCount}}关注</span>
        <span>{{tag.articlesCount}}文章</span>
        <button>已关注</button>
      </li>
    </ul>

    <ul>
      <li v-for="tag in tags">
        <div>{{tag.tagName}}</div>
        <span>{{tag.concernsCount}}关注</span>
        <span>{{tag.articlesCount}}文章</span>
        <button>关注</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Tags",
    data(){
      return{
        tags:[],
        concerns:[]
      }
    }
  }
</script>

<style scoped>

</style>
