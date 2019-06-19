import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    articles: [],
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
    tagList: [],
    mode: "home",
    parent: 0,
    isSub: 0,
    currentDir: 0,
    books: [],
    lastSaveTime: new Date(),
    selectedNav: "newNav",
    userId: "",
    authorId: "",
    method: {
      saveArticle(){
        let data = {
          article: {
            title: this.$store.state.article.title,
            createTime: Date.parse( new Date() ).toString(),
            updateTime: Date.parse( new Date() ).toString(),
            bookId: this.$store.state.article.bookId,
            content: this.$store.state.article.content,
            wordsCount: this.$store.state.article.wordsCount,
            summary: this.$store.state.article.summary,
          }
        };
        this.$http.post(ADDRESS+"/article/saveArticle", data).then((res) => {
          console.log(res);
        });
      }
    }
  },
  mutations: {
    setIsSub(state, isSub){
      state.isSub = isSub
    },
    setCurrentDir(state, currentDir){
      state.currentDir = currentDir
    },
    setBooks(state, books){
      state.books = books
    },
    setParent(state, parent){
      state.parent = parent
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
    },
    setRemoveTag(state, tag){
      for(let i=0;i<state.tagList.length;i++){
        if(tagList[i]===tag){
          state.tagList.splice(i,1)
        }
      }
    },
    setAddTag(state, tag){
      state.tagList.splice(state.tagList.length, 1, tag)
    },
    setSelectedNav(state, selectedNav){
      state.selectedNav = selectedNav
    },
    setAuthorId(state, authorId){
      state.authorId = authorId
    },
    setArticles(state, articles){
      state.articles = articles
    }
  }
})

export default store
