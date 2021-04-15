<template>
  <transition name="fade-transform" mode="out-in">
    <div
      v-if="signContent.flag"
      :class="['toast', { show: signContent.flag }]"
    >
      <img src="../resource/imgs/ic_toast_complete.png" alt="" />
      <p>{{ signContent.txt }}</p>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SignUp",
  computed: {
    ...mapGetters(["signContent"])
  },
  methods: {
    ...mapActions(["SetSign"])
  },
  mounted() {
    // this.SetSign({flag:1,txt:'你已成功参加比赛'})
    // setTimeout(()=>{
    //     this.SetNetwork({flag:0,message:''})
    // },2500)
    // setTimeout(()=>{
    //     this.SetNetwork({flag:true,message: '网络不可用，请检查网络配置'})
    // },6000)
  }
};
</script>

<style lang="scss" scoped>
.big-screen{
  .toast{
    top: 100px;
  }
}
.toast {
  width: 678px;
  height: 100px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  position: fixed;
  top:36px;
  left: 36px;
  opacity: 0;
  background-color: #fff;
  transform: translateY(-100%);
  z-index: 999;
  text-align: left;
  display: flex;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
    position: absolute;
    left: 32px;
    top: 32px;
  }
  p {
    font-size: 28px;
    margin-left: 96px;
    text-align: left;
    color: #000000;
  }
  /*button {*/
    /*width: 340px;*/
    /*height: 100px;*/
    /*background-color: #5c46ff;*/
    /*font-size: 30px;*/
    /*color: #fff;*/
    /*border-radius: 50px;*/
  /*}*/
}

.show {
  animation: dance 1.3s;
  animation-delay: 500ms;
}

@keyframes dance {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  20% {
    opacity: 1;
    transform: translateY(0);
  }
  80% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
}
</style>
