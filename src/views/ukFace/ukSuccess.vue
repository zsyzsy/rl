<template>
  <div>
    <van-nav-bar
      title="USBkey"
      left-arrow
      @click-left="$goBack"
    />
    <div class="img-box">
      <img class="result-img" :src="require('@/assets/success.png')" alt="USBkey发送成功">
      <p class="title">USBkey发送成功</p>
    </div>

    <div class="button">
      <van-button type="primary" block @click="goBackClick">返回</van-button>
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
    goBackClick() {
      this.$router.push('home')
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
      font-size: 22px;
      color: #293040;
      font-weight: bold;
      margin-top: 16px;
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
