<template>
  <div id="show">
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
    <div id="contract">
      <div v-for="page in numPages2" :key="page" style="display: block;width: 100%;">
        <img :id="'the-img2'+page" class="pdf-item" src="">
      </div>
    </div>
    <div class="next" @click="next">下一步</div>
  </div>
</template>

<script>
import { NavBar, Button } from 'vant'
import { showDecisionContract } from '@/api/disburse'
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
      numPages2: '',
      pdfDoc2: null,
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
      showDecisionContract({
        // contractId: this.$route.query.contractId
      }).then(res => {
        const file = res.context.applyCont
        const file2 = res.context.decisionCont
        if (file) {
          this.loadPdf(file)
        }
        if (file2) {
          this.loadPdf2(file2)
        }
      })
    },
    next() {
      this.$router.push({ path: './Home', query: { check: 'checked' }})
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
    loadPdf2(file) {
      PDFJS.getDocument({
        data: window.atob(file),
        cMapUrl: CMAP_URL,
        cMapPacked: true
      }).promise.then(pdf => {
        this.pdfDoc2 = pdf
        this.numPages2 = this.pdfDoc2.numPages
        this.$nextTick(() => {
          this.renderPage2(1)
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
    },
    renderPage2(num) {
      const _this = this
      this.pdfDoc2.getPage(num).then(function(page) {
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
          const img = document.getElementById('the-img2' + num)
          const srcData = canvas.toDataURL('image/jpeg')
          img.src = srcData
        })
        if (_this.numPages2 > num) {
          _this.renderPage2(num + 1)
        }
      })
    }
  }
}
</script>

<style lang="less">
// #show .van-nav-bar {
//   position: fixed;
//   top: 0;
// }
</style>

<style scoped lang="less">
#show {
  padding-bottom: 51px;
}
  #contract{
    height: calc(~'100% - 46px');
    padding: 16px;
    box-sizing: border-box;
    overflow: scroll;
    .pdf-item{
      width: 100%;
    }
  }
  .next {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 51px;
    background: #FFD630;
    text-align: center;
    font-size: 16px;
    line-height: 51px;
  }
</style>
