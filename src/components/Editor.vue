<template>
  <div class="editor-main">
    <BaseHeader v-on:save-article="saveArticle"></BaseHeader>
    <div class="editor-wrap">
      <div class="title">
        <input v-model="title" placeholder="无标题"></input>
        <div @click="toggleTools()">
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </div>
      <ul class="tools" v-if="showTools">
        <li>删除</li>
        <li>移动</li>
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
        showTools: false
      }
    },
    methods: {
      showMd() {
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
          hmdModeLoader: true, // 见下面的备注
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
        this.$http.get("http://localhost:8080/api/v1/article/getArticle?articleId=" + this.$route.params.articleId).then((res) => {
          that.title = res.data.article.title
          that.cm.setValue(res.data.article.content)
        })
        this.cm.on("change", function (instance, changeObj) {
          if (new Date().getTime() - that.$store.state.lastSaveTime.getTime() > 10 * 1000){
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
      showHtml() {
        this.cm.setOption("hmdFoldHTML", {
          enabled: true,
        });
        console.log(this.cm.getOption('hmdFoldHTML'));
      },
      showBooks() {
        this.$http.post("http://localhost:8080/api/v1/article/getAllTopBooks", {userId: "0c037d72-0455-4496-9529-568aed59bd5a"}).then((res) => {
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
      getHtml(article){
        let md = require('turpan')
        return md.render(article)
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
            title: this.$store.state.article.title===""?"无标题":this.$store.state.article.title,
            updateTime: Date.parse(new Date()).toString(),
            bookId: this.$store.state.article.bookId,
            tags: this.$store.state.article.tags,
            content: this.$store.state.article.content,
            wordsCount: this.$store.state.article.wordsCount,
            summary: this.$store.state.article.summary,
            image: this.image(markdown),
          }
        };
        console.log(data)
        this.$http.post("http://localhost:8080/api/v1/article/saveArticle", data).then((res) => {
          console.log(res);
        });
      },
    },
    watch: {
      cm: function (val) {
        console.log(val.getValue())
      }
    },
    mounted() {
      this.showMd();
      this.$store.commit("setIsEditorMode", true)
      this.articleId = this.$route.params.articleId
    }
  }
</script>

<style scoped>
  .editor-main {
    height: 100vh;
  }

  .editor-wrap {
    margin: 0 auto;
    padding-top: 60px;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .editor-wrap input {
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

  .editor-main .tools {
    display: flex;
    list-style-type: none;
    justify-content: space-around;
    padding: 10px;
    margin: 0;
    font-size: 14px;
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

  @media screen and (max-width: 1042px) {
    .editor-main {
      padding-bottom: 60px;
    }
  }
</style>
