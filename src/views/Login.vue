<template>
  <div class="login-register-main">
    <div class="login-register-wrap">
      <h3 class="title">
        <el-link class="title-text" v-on:click="toLogin">登陆</el-link>
        <b>·</b>
        <el-link class="title-text" v-on:click="toRegister">注册</el-link>
      </h3>
      <el-form v-show="showLogin" :model="ruleForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <el-form-item prop="userUnique">
          <el-input type="text" placeholder="请输入邮箱或手机" v-model="ruleForm.userUnique"
                    @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item prop="loginPwd">
          <el-input type="password" placeholder="请输入密码" v-model="ruleForm.loginPwd"
                    @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item prop="loginImgCode">
              <el-input type="text" placeholder="请输入图形验证码" v-model="ruleForm.loginImgCode"
                        @keyup.enter.native="login"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <img :src="imgSrc" @click="refreshImageCode" class="img-code">
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button class="button" type="primary" round v-on:click="login">登陆</el-button>
        </el-form-item>
      </el-form>

      <el-form v-show="showRegister" :model="ruleForm" :rules="rules" ref="registerForm" class="demo-ruleForm"
               v-loading="loading">
        <el-form-item prop="userName">
          <el-input type="text" placeholder="请输入用户名" v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input type="text" placeholder="请输入手机号" v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item prop="verifyCode">
              <el-input type="text" placeholder="请输入手机验证码" v-model="ruleForm.verifyCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" round v-on:click="sendVerifyCode" :disabled="codeDisabled" class="msg-button">
                {{codeMsg}}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item prop="registerImgCode">
              <el-input type="text" placeholder="请输入图形验证码" v-model="ruleForm.registerImgCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <img :src="imgSrc" @click="refreshImageCode" class="img-code">
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item prop="email">
          <el-input type="text" placeholder="请输入邮箱" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="registerPwd">
          <el-input type="password" placeholder="请输入密码" v-model="ruleForm.registerPwd"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPwd">
          <el-input type="password" placeholder="请再次确认密码" v-model="ruleForm.confirmPwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" round v-on:click="register" :disabled="isRegisterDisabled">注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {isPhone, isEmail} from '../assets/js/common.js'

  export default {
    name: 'Login',
    data() {
      let checkUserUnique = (rule, value, callback) => {
        if (!isPhone(value) && !isEmail(value)) {
          return callback(new Error('请输入格式正确的邮箱或手机号'));
        }
        callback();
      };
      let checkPhone = (rule, value, callback) => {
        if (!isPhone(value)) {
          return callback(new Error('请输入格式正确的手机号'));
        }
        callback();
      };
      let checkEmail = (rule, value, callback) => {
        if (!isEmail(value)) {
          return callback(new Error('请输入格式正确的邮箱'));
        }
        callback();
      };
      let checkRegisterPwd = (rule, value, callback) => {
        if (value.length < 6) {
          return callback(new Error('请输入至少6个字符'));
        }
        callback();
      };
      let checkConfirmPwd = (rule, value, callback) => {
        if (value !== this.ruleForm.registerPwd) {
          return callback(new Error('前后密码不一致'));
        }
        callback();
      };
      let that = this;
      let checkImageCode = function (rule, value, callback) {
        that.$axios.get('/user/sendImageCode?imageCode=' + value).then((res) => {
          console.log(res);
          if (res.data.code !== 200) {
            return callback(new Error(res.data.message));
          }
          callback();
        });
      };
      let checkUserName = function (rule, value, callback) {
        that.$axios.get('/user/isNameUsed?name=' + value).then((res) => {
          console.log(res);
          if (res.data.code !== 200) {
            return callback(new Error(res.data.message));
          }
          callback();
        });
      };
      return {
        ruleForm: {
          userUnique: "",
          loginPwd: "",
          loginImgCode: "",
          userName: "",
          mobile: "",
          verifyCode: "",
          registerPwd: "",
          confirmPwd: "",
          registerImgCode: "",
          email: ""
        },
        rules: {
          userUnique: [
            {required: true, message: '请输入邮箱或手机号', trigger: 'blur'},
            {validator: checkUserUnique, trigger: 'blur'},
          ],
          loginPwd: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          loginImgCode: [
            {required: true, message: '请输入图形验证码', trigger: 'blur'},
            {validator: checkImageCode, trigger: 'blur'},
          ],
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {validator: checkUserName, trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: checkPhone, trigger: 'blur'},
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {validator: checkEmail, trigger: 'blur'},
          ],
          registerPwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: checkRegisterPwd, trigger: 'blur'}
          ],
          confirmPwd: [
            {validator: checkConfirmPwd, trigger: 'blur'}
          ],
          registerImgCode: [
            {required: true, message: '请输入图形验证码', trigger: 'blur'},
            {validator: checkImageCode, trigger: 'blur'},
          ],
          verifyCode: [
            {required: true, message: '请输入手机验证码', trigger: 'blur'},
          ]
        },
        showLogin: true,
        showRegister: false,
        showTips: false,
        tips: '',
        // 定时器
        timer: null,
        // 是否禁用按钮
        codeDisabled: false,
        // 倒计时秒数
        countdown: 60,
        // 按钮上的文字
        codeMsg: '获取验证码',
        imgSrc: "",
        isRegisterDisabled: false,
        loading: false
      };
    },
    mounted
      () {
      document.body.className = "center";
      /*页面挂载获取cookie，如果存在userUnique的cookie，则跳转到主页，不需登录*/
      // if (getCookie('userUnique')) {
      //   this.$router.push('/home')
      // }
      this.refreshImageCode()
    }
    ,
    methods: {
      refreshImageCode() {
        let that = this;
        this.$axios({
          method: 'get',
          url: '/user/imageCode',
          responseType: "blob"
        }).then((res) => {
          console.log(res);
          let blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'})
          that.imgSrc = window.URL.createObjectURL(blob);
        })
      },
      login() {
        let that = this;
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            let sha256 = require("js-sha256").sha256;    //引入sha256库
            let hash = sha256(that.ruleForm.loginPwd);    //hash为加密后的密码
            let data = {'mobile': that.ruleForm.userUnique, 'password': hash};
            /*接口请求*/
            this.$axios.post('/user/login', data).then((res) => {
              console.log(res);
              if (res.data.code === 200) {
                this.$router.push("/")
              }
              that.$alert(res.data.message, '提示', {
                confirmButtonText: '确定',
                type: 'info',
                center: true
              })
            });
          }
        });
      }
      ,
      register() {
        let that = this;
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            that.isRegisterDisabled = true;
            let sha256 = require("js-sha256").sha256;    //引入sha256库
            let hash = sha256(that.ruleForm.registerPwd);    //hash为加密后的密码
            let data = {
              'mobile': that.ruleForm.mobile,
              'email': that.ruleForm.email,
              'password': hash,
              'name': that.ruleForm.userName,
              'verifyCode': that.ruleForm.verifyCode
            }
            this.loading = true
            /*接口请求*/
            this.$axios.post('/user/register', data).then((res) => {
              console.log(res);
              this.loading = false
              if (res.data.code !== 200) {
                that.isRegisterDisabled = false;
              }
              that.$alert(res.data.message, '提示', {
                confirmButtonText: '确定',
                type: 'info',
                center: true
              })
            })
          }
        });
      }
      ,
      sendVerifyCode() {
        if (!this.ruleForm.mobile || !isPhone(this.ruleForm.mobile)) {
          return;
        }
        /*接口请求*/
        this.$axios.get('/user/verifyCode?mobile=' + this.ruleForm.mobile).then((res) => {
          console.log(res);
          // 验证码60秒倒计时
          this.codeMsg = "重新发送(" + this.countdown + ")";
          this.codeDisabled = true;
          if (!this.timer) {
            this.timer = setInterval(() => {
              if (this.countdown > 0 && this.countdown <= 60) {
                this.countdown--;
                if (this.countdown !== 0) {
                  this.codeMsg = "重新发送(" + this.countdown + ")";
                } else {
                  clearInterval(this.timer);
                  this.codeMsg = "获取验证码";
                  this.countdown = 60;
                  this.timer = null;
                  this.codeDisabled = false;
                }
              }
            }, 1000)
          }
        });
      }
      ,
      toRegister() {
        this.showLogin = false;
        this.showRegister = true
      }
      ,
      toLogin() {
        this.showLogin = true;
        this.showRegister = false
      }
    }
  }

</script>
<style scoped>

  .img-code {
    width: 100%;
  }

  .msg-button {
    width: 100%;
    padding: 12px 0px;
    outline: none;
  }

  .login-register-main {
    height: 100vh;
    /*background-color: #f1f1f1;*/
    background-image: url("../assets/background3.jpg");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-register-wrap {
    width: 400px;
    padding: 50px 50px 30px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
    box-sizing: border-box;
    text-align: center;
  }

  .title {
    font-size: 18px;
    padding: 10px;
    color: #969696;
    cursor: pointer;
    margin: 0 auto 15px;
    font-weight: 400;
  }

  .title-text {
    font-size: 18px;
    padding: 10px;
    color: #969696;
    cursor: pointer;
    font-weight: 400;
  }

  .center {
    /*height: 100%;*/
    /*min-height: 750px;*/
    /*text-align: center;*/
    /*font-size: 14px;*/
    background-color: #f1f1f1;
  }

  b {
    padding: 10px;
    font-weight: 700;
  }

  .input {
    padding: 15px 0px 15px 0px;
  }

  .button {
    width: 100%;
    outline: none;
  }

  .warning {
    color: red;
  }

  .login {
    height: 100%;
  }

  .hello {
    display: inline-block;
  }

  @media screen and (max-width: 400px) {
    .login-register-wrap {
      width: 100%;
      height: 100%;
      padding: 50px 50px 30px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 0 8px rgba(0, 0, 0, .1);
      box-sizing: border-box;
      top: 0;
      left: 0;
      margin: 0;
    }
  }

</style>
