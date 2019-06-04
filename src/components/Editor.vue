<template>
  <div>
    <BaseHeader v-on:save-article="saveArticle"></BaseHeader>
    <div class="editor-main">
      <el-input v-model="title" placeholder="文章标题"></el-input>
      <textarea ref="myTextarea" ></textarea>
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
        article: ""
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
      getHtml(article){
        let md = require('turpan');
        return md.render(article)
      },
      hasImage(article){
        // console.log(article);
        let imgRegex = /<img\s+[^>]*src\s*=\s*"([^>]+?)"/i;
        return imgRegex.exec(this.getHtml(article))[1]
      },
      saveArticle(){
        let html = this.cm.getValue()
        this.$store.commit("setArticleTitle", this.title)
        this.$store.commit("setArticleWordsCount", html.length)
        this.$store.commit("setArticleSummary", html.substring(0, 100))
        this.$store.commit("setArticleContent", html)
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
            // image: this.hasImage(html)
          }
        };
        this.$http.post("http://localhost:8080/api/v1/article/saveArticle", data).then((res) => {
          console.log(res);
        });
      }
    },
    mounted() {
      this.showMd();
      this.$store.commit("setIsEditorMode", true)
    }
  }
</script>

<style scoped>
  .editor-main{
    margin: 60px auto;
    max-width: 900px;
    /*border-right: .7em solid #f7f7f7;*/
  }

  .editor-main .el-input__inner{
    margin: 30px auto;
    border-top: none;
    border-left: none;
    border-right: none;
    font-size: 28px;
  }
  .editor-main{
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .editor-main pre{
    width: 100%;
  }

  figure {
    margin: auto;
    padding: 20px;
  }

  figcaption{
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

  a.markdownIt-Anchor{
    display: none;
  }
</style>
