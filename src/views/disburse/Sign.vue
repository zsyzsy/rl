<template>
  <div>
    <van-nav-bar
      title="人脸验证"
      left-arrow
      @click-left="$goBack"
    />
    <div class="img-box">
      <p class="title">支用人脸识别</p>
      <p class="text">请点击“开始人脸识别”按钮，进行人脸识别认证</p>
    </div>
    <div class="button">
      <van-button type="primary" size="large" block @click="goFace">开始人脸识别</van-button>
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
    goFace() {
      window.location = this.$route.query.faceUrl
    }
  }
}
</script>

<style scoped lang="less">
  .img-box{
    padding: 38px 20px;
    .result-img{
      width: 60px;
    }
    .title{
      font-size: 28px;
      color: #293040;
      font-weight: bold;
      margin-top: 16px;
    }
    .text{
      color: @gray-10;
      font-size: 14px;
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
