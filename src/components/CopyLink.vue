<template>
  <transition name="fade-transform" mode="out-in">
    <div class="request-loading-component" v-show="isShow">
      <div class="toast">
        <div class="header">邀请链接已复制</div>
        <p v-if="title !== ''">{{title}}</p>
        <div class="content" v-html="link"></div>
        <div class="btn-group">
          <button class="btn" @click="handleCancel">取消</button>
          <button class="btn" @click="$emit('goToChat')">去聊天</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'

  // let throttleFunc

  export default {
    name: 'CopyLink',
    props: {
      title: String,
      isShow: {
        type: Boolean,
        default: false
      },
      link: {
        type: String,
        default: ''
      }
    },
    computed:{
      ...mapGetters(['myApp'])
    },
    data() {
      return {
      }
    },
    methods: {
      ...mapActions(['SetToast','SetNetwork']),
      handleCancel() {
        this.$emit('close')
      }
    }
  }
</script>


<style lang='scss' scoped>
  .request-loading-component {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .toast {
    width: 550px;
    border-radius: 40px;
    background-color: #fff;
    text-align: center;
    padding: 70px 40px;
    .header{
      font-size: 40px;
      font-weight: 600;
      color: #000000;
      line-height: 40px;
    }
    p{
      font-size: 28px;
      font-weight: 500;
      margin-top: 36px;
      color: #686675;
    }
    .content {
      font-size: 28px;
      margin-bottom: 42px;
      color: #686675;
      line-height: 38px;
      /*margin-top: 36px;*/
      word-break: break-all;
    }
    .btn-group{
      width: 100%;
      display: flex;
    }

    .btn {
      width: 256px;
      height: 100px;
      border-radius: 50px;
      font-size: 30px;
      background: transparent;
      font-weight: bold;
      &:first-child{
        background: #f1f3f8;
        margin-right: 18px;
      }
      &:last-child{
        color: #fff;
        background: #6332F8;
      }
    }
  }
</style>
