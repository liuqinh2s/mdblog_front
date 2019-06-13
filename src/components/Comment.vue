<template>
  <div class="comment-main">
    <div>
      <form class="new-comment">
        <a>
          <img class="comment-avatar"
               src="//upload.jianshu.io/users/upload_avatars/3089421/8bb9554e-e13c-4ee0-b20f-2ee42474a23d.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/114/h/114/format/webp">
        </a>
        <textarea placeholder="写下你的评论..." v-model="commentContent" class="comment-area"></textarea>
      </form>
      <div class="btns">
<!--        <span class="btn-cancel" @click="cancelSend">取消</span>-->
        <button class="btn-send" @click="sendComment(commentContent)">发送</button>
      </div>
    </div>
    <ul class="comments">
      <li v-for="(item,index) in items">
        <div class="comment-title">
          <img :src="item.avatarUrl" class="comment-avatar">
          <div class="comment-info">
            <div class="user-name">{{item.name}}</div>
            <div class="time">{{timeStamp2Time(item.createTime)}}</div>
          </div>
        </div>
        <pre class="content">{{item.content}}</pre>
        <div class="comment-meta">
          <div class="zan" @click="addZan(item)">
            <div :class="item.ifZaned>0?'thumb thumb-active':'thumb'">
              <i class="far fa-thumbs-up"></i>
            </div>
            <span v-if="item.zanNum===0"> 赞</span>
            <span v-else>{{item.zanNum}} 赞</span>
          </div>
          <div class="reply" @click="reply(index)">
            <i class="far fa-comment-alt"></i>
            <span>回复</span>
          </div>
        </div>
        <form v-show="showReply[index]" class="add-comment">
          <textarea placeholder="写下你的评论..." v-model="commentContent1" class="comment-area"></textarea>
          <div class="btns">
            <span class="btn-cancel" @click="cancelSend(index)">取消</span>
            <button class="btn-send" @click="sendComment(commentContent1)">发送</button>
          </div>
        </form>
      </li>
    </ul>
  </div>
</template>

<script>
  import {timeStamp2Time} from '../assets/js/common.js'

  export default {
    name: "Comment",
    data() {
      return {
        items: [],
        commentContent: "",
        commentContent1: "",
        showReply: []
      }
    },
    props: ['articleId'],
    methods: {
      timeStamp2Time(time) {
        return timeStamp2Time(time)
      },
      cancelSend(index){
        this.showReply.splice(index,1,false)
        this.commentContent1 = ""
      },
      sendComment(content) {
        let data = {
          articleId: this.$route.params.articleId,
          userId: this.$store.state.userId,
          content: content
        }
        let that = this
        this.$http.post("http://192.168.1.151:8080/api/v1/comment/addComment", data).then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            this.commentContent = ""
            this.$http.get("http://192.168.1.151:8080/api/v1/article/getComments?articleId=" + this.articleId).then((res) => {
              console.log(res)
              that.items.splice(0, that.items.length)
              that.items = res.data
            })
          }
        })
      },
      addZan(item) {
        let data = {
          objectId: item.commentId,
          type: "zan"
        }
        let key = ""
        if (item.ifZaned === 0) {
          key = "justDo"
        } else {
          key = "cancel"
        }
        this.$http.post("http://192.168.1.151:8080/api/v1/article/" + key, data).then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            if (key === "justDo") {
              item.ifZaned += 1
              item.zanNum += 1
            } else {
              item.ifZaned -= 1
              item.zanNum -= 1
            }
          }
        })
      },
      reply(index) {
        this.showReply.splice(index,1,!this.showReply[index])
      }
    },
    mounted() {
      this.$http.get("http://192.168.1.151:8080/api/v1/article/getComments?articleId=" + this.articleId).then((res) => {
        console.log(res)
        this.items = res.data
      })
    }
  }
</script>

<style scoped>
  .comment-main {
    margin-top: 60px;
  }

  .comment-main .new-comment {
    display: flex;
  }

  .comment-main .comment-avatar {
    border: 1px solid #ddd;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    margin-right: 1rem;
  }

  .comment-main .comment-area {
    padding: 10px 15px;
    width: 100%;
    height: 80px;
    font-size: 13px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    background-color: hsla(0, 0%, 71%, .1);
    resize: none;
    display: inline-block;
    vertical-align: top;
    outline-style: none;
  }

  .comment-main .btn-send {
    /*float: right;*/
    width: 78px;
    margin: 10px 0;
    padding: 8px 18px;
    font-size: 16px;
    border: none;
    border-radius: 20px;
    color: #fff !important;
    background-color: #42c02e;
    cursor: pointer;
    outline: none;
    /*display: block;*/
  }

  .comment-main li {
    list-style-type: none;
    margin: 0;
    padding: 1rem 0 1rem;
    border-top: 1px solid #f0f0f0;
  }

  .comments {
    margin-top: 80px;
    padding: 1rem 0 1rem;
  }

  .comment-info {
    width: 100%;
  }

  .comment-title {
    display: flex;
    align-items: center;
    padding-bottom: 1rem;
  }

  .user-name {
    font-size: 15px;
    color: #333;
  }

  .time {
    font-size: 12px;
    color: #969696;
  }

  .content {
    padding-bottom: 1rem;
  }

  .comment-meta {
    color: #969696;
  }

  .comment-meta span {
    margin-right: 1rem;
    font-size: 14px;
  }

  .zan, .reply {
    display: inline-block;
    cursor: pointer;
  }

  .comment-main pre {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    margin-bottom: 0;
    font-size: 14px;
    line-height: 1.5;
  }

  .comment-main .thumb {
    display: inline-block;
  }

  .comment-main .thumb-active {
    color: #01a0e4;
  }

  .add-comment{
    /*padding: 1rem 0;*/
    height: 160px;
    margin-top: 20px;
    padding: 5px 0 5px 20px;
    border-left: 2px solid #d9d9d9;
  }

  .comment-main .btns{
    float: right;
  }

  .comment-main .btn-cancel{
    margin-right: 1rem;
    color: #969696;
  }

  .comment-main .btn-cancel:hover{
    color: black;
    cursor: pointer;
  }
</style>
