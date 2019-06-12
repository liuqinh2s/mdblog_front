<template>
  <div class="tags-main">
    <BaseHeader selected-nav="tagNav"></BaseHeader>
    <div class="tags-wrap">
      <ul>
        <li v-for="tag in concerns">
          <div class="tag-title">{{tag.tagName}}</div>
          <div class="info-div">
            <span class="tag-info">{{tag.concernsCount}}关注</span>
            <span class="tag-info">{{tag.articlesCount}}文章</span>
          </div>
          <div class="button-div">
            <button>已关注</button>
          </div>
        </li>
      </ul>

      <ul>
        <li v-for="tag in tags">
          <div class="tag-title">{{tag.tagName}}</div>
          <div class="info-div">
            <span class="tag-info">{{tag.concernsCount}}关注</span>
            <span class="tag-info">{{tag.articlesCount}}文章</span>
          </div>
          <div class="button-div">
            <button>关注</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BaseHeader from "../components/BaseHeader";

  export default {
    name: "Tags",
    components: {BaseHeader},
    data() {
      return {
        tags: [],
        concerns: []
      }
    },
    mounted() {
      this.$http.get("http://192.168.1.151:8080/api/v1/tag/getAllTags").then((res) => {
        console.log(res)
        this.tags = res.data
      })
    }
  }
</script>

<style scoped>
  .tags-wrap {
    padding-top: 60px;
    padding-bottom: 60px;
    margin: 0 auto;
    max-width: 900px;
  }

  .tags-wrap .tag-title {
    font-size: 1.4rem;
    line-height: 2rem;
    color: #333;
    display: flex;
    justify-content: center;
    padding: 1rem;
  }

  .tags-wrap .tag-info {
    font-size: 14px;
    color: #909090;
  }

  .tags-wrap li button {
    display: block;
  }

  .tags-wrap .info-div {
    display: flex;
    justify-content: space-around;
  }

  .tags-wrap .button-div{
    display: flex;
    justify-content: center;
    padding: 1rem;
  }

  .tags-wrap .button-div button{
    background-color:  #37c700;
    border-radius: 2px;
    border: none;
    padding: 5px 1.3rem;
    outline: none;
    color: white;
    font-size: 14px;
  }

  @media screen and (min-width: 1042px) {
    .tags-wrap ul {
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    .tags-wrap li {
      list-style-type: none;
      min-width: 172px;
      margin: 10px;
      border: 1px solid #f1f1f1;
    }
  }

  @media screen and (max-width: 1042px) {
    .tags-wrap ul {
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
    }

    .tags-wrap li {
      list-style-type: none;
      min-width: 140px;
      margin: 5px;
      border: 1px solid #f1f1f1;
    }

    .tags-wrap .tag-title {
      font-size: 1.2rem;
      line-height: 2rem;
      color: #333;
      display: flex;
      justify-content: center;
      padding: 1rem;
    }
  }
</style>
