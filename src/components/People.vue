<template>
  <div class="people-main">
    <ul>
      <li v-for="item in items">
        <div class="author">
            <img :src="item.avatarUrl" alt="96" class="avatar" @click="gotoSocial(item.id)">
          <div class="info">
        <span class="name" @click="gotoSocial(item.id)">
          {{item.name}}
<!--          <a :href="'./'+item.id">{{item.name}}</a>-->
        </span>
            <ul class="meta">
              <li>
                <span class="words-count">{{item.concernNum}}</span>
                <span class="meta-key">关注</span>
              </li>
              <li>
                <span class="words-count">{{item.fanNum}}</span>
                <span class="meta-key">粉丝</span>
              </li>
              <li>
                <span class="words-count">{{item.articleNum}}</span>
                <span class="meta-key">文章</span>
              </li>
              <li>
                <span class="words-count">{{item.wordNum}}</span>
                <span class="meta-key">字数</span>
              </li>
              <li>
                <span class="words-count">{{item.likeNum}}</span>
                <span class="meta-key">收获喜欢</span>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "people",
    props: ['items'],
    data(){
      return{

      }
    },
    methods:{
      gotoSocial(id){
        this.$store.commit("setAuthorId", id)
        this.$store.commit('setMode', '')
        this.$store.commit("setSelectedNav", "")
        console.log(this.$store.state.selectedNav)
        this.$router.push('/social/'+id)
      },
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .people-main ul{
    padding: 0;
  }

  .people-main>ul>li{
    list-style-type: none;
    border-bottom: 1px solid #f0f0f0;
  }

  .people-main .author{
    display: flex;
    align-items: center;
  }

  .people-main .author ul {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
  }

  .people-main .author li {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #f0f0f0;
    font-size: 12px;
    margin: 0 7px 6px 0;
    padding: 0 7px 0 0;
  }

  .people-main .author li:last-child {
    border: none;
  }

  .people-main .author li .meta-key {
    color: #969696;
  }

  .people-main .author .avatar {
    float: left;
    width: 48px;
    height: 48px;
    border: 1px solid #ddd;
    border-radius: 50%;
    cursor: pointer;
  }

  .people-main .name{
    cursor: pointer;
    color: #01a0e4;
  }

  .people-main .author {
    padding: 1rem 0;
  }

  .people-main .author .info {
    margin-left: 1rem;
  }
</style>
