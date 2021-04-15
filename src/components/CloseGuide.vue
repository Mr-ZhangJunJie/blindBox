<template>
  <div class="main" v-if="closeGuideContent.flag">
    <div class="content">
      <img :src="imgSrc" class="image" alt="">
      <div class="guideMain">
        <h3>记得明天继续来抽卡</h3>
        <p>连续参与会累积欧气哦!</p>
      </div>
      <div class="btn-container">
        <button class="btn-leave" @click="closePage">离开</button>
        <button class="btn-receive" @click="closeDialog">留下逛逛</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {getBlobUrl} from '../utils/common'
  export default {
    name: 'CloseGuide',
    computed: {
      ...mapGetters([
        'closeGuideContent','myApp'
      ])
    },
    data(){
      return {
        imgSrc: require('../resource/imgs/guide.png')
      }
    },
    methods: {
      ...mapActions([
        'SetCloseGuide'
      ]),
      async preload(){
        this.imgSrc = await getBlobUrl(this.imgSrc)
      },
      closePage() {
        window.location.href = 'ZEPETO://WEBVIEW/CLOSE';
      },
      closeDialog() {
        _html({e: "lottery.ClosePop.Stay", bk: this.myApp.userId, duid: this.myApp.duid});
        this.SetCloseGuide({flag:0,coin:0})
      }
    }
  }
</script>

<style lang='scss' scoped>
  .main {
    position: fixed;
    display: flex;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, .7);
    z-index: 91;
  }

  .content {
    text-align: center;
    font-size: 0;
    width: 630px;
    background-color: #ffffff;
    border-radius: 40px;
    .image {
      width: 630px;
      height: 360px;
    }
    .guideMain{
      h3{
        font-size: 40px;
        font-weight: 600;
        color: #000000;
      }
      p{
        font-size: 30px;
        font-weight: 400;
        color: #000000;
        line-height: 42px;
        margin-top: 20px;
      }
    }
    .btn-container{
      background: #fff;
      border-radius: 0 0 40px 40px;
    }

    .btn {
      width: 360px;
      height: 100px;
      font-size: 30px;
      color: #fff;
      border-radius: 50px;
    }
    .btn-leave{
      @extend .btn;
      font-weight: 600;
      margin-top: 50px;
      background: #6332F8;
    }
    .btn-receive{
      @extend .btn;
      margin-top: 28px;
      margin-bottom: 60px;
      font-weight: bold;
      color: #000000;
      background: #f1f3f8;
    }
  }
</style>
