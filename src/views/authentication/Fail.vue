<template>
  <div>
    <van-nav-bar
      title="人脸验证"
      left-arrow
      @click-left="$goBack"
    />
    <div class="img-box">
      <img class="result-img" :src="require('@/assets/face_fail.png')" alt="验证失败">
    </div>
    <div class="button">
      <van-button type="primary" block @click="$goBack">重新验证</van-button>
    </div>
  </div>
</template>

<script>
import { NavBar, Button } from 'vant'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
  .img-box{
    padding: 38px 20px;
    .result-img{
      width: 100%;
    }
  }
  .button-list{
    display: flex;
    justify-content: center;
    padding: 16px;
    button{
      margin: 0 8px;
      padding: 16px 48px;
    }
  }
</style>
