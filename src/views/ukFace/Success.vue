<template>
  <div>
    <van-nav-bar
      title="人脸验证"
      left-arrow
      @click-left="$goBack"
    />
    <div class="img-box">
      <img class="result-img" :src="require('@/assets/success.png')" alt="验证成功">
      <p class="title">人脸验证成功</p>
    </div>
    <div class="button">
      <van-button type="primary" block @click="ukClick">USBkey重发</van-button>
    </div>
  </div>
</template>

<script>
import { NavBar, Button } from 'vant'
import { setReSendUK } from '@/api/ukface'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button
  },
  data() {
    return {
      tokenId: this.$route.query.tokenId
    }
  },
  methods: {
    ukClick() {
      // this.$router.push('ukSuccess')
      setReSendUK({
        // 'faceFileId': this.fileId,
        'tokenId': this.tokenId
      }).then(res => {
        if (res.code === '00') {
          this.$router.push('ukSuccess')
        }
      })
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
