<template>
  <div>
    <button @click="submitPost">将文本转换为图片</button>
    <img :src="imageUrl" v-if="imageUrl" alt="转换后的图片">
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from "vue";

const imageUrl = ref('');

async function submitPost() {
  const txt2imgUrl = 'http://localhost:7860/sdapi/v1/txt2img';
  const data = {
    prompt: 'a dog wearing a hat',
    step: '5'
  };
  const response = await axios.post(txt2imgUrl, data);
  const b64Image = response.data.images[0];
  imageUrl.value = getEncodedImage(b64Image);
}

function getEncodedImage(b64Image) {
  const decodedImage = atob(b64Image);
  const arrayBuffer = new ArrayBuffer(decodedImage.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < decodedImage.length; i++) {
    uint8Array[i] = decodedImage.charCodeAt(i);
  }
  const blob = new Blob([arrayBuffer], {
    type: 'image/png'
  });
  return URL.createObjectURL(blob);
}
</script>