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
        this.$axios.get("/chaobi/getBtn").then((res)=>{
          console.log(res)
          this.message = res.dataText===1?"关闭炒币脚本":"开启炒币脚本"
        })
      },
      setBtn(){
        if(this.message==="开启炒币脚本"){
          this.$axios.get("/chaobi/setBtn?btn=1").then((res)=>{
            console.log(res)
            if(res.dataText==="设置成功"){
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
          this.$axios.get("/chaobi/setBtn?btn=0").then((res)=>{
            console.log(res)
            if(res.dataText==="设置成功"){
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
