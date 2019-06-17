<template>
    <div class="social-main">
      <div class="author">
        <a>
          <img :src="avatar" alt="96" class="avatar">
        </a>
        <div class="info">
            <span class="name">
              <a href="#" class="name">{{name}}</a>
            </span>
          <ul class="meta">
            <li>
              <span class="words-count">{{words_count}}</span>
              <span class="words-count">关注</span>
            </li>
            <li>
              <span class="words-count">{{words_count}}</span>
              <span class="words-count">粉丝</span>
            </li>
            <li>
              <span class="words-count">{{words_count}}</span>
              <span class="words-count">文章</span>
            </li>
            <li>
              <span class="words-count">{{words_count}}</span>
              <span class="words-count">字数</span>
            </li>
            <li>
              <span class="words-count">{{words_count}}</span>
              <span class="words-count">收获喜欢</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Social"
    }
</script>

<style scoped>

</style>
