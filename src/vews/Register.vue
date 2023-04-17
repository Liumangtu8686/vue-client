<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Cloud } from "laf-client-sdk"; // 引入
import { ElMessage } from "element-plus";

  // 创建cloud对象
const cloud = new Cloud({
  baseUrl: "https://ztvufn.laf.dev", // 这里的 <AppID> 需要换成自己的 AppID
    getAccessToken: ()  => localStorage.getItem('access_token'),
  timeout: 120000,
});
  
const username = ref('');
const password = ref('');
const email = ref('');
const code = ref('');
const router = useRouter();
const countdown = ref(0);

async function sendCode() {
  if (!email.value) {
    alert('please enter email');
    return;
  }
  let res = await cloud.invoke('sendEmail',{email: email.value});
  return ElMessage({
    message: res.message,
    type: "info",
  });
}

async function register() {
  let res
  try {
    res = await cloud.invoke('register', {username:username.value, password: password.value, email:email.value, code:code.value})
    if (res.code == 0) {
      console.error(res.error)
      return ElMessage({
        message: res.error,
        type: "error",
      });
    } else {
      router.push('/login');
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

</script>

<template>
  <div id="background">
    <div id="contain">
      <h1>Register</h1>

      <div class="form">
        <label>username：</label>
        <input type="text" v-model.trim="username"><br/>
      </div>

      <div class="form">
        <label>password：</label>
        <input type="password" v-model.trim="password"><br/>
      </div>

      <div class="form">
        <label>email：</label>
        <input type="email" v-model.trim="email"><br/>
      </div>

      <div class="form">
        <label>code：</label>
        <div class="code">
          <input type="code" v-model.trim="code">
          <button class="codesent" type="button" @click="sendCode" :disabled="countdown > 0">
            {{ countdown > 0 ? countdown + 's' : 'sent' }}
          </button>
        </div>
      </div>

      <button @click.prevent="register">submit</button>
    </div>
  </div>
</template>

<style scoped>
#background {
  width: 100%;
  height: 100%;
  /* background: url("../assets/bg2.jpg"); */
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  left: 0;
}

#contain {
  width: 540px;
  height: 560px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #4f9ba590;
  text-align: center;
  border-radius: 20px;
}

#contain h1 {
  color: white;
}

.form {
  color: white;
  margin-left: 20%;
  margin-top: 60px;
  font-size: 20px;
  text-align: left;
}

label {
  float: left;
  width: 5em;
  margin-right: 1em;
  text-align: right;
}

input,
textarea {
  margin-left: 10px;
  padding: 4px;
  border: solid 1px #4e5ef3;
  outline: 0;
  font: normal 13px/100% Verdana, Tahoma, sans-serif;
  width: 180px;
  height: 20px;
  background: #f1f1f190;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
}

input:hover,
textarea:hover,
input:focus,
textarea:focus {
  border-color: #0d0aa1;
}

button {
  position: relative;
  height: 33px;
  width: 150px;
  background: rgba(35, 19, 252, 0.425);
  border-radius: 10px;
  margin-top: 38px;
  box-shadow: none;
  color: white;
  margin-left: 40px;
}

.codesent {
  height: 33px;
  width: 50px;
  background: rgba(35, 19, 252, 0.425);
  border-radius: 10px;
  margin-top: 0;
  box-shadow: none;
  color: white;
  margin-left: 10px;
}
</style>



