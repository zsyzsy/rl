<template>
  <div class="faceRecgnition">
    <van-nav-bar title="人脸验证" />
    <div class="face-content">
      <video v-if="videoUrl" ref="video" class="video" :src="videoUrl" />
      <img v-else class="img" :src="require('@/assets/face.png')">
    </div>
    <div class="faceRecgnition-content">
      <p class="title">录制时，请按顺序完成以下动作</p>
      <div class="content"> {{ sequence.split(',')[0] === '1'?'张嘴':'眨眼' }}<img :src="require('@/assets/arrow.png')" alt=">>>">{{ sequence.split(',')[1] === '1'?'张嘴':'眨眼' }}</div>
      <p class="label">请正对屏幕，确保光线充足，<span>并录制3-5秒</span></p>
    </div>
    <input ref="hiddenVideoInput" style="display: none;" type="file" accept="video/*" capture="user" @change="videoChange">
    <div class="button">
      <van-button block type="primary" @click="start">已记录，开始录制</van-button>
    </div>
  </div>
</template>

<script>
import { NavBar, Button } from 'vant'
import { uploadFaceFile, faceCheck, faceActionSequence,setReSendUK } from '@/api/ukface'
import { contractSign } from '@/api/disburse'

export default {
  name: 'Home',
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button
  },
  data() {
    return {
      videoUrl: '',
      fileId: '',
      sequence: '2,1',
      tokenId: this.$route.query.tokenId,
      faceType: '',
      show: this.$route.query.show
    }
  },
  mounted() {
    this.getSequence()
  },
  methods: {
    start() {
      this.$refs.hiddenVideoInput.click()
    },
    getSequence() {
      // getFaceType().then(res => { // 获取人脸类型
      //   if (res.code === '00') {
      faceActionSequence().then(res => { // 法人人脸顺序
        if (res.code === '00') {
          this.sequence = res.context.action
        }
      })
      //   }
      // })
    },
    videoChange() {
      if (this.$refs.hiddenVideoInput.files[0]) {
        this.videoUrl = window.URL.createObjectURL(this.$refs.hiddenVideoInput.files[0])
        this.$nextTick(() => {
          this.$refs.video.load()
          setTimeout(() => {
            this.validateVideo()
          }, 500)
        })
      }
    },
    validateVideo() {
      if (!this.$refs.hiddenVideoInput.files[0]) return
      this.$dialog({ message: this.$refs.video.duration })
      if (this.$refs.video.duration > 5) {
        this.$dialog({ message: '录制时间请不要超过5秒' })
        return false
      }
      if (Math.floor(this.$refs.hiddenVideoInput.files[0].size / (1024 * 1024) > 10)) {
        this.$dialog({ message: '上传视频不能超过10M，请选择720P的拍摄模式！' })
        return false
      }
      this.$dialog.confirm({
        message: `视频大约${Math.floor(this.$refs.hiddenVideoInput.files[0].size / 1024)}kb，在移动网络环境下上传，会产生手机流量，确认继续？`
      }).then(() => {
        const file = this.$refs.hiddenVideoInput.files[0]
        const formData = new FormData()
        const fileName = 'face.mp4'
        formData.append('face', file, fileName)
        formData.append('tokenId', this.tokenId)
        uploadFaceFile(this.faceType, formData).then(res => {
          if (res.code === '00') {
            this.fileId = res.context.faceFileId
            faceCheck({
              'sequence': this.sequence,
              'faceFileId': this.fileId,
              'tokenId': this.tokenId,
              'userType': '2'
            }).then(res => {
              if (res.code === '00') {
                if (res.context.checkResult) {
                  // if (this.faceType && this.faceType === '2') {
                    setReSendUK({
                      // 'faceFileId': this.fileId,
                      'tokenId': this.tokenId
                    }).then(res => {
                      if (res.code === '00') {
                        this.$router.push('faceSuccess')
                      }
                    })
                  // } else {
                  //   this.$router.push('faceSuccess')
                  // }
                } else {
                  this.$router.push('faceFail')
                }
              }
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.videoUrl = ''
        this.$refs.hiddenVideoInput.value = ''
      })
    }
  }
}
</script>

<style lang="less" scoped>
.faceRecgnition {
  .face-content {
    height: 286px;
    background: #f5f5f9;
    padding-top: 26px;
    .img,
    .video {
      height: 100%;
    }
  }
  .faceRecgnition-content {
    .title {
      color: #333333;
      font-weight: bold;
      font-size: 20px;
    }
    .content {
      color: #ff5712;
      font-size: 20px;
      font-weight: bold;
      img {
        height: 15px;
        padding: 0 20px;
      }
    }
    .label {
      color: #989898;
      font-size: 12px;
      span {
        color: #ff5712;
      }
    }
  }
}
</style>
