<template>
  <div class="main" v-if="signInContent.flag">
    <div class="content">
      <header>
        <img :src="imgSrc" alt="" class="image">
      </header>
      <div class="guideMain">
        <h3>今日还未打卡</h3>
        <p>完成打卡, 即得<span>{{signInContent.coin}}</span>金币</p>
      </div>
      <div class="btn-container">
        <button class="btn-receive" @click="$emit('closeDialog')">去打卡</button>
        <button class="btn-leave" @click="closePage">放弃退出</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {getBlobUrl} from '../utils/common'
  export default {
    name: 'SignInGuide',
    computed: {
      ...mapGetters([
        'signInContent'
      ])
    },
    data(){
      return {
        imgSrc: require('../resource/imgs/ic_to_task.png')
      }
    },
    mounted(){
      console.log('signInContent',this.signInContent)
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
      // closeDialog() {
      //   this.SetCloseGuide(0);
      // }
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
    padding-bottom: 60px;
    header{
      height: 271px;
      .image {
        width: 240px;
        margin-top: 78px;
      }
    }

    .guideMain{
      h3{
        font-size: 40px;
        font-weight: 600;
        color: #000000;
        span{
          font-size: 40px;
          font-weight: bold;
          color: #F323FF;
        }
      }
      p{
        font-size: 30px;
        font-weight: 400;
        color: #000000;
        line-height: 42px;
        margin-top: 20px;
        span{
          font-size: 32px;
          font-weight: bold;
          color: #F323FF;
        }
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
      border-radius: 50px;
      font-weight: 600;
    }
    .btn-leave{
      @extend .btn;
      font-weight: 600;
      color: #000000;
    }
    .btn-receive{
      @extend .btn;
      margin-top: 50px;
      margin-bottom: 28px;
      font-weight: 400;
      color: #ffffff;
      background: #6332F8;
    }
  }
</style>
