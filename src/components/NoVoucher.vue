<template>
  <div class="main" v-if="voucherEndContent.type===1">
    <div class="content">
      <img :src="imgSrc" class="image" alt="">
      <p>做任务得 <span class="num">{{voucherEndContent.voucher}}</span> 张评审券</p>
      <p>最高可得 <span class="num">{{voucherEndContent.coin}}</span> 金币奖励</p>
      <div class="btn-container">
        <button class="btn" @click="doTask">做任务得券</button>
        <button class="btn" @click="toHome">结束评审</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {getBlobUrl} from '../utils/common'

  export default {
    name: 'NoVoucher',
    computed: {
      ...mapGetters([
        'voucherEndContent','myApp'
      ])
    },
    data(){
      return {
        imgSrc: require('../resource/imgs/img_NoTicket.png')
      }
    },
    methods: {
      ...mapActions([
        'SetVoucherEnd'
      ]),
      toHome(){
        // eslint-disable-next-line
        _html({
          e: "z_dresspk.popup", bk: this.myApp.userId, ver: this.myApp.version,
          duid: this.myApp.duid, args: {type:'not_enough',place:'finish_review'}
        })
        this.$router.push({name:'home'})
      },
      doTask() {
        this.SetVoucherEnd({type:0})
        // eslint-disable-next-line
        _html({
          e: "z_dresspk.popup", bk: this.myApp.userId, ver: this.myApp.version,
          duid: this.myApp.duid, args: {type:'not_enough',place:'do_quest'}
        })
        // eslint-disable-next-line
        _html({
          e: "z_dresspk.coupon", bk: this.myApp.userId, ver: this.myApp.version,
          duid: this.myApp.duid, args: {place:'review'}
        })
        this.$emit('handle')
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
    background: rgba(0, 0, 0, .7);
    z-index: 91;
  }

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,calc( -50% + 204px ));
    width: 540px;
    text-align: center;
    font-size: 0;
    background: #fff;
    border-radius: 0 0 40px 40px;
    >p{
      font-size: 28px;
      font-weight: 400;
      line-height: 28px;
      padding-top: 14px;
      .num{
        font-size: 28px;
        color: #5c46ff;
      }
    }
    .image {
      position: absolute;
      top: -404px;
      left: 0;
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
      &:first-child{
        margin-top: 40px;
        color: #fff;
        background: #5C46FF;
      }
      &:last-child{
        margin-top: 28px;
        color: #323232;
        background: #f0eff3;
      }
    }
  }
</style>
