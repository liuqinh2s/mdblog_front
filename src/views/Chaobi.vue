<template>
  <div class="chaobi-main">
    <button class="btn" @click="setBtn">{{message}}</button>
  </div>
</template>

<script>
  export default {
    name: "Chaobi",
    data() {
      return {
        message: ""
      }
    },
    methods:{
      getBtn(){
        this.$http.get("/chaobi/getBtn").then((res)=>{
          console.log(res)
          this.message = res.bodyText===1?"关闭炒币脚本":"开启炒币脚本"
        })
      },
      setBtn(){
        if(this.message==="开启炒币脚本"){
          this.$http.get("/chaobi/setBtn?btn=1").then((res)=>{
            console.log(res)
            if(res.bodyText==="设置成功"){
              this.$alert("设置成功", '提示', {
                confirmButtonText: '确定',
                type: 'info',
                center: true
              })
              this.message = "关闭炒币脚本"
            }else{
              this.$alert("设置失败", '提示', {
                confirmButtonText: '确定',
                type: 'info',
                center: true
              })
            }
          })
        }else{
          this.$http.get("/chaobi/setBtn?btn=0").then((res)=>{
            console.log(res)
            if(res.bodyText==="设置成功"){
              this.$alert("设置成功", '提示', {
                confirmButtonText: '确定',
                type: 'info',
                center: true
              })
              this.message = "开启炒币脚本"
            }else{
              this.$alert("设置失败", '提示', {
                confirmButtonText: '确定',
                type: 'info',
                center: true
              })
            }
          })
        }
      }
    },
    mounted() {
      this.getBtn()
    }
  }
</script>

<style scoped>
  .chaobi-main {
    display: flex;
    justify-content: center;
    align-items: center;
  }


</style>
