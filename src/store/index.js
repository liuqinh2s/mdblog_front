import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isEditorMode: false,
    article: {
      title: "",
      createTime: "",
      updateTime: "",
      bookId: "",
      tags: "",
      content: "",
      wordsCount: 0,
      summary: "",
      viewsCount: 0,
      commentsCount: 0,
      likesCount: 0,
      authorName: ""
    },
    mode: "home",
    lastSaveTime: new Date(),
    userId: "",
    method: {
      saveArticle(){
        let data = {
          article: {
            title: this.$store.state.article.title,
            createTime: Date.parse( new Date() ).toString(),
            updateTime: Date.parse( new Date() ).toString(),
            bookId: this.$store.state.article.bookId,
            tags: this.$store.state.article.tags,
            content: this.$store.state.article.content,
            wordsCount: this.$store.state.article.wordsCount,
            summary: this.$store.state.article.summary,
          }
        };
        this.$http.post("http://localhost:8080/api/v1/article/saveArticle", data).then((res) => {
          console.log(res);
        });
      }
    }
  },
  mutations: {
    setIsEditorMode(state, isEditorMode){
      state.isEditorMode = isEditorMode
    },
    setArticleTitle(state, title){
      state.article.title = title
    },
    setArticleCreateTime(state, createTime){
      state.article.createTime = createTime
    },
    setArticleUpdateTime(state, updateTime){
      state.article.updateTime = updateTime
    },
    setArticleBookId(state, bookId){
      state.article.bookId = bookId
    },
    setArticleTags(state, tags){
      state.article.tags = tags
    },
    setArticleContent(state, content){
      state.article.content = content
    },
    setArticleWordsCount(state, wordsCount){
      state.article.wordsCount = wordsCount
    },
    setArticleSummary(state, summary){
      state.article.summary = summary
    },
    setArticleViewsCount(state, viewsCount){
      state.article.viewsCount = viewsCount
    },
    setArticleCommentsCount(state, commentsCount){
      state.article.commentsCount = commentsCount
    },
    setArticleLikesCount(state, likesCount){
      state.article.likesCount = likesCount
    },
    setArticleAuthorName(state, authorName){
      state.article.authorName = authorName
    },
    setMode(state, mode){
      state.mode = mode
    },
    setLastSaveTime(state, lastSaveTime){
      state.lastSaveTime = lastSaveTime
    },
    setUserId(state, userId){
      state.userId = userId
    }
  }
})

export default store
