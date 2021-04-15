<template>
  <div class="main" v-if="voucherEndContent.type===2">
    <div class="content">
      <img :src="imgSrc" class="image" alt="">
      <div class="btn-container">
        <button class="btn" @click="toHome">结束评审</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getBlobUrl} from '../utils/common'

  export default {
    name: 'VoucherEnd',
    computed: {
      ...mapGetters([
        'voucherEndContent','myApp'
      ])
    },
    data(){
      return {
        imgSrc: require('../resource/imgs/img_finish.png')
      }
    },
    methods: {
      toHome(){
        // eslint-disable-next-line
        _html({
          e: "z_dresspk.popup", bk: this.myApp.userId, ver: this.myApp.version,
          duid: this.myApp.duid, args: {type:'finish_review'}
        })
        this.$router.push({name:'home'})
      },
      async preload(){
        const imgSrc = this.imgSrc
        if (!imgSrc.startsWith('blob')) {
          console.log(1);
          this.imgSrc = await getBlobUrl(imgSrc)
        }
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
    width: 540px;
    text-align: center;
    font-size: 0;
    background: #fff;
    border-radius: 40px;
    .image {
      width: 540px;
    }
    .btn-container{
      padding-bottom: 60px;
    }

    .btn {
      width: 360px;
      height: 100px;
      font-size: 30px;
      font-weight: 600;
      border-radius: 50px;
      margin-top: 40px;
      color: #fff;
      background: #5C46FF;
    }
  }
</style>
