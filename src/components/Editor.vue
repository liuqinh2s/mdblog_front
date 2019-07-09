<template>
  <div class="editor-main">
    <div class="editor-wrap">
      <div class="title">
        <input v-model="title" placeholder="无标题" class="title-input"></input>
        <div @click="toggleTools()" class="menu">
          <i class="fas fa-ellipsis-h"></i>
          <ul class="tools" v-if="showTools">
            <li @click="back2Mine">返回目录</li>
            <li @click="saveArticle">保存</li>
            <li @click="deleteArticle">删除</li>
            <li @click="changeDir">移动</li>
            <li @click="publish" v-if="!isPublished">发表</li>
            <li @click="publishCancel" v-else>取消发表</li>
          </ul>
        </div>
      </div>
      <div ref="tags" class="tag-container">
        <input ref="tagInput" v-model="tags" placeholder="给文章分配标签，如要新建标签，按一下enter" class="tag-input"
               @input="searchTag" @keyup.enter="newTag"></input>
      </div>
      <ul v-if="tags" class="search-result">
        <li v-for="(item,index) in items" @click="addTag(item)">
          {{item}}
        </li>
      </ul>
      <textarea ref="myTextarea"></textarea>
    </div>
  </div>
</template>

<script>
  import BaseHeader from "./BaseHeader";

  export default {
    name: "Editor",
    components: {BaseHeader},
    data() {
      return {
        flag: true,
        HyperMD: null,
        cm: null,
        wordsCount: 0,
        summary: "",
        title: "",
        articleId: "",
        showTools: false,
        isPublished: false,
        tags: '',
        items: [],
        tagList: [],
        tagSet: []
      }
    },
    methods: {
      showMd() {
        require("codemirror/mode/haskell/haskell")
        this.HyperMD = require("hypermd/everything");
        // hypermd 模块会引入 codemirror 和一堆 css 文件

        // 如果需要为特殊元素添加语法高亮，请载入对应的模式
        require("codemirror/mode/htmlmixed/htmlmixed"); // Markdown 内嵌HTML
        require("codemirror/mode/stex/stex"); // TeX 数学公式
        require("codemirror/mode/yaml/yaml"); // Front Matter

        // 如果需要用第三方库增强 HyperMD 功能，请载入所需的 PowerPacks
        require("hypermd/powerpack/fold-math-with-katex"); // 将会自动引入 "katex"
        require("hypermd/powerpack/hover-with-marked"); // 将会自动引入 "marked"

        // 你还可以在此添加其他 power packs...
        // Power packs 需要第三方库，别忘记安装它们！
        this.cm = this.HyperMD.fromTextArea(this.$refs.myTextarea, {
          /* 在此添加其他编辑器选项 */
          hmdModeLoader: false, // 见下面的备注
          lineNumbers: false,
          // foldGutter: false,
          // lineWrapping: true,
          // lineWrapping: false,
          // cursorBlinkRate: -1,
        });
        this.cm.setSize('auto', "100%");
        // this.cm.setOption('hmdFoldHTML', {
        //   enabled: true
        // });
        // this.cm.hmd.Fold.setStatus("hmdFoldHTML", true);
        this.cm.hmd.Fold._enabled.html = true;
        let that = this
        this.$axios.get("/article/getArticle?articleId=" + this.$route.params.articleId).then((res) => {
          that.title = res.data.article.title
          if(res.data.article.tags!==null&&res.data.article.tags!==""){
            that.tagList = res.data.article.tags.split(';')
            that.tagSet = new Set(that.tagList)
            that.tagSet.delete("")
            that.tags = Array.from(that.tagSet)
            that.showAllTags()
          }
          that.isPublished = res.data.article.isPublished
          that.cm.setValue(res.data.article.content)
        })
        this.cm.on("change", function (instance, changeObj) {
          if (new Date().getTime() - that.$store.state.lastSaveTime.getTime() > 10 * 1000) {
            that.saveArticle()
            that.$store.commit("setLastSaveTime", new Date())
          }
        })
        // console.log(this.cm.getOption('hmdFoldHTML'));
        // console.log(this.cm.getOption('hmdFoldEmoji'));
        // var md = require('turpan');
        // console.log(md.render('# Hello world'));
        // this.$refs.myTextarea
        // let article = ""
        // let html = md.render(article)
        // console.log(html)
        // this.$refs.main.innerHTML = html;
      },
      toggle() {
        if (this.flag) {
          this.HyperMD.switchToNormal(this.cm);
          this.flag = false;
        } else {
          this.HyperMD.switchToHyperMD(this.cm);
          this.flag = true;
        }
      },
      back2Mine() {
        this.saveArticle()
        // this.$store.commit('setParent', this.$store.state.currentDir)
        this.$router.back()
      },
      showHtml() {
        this.cm.setOption("hmdFoldHTML", {
          enabled: true,
        });
        console.log(this.cm.getOption('hmdFoldHTML'));
      },
      showBooks() {
        this.$axios.post("/article/getAllTopBooks", {userId: "0c037d72-0455-4496-9529-568aed59bd5a"}).then((res) => {
          console.log(res);
        })
      },
      getHtml(article) {
        let md = require('turpan');
        return md.render(article)
      },
      image(article) {
        let imgRegex = /<img\s+[^>]*src\s*=\s*"([^>]+?)"/i;
        let result = imgRegex.exec(this.getHtml(article))
        return result ? result[1] : null
      },
      toggleTools() {
        this.$nextTick(() => {
          this.showTools = !this.showTools
        })
      },
      keyListen() {
        console.log("666")
      },
      extractContent(s) {
        let span = document.createElement('span');
        span.innerHTML = s;
        span.querySelectorAll(".markdownIt-Anchor").forEach(function (entry) {
          entry.parentNode.removeChild(entry)
        });
        return span.textContent || span.innerText;
      },
      saveArticle() {
        let markdown = this.cm.getValue()
        let raw = this.extractContent(this.getHtml(markdown))
        this.$store.commit("setArticleTitle", this.title)
        console.log(this.title)
        this.$store.commit("setArticleWordsCount", raw ? raw.length : 0)
        this.$store.commit("setArticleSummary", raw.substring(0, 100))
        this.$store.commit("setArticleContent", markdown)
        let data = {
          article: {
            id: this.articleId,
            title: this.$store.state.article.title === "" ? "无标题" : this.$store.state.article.title,
            updateTime: Date.parse(new Date()).toString(),
            bookId: this.$store.state.parent,
            content: this.$store.state.article.content,
            wordsCount: this.$store.state.article.wordsCount,
            summary: this.$store.state.article.summary,
            image: this.image(markdown),
          },
          tagList: Array.from(this.tagSet)
        };
        console.log(data)
        this.$axios.post("/article/saveArticle", data).then((res) => {
          console.log(res);
        });
      },
      deleteArticle() {
        let that = this
        let data = {
          articleId: this.articleId
        }
        this.$axios.post("/article/deleteArticle", data).then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            this.$router.push("/mine")
          }
        })
      },
      changeDir() {
        this.$router.push("/move?id=" + this.articleId + "&type=article")
      },
      publish() {
        let data = {
          articleId: this.articleId,
          tagList: Array.from(this.tagSet)
        }
        this.$axios.post("/article/publish", data).then((res) => {
          console.log(res)
          this.showTools = false
          if (res.data.code === 200) {
            this.isPublished = true
          }
        })
      },
      publishCancel() {
        let data = {
          articleId: this.articleId,
          tagList: Array.from(this.tagSet)
        }
        this.$axios.post("/article/publishCancel", data).then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            this.isPublished = false
          }
          this.showTools = false
        })
      },
      searchTag() {
        this.$axios.get("/tag/searchTag?keyword=" + this.tags).then((res) => {
          console.log(res)
          this.items = res.data
        })
      },
      addTag(item) {
        this.tagSet = new Set(this.tagList)
        this.tagSet.add(item)
        console.log(this.tagSet)
        let that = this
        let spanX = document.createElement('span')
        let span = document.createElement('span');
        spanX.innerText = '×';
        spanX.setAttribute("style", "margin-left: 6px;cursor: pointer;")
        spanX.onclick = function () {
          that.tagSet.delete(item)
          console.log(that.tagSet)
          that.$refs.tags.removeChild(span)
          let data = {
            articleId: that.articleId,
            tag: item
          }
          // this.$axios.post("/tag/removeTag", data).then((res) => {
          //   console.log("6666666666")
          //   console.log(res)
          // })
        }
        span.setAttribute("style", "display: inline-block;\n" +
          "    color: #017e66;\n" +
          "    background-color: #e7f2ed;\n" +
          "    font-size: 13px;\n" +
          "    text-align: center;\n" +
          "    margin-right: .5rem;\n" +
          "    padding: 0 6px;\n" +
          "    height: 22px;\n" +
          "    line-height: 22px;\n" +
          "    margin-bottom: 5px;")
        span.innerHTML = item;
        span.appendChild(spanX)
        let data = {
          articleId: this.articleId,
          tag: item
        }
        // this.$axios.post("/tag/addTag", data).then((res) => {
        //   console.log(res)
        //   if(res.data.code===200){
        //     this.$refs.tags.insertBefore(span, this.$refs.tagInput)
        //   }
        // })
        this.$refs.tags.insertBefore(span, this.$refs.tagInput)
        this.tags = ""
      },
      showAllTags(){
        console.log(this.tagList)
        for(let i=0;i<this.tagList.length;i++){
          let that = this
          let spanX = document.createElement('span')
          let span = document.createElement('span');
          spanX.innerText = '×';
          spanX.setAttribute("style", "margin-left: 6px;cursor: pointer;")
          spanX.onclick = function () {
            that.tagSet.delete(that.tagList[i])
            console.log(that.tagSet)
            that.$refs.tags.removeChild(span)
            let data = {
              articleId: that.articleId,
              tag: that.tagList[i]
            }
            // this.$axios.post("/tag/removeTag", data).then((res) => {
            //   console.log(res)
            // })
          }
          span.setAttribute("style", "display: inline-block;\n" +
            "    color: #017e66;\n" +
            "    background-color: #e7f2ed;\n" +
            "    font-size: 13px;\n" +
            "    text-align: center;\n" +
            "    margin-right: .5rem;\n" +
            "    padding: 0 6px;\n" +
            "    height: 22px;\n" +
            "    line-height: 22px;\n" +
            "    margin-bottom: 5px;")
          span.innerHTML = this.tagList[i];
          span.appendChild(spanX)
          this.$refs.tags.insertBefore(span, this.$refs.tagInput)
          this.tags = ""
        }
      },
      newTag(){
        this.addTag(this.tags)
      }
    },
    watch: {
      cm: function (val) {
        console.log(val.getValue())
      }
    },
    mounted() {
      this.showMd();
      this.$store.commit("setMode", 'editor')
      this.articleId = this.$route.params.articleId
    }
  }
</script>

<style scoped>
  .editor-main {
    height: 100vh;
  }

  .editor-main .back {
    padding: 1rem;
    cursor: pointer;
  }

  .editor-wrap {
    margin: 0 auto;
    /*padding-top: 60px;*/
    max-width: 900px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .editor-wrap .title-input {
    height: 60px;
    outline: none;
    border: none;
    border-bottom: 1px solid #f7f7f7;
    /*margin-bottom: 10px;*/
    margin-left: 2rem;
    width: 100%;
  }

  .editor-wrap pre {
    width: 100%;
  }

  figure {
    margin: auto;
    padding: 20px;
  }

  figcaption {
    min-width: 20%;
    max-width: 80%;
    min-height: 22px;
    padding: 10px;
    margin: 0 auto;
    border-bottom: 1px solid #d9d9d9;
    font-size: 14px;
    color: #969696;
    line-height: 1.7;
    text-align: center;
  }

  a.markdownIt-Anchor {
    display: none;
  }

  .editor-main .menu{
    right: 1rem;
  }

  .editor-main .tools {
    position: absolute;
    display: flex;
    flex-direction: column;
    list-style-type: none;
    justify-content: space-around;
    padding: 10px;
    margin: 0;
    font-size: 14px;
    width: 100px;
    z-index: 1000;
    background-color: white;
    box-shadow: 0 1px 2px rgba(0,0,0,0.25), 0 0 1px rgba(0,0,0,0.35);
    border-radius: 3px;
  }

  .editor-main .tools li{
    cursor: pointer;
    padding: 5px 10px;
  }

  .editor-main .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title svg {
    margin-right: 1rem;
    cursor: pointer;
  }

  .tag-input {
    font-size: 14px;
    height: 60px;
    outline: none;
    border: none;
    /*margin-bottom: 10px;*/
    /*display: inline-block;*/
    width: 300px;
  }

  .search-result {
    margin: 0 2rem 1rem;
    padding: 0;
    max-width: 300px;
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.18);
    border-color: #ddd;
    border: 1px solid transparent;
    border-radius: 4px;
  }

  .search-result li {
    list-style-type: none;
    font-size: 14px;
    padding: 0.5rem;
  }

  .search-result li:hover {
    color: black;
    background: #F5F5F5;
    cursor: pointer;
  }

  .tag-container {
    width: 100%;
    padding-left: 2rem;
    padding-right: 2rem;
    border-bottom: 1px solid #f7f7f7;
  }

  @media screen and (max-width: 1042px) {
    .editor-main {
      /*padding-bottom: 60px;*/
    }

    .editor-main .menu{
      position: absolute;
      right: 1rem;
    }

    .editor-main .tools {
      position: absolute;
      display: flex;
      flex-direction: column;
      list-style-type: none;
      justify-content: space-around;
      padding: 10px;
      margin: 0;
      font-size: 14px;
      width: 100px;
      right: 1rem;
      z-index: 1000;
      background-color: white;
      box-shadow: 0 1px 2px rgba(0,0,0,0.25), 0 0 1px rgba(0,0,0,0.35);
      border-radius: 3px;
    }
  }
</style>
