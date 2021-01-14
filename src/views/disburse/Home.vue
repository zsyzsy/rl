<template>
  <div class="faceRecgnition">
    <van-nav-bar
      title="支用签章"
    />
    <div v-for="item in contractList" :key="item.contractSeq" class="contract-box">
      <!-- <div class="title">{{ item.contractName }}</div> -->
      <div class="container" @click="goContract(item)">
        <div class="money">{{ item.contractName }}</div>
        <div class="text">{{ cifName }}</div>
        <van-icon class="arrow" name="arrow" />
      </div>
    </div>
    <van-checkbox v-model="checked" class="check-box" checked-color="#FFD630">我已经阅读并同意《企业抵押担保借口合同》及《委托支付书》,四川天府银行将采用中国金融认证(CFCA)证书为您签名</van-checkbox>
    <van-button :disabled="!checked" class="bottom-btn" size="large" type="primary" block @click="submit">同意并签章</van-button>
  </div>
</template>

<script>
import { NavBar, Button, Checkbox } from 'vant'
import { queryContract } from '@/api/disburse'

export default {
  name: 'Home',
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox
  },
  data() {
    return {
      checked: false,
      tokenId: this.$route.query.tokenId,
      contractList: '',
      cifName: '',
      faceUrl: ''
    }
  },
  mounted() {
    this.getContractList()
  },
  methods: {
    getContractList() {
      queryContract({
        'tokenId': this.tokenId
      }).then(res => {
        if (res.code === '00') {
          this.contractList = res.context.list
          this.cifName = res.context.cifName
          this.faceUrl = res.context.faceUrl
        }
      })
    },
    goContract(item) {
      this.$router.push({
        name: 'Contract',
        query: {
          contractId: item.contractId
        }
      })
    },
    submit() {
      if (!this.checked) {
        this.$dialog.alert({
          title: '温馨提示',
          message: '请勾选同意承诺'
        })
        return false
      }
      this.$router.push({
        name: 'Sign',
        query: {
          faceUrl: this.faceUrl
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.contract-box{
  .title{
    color: @gray-9;
    font-weight: bold;
    margin: 42px 33px 12px;
    text-align: left;
  }
  .container{
    position: relative;
    margin: 12px 33px;
    padding: 20px 16px;
    border-radius: 12px;
    border: 1px solid rgba(223, 225, 230, 1);
    font-weight: bold;
    &:active{
      background: @gray-2;
    }
    .money{
      font-size: 18px;
      padding: 2px 12px;
      color: @gray-9;
    }
    .text{
      padding: 0 12px;
      color: @gray-10;
    }
    .arrow{
      position: absolute;
      right: 12px;
      top: calc(50% - 8px);
    }
  }
}
.bottom-btn{
  position: fixed;
  bottom: 0;
}
.check-box{
  position: fixed;
  text-align: left;
  padding: 12px 16px;
  bottom: 50px;
  font-size: 12px;
  color: @gray-10;
}
</style>
