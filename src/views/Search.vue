<template>
  <div class="search-main">
    <BaseHeader></BaseHeader>
    <div class="search-container">
      <ArticleList></ArticleList>
    </div>
  </div>
</template>

<script>
    import ArticleList from "../components/ArticleList";
    import BaseHeader from "../components/BaseHeader";
    export default {
        name: "Search",
      components: {BaseHeader, ArticleList}
    }
</script>

<style scoped>
.search-main{
}

  .search-main .search-container{
    padding: 60px 1rem;
    max-width: 1032px;
    width: 100%;
    margin: 0 auto;
  }
</style>
