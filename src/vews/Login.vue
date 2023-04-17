<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Cloud } from "laf-client-sdk"; // 引入
import { ElMessage } from "element-plus";

  // 创建cloud对象
const cloud = new Cloud({
  baseUrl: "https://ztvufn.laf.dev", // 这里的 <AppID> 需要换成自己的 AppID
    getAccessToken: ()  => localStorage.getItem('access_token'),
  timeout: 60000,
});
  
const username = ref('');
const password = ref('');

const router = useRouter();


//验证手机号码弹出框
function close() {
  err.value = false;
}

//判断用户选择项
function select(e) {
  indexUp.value = e;
}


async function handleLogin() {
  let res
  try {
    res = await cloud.invoke('login', {username : username.value, password: password.value})
    if (res.code == 1) {
      if(res.access_token) {
        // save token
        localStorage.setItem('access_token', res.access_token)
        localStorage.setItem("uid", res.uid);
        router.push('/home')
      }
    } else {
      console.error(res.error)
      return ElMessage({
        message: res.error,
        type: "error",
      });
    }
    
  } catch (error) {
    console.error(error)
    return ElMessage({
      message: res.error,
      type: "error",
    });
  }
  return res
}

async function handleRegister() {
  router.replace('/register')
}

</script>
<template>
  <div id="background">
      <div class="container">
          <form action="">
            <h1>Login</h1>
            <div class="form">
                <div class="item">
                  <label>username：</label><input type="text" name="username" v-model.trim="username" placeholder="Please enter username">
                  <!-- v-model把输入的值传输给name变量 -->
                  <br/>
                </div>
                <div class="item">
                  <label>password：</label><input type="password" name="password" v-model.trim="password" placeholder="please enter password">
                  <br/>
                </div>
            </div>
            
          </form>
              <button  type="submit" @click.prevent="handleLogin">login in</button>
              <!-- v-on点击按钮触发handlelogin方法 -->
              <button  @click.prevent="handleRegister">sign up</button>
              <keep-alive><router-view></router-view></keep-alive>
      </div>
  </div>
  </template>
  //css
  <style scoped>
  #background{
      width: 100%;
      height: 100%;
      /* background: url("../assets/bg2.jpg"); */
      background-size:100% 100%;
      position: fixed;
      top: 0;
      left: 0;
  }
  
  .container{
    width: 480px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background:#4f9ba590;
    text-align: center;
    border-radius: 20px;
    margin-top: 10px;
  }
  .container h1{
    color: aliceblue;
    margin-left: 20px;
  }
  .item {
    color: white;
    margin-left: 15%;
    margin-top: 35px;
    font-size: 20px;
    text-align: left;
  }
  .item label{
    float:left;
    width: 5em;
    margin-right: 1em;
    text-align: right;
  }
  input{
    margin-left: -5px;
    padding: 4px;
    border: solid 1px #4e5ef3;
    outline: 0;
    font: normal 13px/100% Verdana,Tahoma,sans-serif;
    width: 200px;
    height: 23px;
    background:#f1f1f190;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
  }
  button{
    position: relative;
    height: 33px;
    width: 100px;
    background: rgba(35, 19, 252, 0.425);
    border-radius: 10px;
    margin-top: 18px;
    box-shadow: none;
    color: white;
    margin-left: 40px;
    margin-right: 10px;
  
  }

  
  </style>
  