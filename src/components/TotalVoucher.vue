<template>
  <div class="coupon-container">
    <div class="coupon-box" @click="handleClick">
      <img src="../resource/imgs/ic_ticket_40.png" class="coupon-icon" alt="">
      <span class="coupon-count">{{count}}</span>
      <a href="javascript:;" class="btn-add"></a>
      <a href="javascript:;" class="voucher-text" v-if="!count && text">{{text}}</a>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'TotalVoucher',
    props: {
      count: {
        type: Number,
        default: 0
      },
      text: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapGetters(['myApp'])
    },
    methods: {
      handleClick() {
        // eslint-disable-next-line
        _html({
          e: "z_dresspk.coupon", bk: this.myApp.userId, ver: this.myApp.version,
          duid: this.myApp.duid, args: {place:'review_add'}
        })
        this.$emit('handle')
      }
    }
  }
</script>

<style lang='scss' scoped>
  .coupon-container {
    background: #fff;
    /*border-top: 1px solid #fff;*/

    .coupon-box {
      position: relative;
      display: flex;
      /*margin: 20px 28px 20px 0;*/
      width: 200px;
      height: 56px;
      border-radius: 30px;
      border: 2px solid rgba(0, 0, 0, 0.06);
      align-items: center;
      box-sizing: border-box;
      padding:0 8px 0 14px
    }

    .coupon-icon {
      width: 40px;
      height: 40px;
    }

    .coupon-count {
      flex: 1;
      text-align: center;
      font-size: 30px;
      font-family: HelveticaNeue-Bold, HelveticaNeue;
      font-weight: bold;
      color: #000;
      line-height: 37px;
    }

    .btn-add {
      display: inline-block;
      width: 40px;
      height: 40px;
      background: url(../resource/imgs/ic_add_42.png);
      background-size: cover;
    }

    .voucher-text {
      position: absolute;
      top: 18px;
      right: 0;
      transform: translateX(110%);
      display: inline-block;
      font-size: 20px;
      font-weight: 500;
      color: #f323ff;
      line-height: 20px;
    }
  }
</style>
