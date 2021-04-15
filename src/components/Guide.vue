<template>
  <div class="main" v-if="guideContent">
    <div class="content">
      <img :src="imgSrc" class="image" alt="">
      <div class="btn-container">
        <button class="btn" @click="closeDialog">我知道了</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {getBlobUrl} from '../utils/common'

  export default {
    name: 'Guide',
    computed: {
      ...mapGetters([
        'guideContent'
      ])
    },
    data(){
      return {
        imgSrc: require('../resource/imgs/guide.png')
      }
    },
    methods: {
      ...mapActions([
        'SetGuide'
      ]),
      async preload(){
        this.imgSrc = await getBlobUrl(this.imgSrc)
      },
      closeDialog() {
        this.SetGuide(0)
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
    .image {
      width: 540px;
      transform: translateY(4px);
    }
    .btn-container{
      background: #fff;
      border-radius: 0 0 40px 40px;
    }

    .btn {
      margin-top: 50px;
      margin-bottom: 60px;
      width: 360px;
      height: 100px;
      font-size: 30px;
      font-weight: 600;
      color: #fff;
      background: #5C46FF;
      border-radius: 50px;
    }
  }
</style>
