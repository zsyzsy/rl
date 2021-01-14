<template>
  <div>
    <van-nav-bar
      title="查看合同及协议"
      left-arrow
      @click-left="$goBack"
    />
    <div id="contract">
      <div v-for="page in numPages" :key="page" style="display: block;width: 100%;">
        <img :id="'the-img'+page" class="pdf-item" src="">
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Button } from 'vant'
import { getContractInfo } from '@/api/disburse'
import PDFJS from '../../static/pdfjs/build/pdf.js'

PDFJS.GlobalWorkerOptions.workerSrc = process.env.NODE_ENV === 'production'
  ? '../static/pdfjs/build/pdf.worker.js' : '/static/pdfjs/build/pdf.worker.js'
const CMAP_URL = process.env.NODE_ENV === 'production'
  ? '../static/pdfjs/web/cmaps/' : '/static/pdfjs/web/cmaps/'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button
  },
  data() {
    return {
      numPages: '',
      pdfDoc: null,
      pageNum: 1,
      pageRendering: false,
      pageNumPending: null,
      scale: 0.5
    }
  },
  mounted() {
    this.getPdf()
  },
  methods: {
    getPdf() {
      getContractInfo({
        contractId: this.$route.query.contractId
      }).then(res => {
        const file = res.context.file
        if (file) {
          this.loadPdf(file)
        }
      })
    },
    loadPdf(file) {
      PDFJS.getDocument({
        data: window.atob(file),
        cMapUrl: CMAP_URL,
        cMapPacked: true
      }).promise.then(pdf => {
        this.pdfDoc = pdf
        this.numPages = this.pdfDoc.numPages
        this.$nextTick(() => {
          this.renderPage(1)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    renderPage(num) {
      const _this = this
      this.pdfDoc.getPage(num).then(function(page) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const dpr = window.devicePixelRatio || 1
        const bsr = ctx.webkitBackingStorePixelRatio ||
                    ctx.mozBackingStorePixelRatio ||
                    ctx.msBackingStorePixelRatio ||
                    ctx.oBackingStorePixelRatio ||
                    ctx.backingStorePixelRatio || 1
        const ratio = dpr / bsr
        var viewport = page.getViewport({ scale: ratio })
        canvas.width = viewport.width * 1
        canvas.height = viewport.height * 1
        canvas.style.width = viewport.width + 'px'
        canvas.style.height = viewport.height + 'px'
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        page.render(renderContext).promise.then(data => {
          const img = document.getElementById('the-img' + num)
          const srcData = canvas.toDataURL('image/jpeg')
          img.src = srcData
        })
        if (_this.numPages > num) {
          _this.renderPage(num + 1)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  #contract{
    height: calc(~'100% - 46px');
    padding: 16px;
    box-sizing: border-box;
    overflow: scroll;
    .pdf-item{
      width: 100%;
    }
  }
</style>
