<template>
    <div class="main" v-show="isShow">
      <transition name="bounce">
        <div class="content" v-show="isShowContent">
            <div class="content-header">
              <p>做任务得评审券</p>
              <div class="close" @click="hideDialog">
                <img src="../resource/imgs/ex_popup.png" alt="">
              </div>
            </div>
            <div class="review-container" style="display: none;">
              <div class="review-text">连续参与评审
                <br>每天得金币</div>
              <div class="progress-container">
                <div class="progress-outer">
                  <div class="progress-inner" :style="{width: '33%'}"></div>
                </div>
                <div class="reward-container">
                  <div class="reward-item" v-for="(status,index) in coinStatus" :style="{left: (index+1)*30+'%'}"
                       @click="rewardClick(index)" :key="index">
                    <div class="tag-text">{{getTagText(status,index)}}</div>
                    <div :class="['coin-icon',{pointer:status===1||status===2}]"></div>
                    <div class="coin-num">{{(index+1)*100}}</div>
                  </div>
                </div>
              </div>
            </div>

          <div class="proBox" v-if="isShowCoinBox">
              <ul class="proLeft">
                <li class="proText">连续参与评审<br>每天得金币</li>
                <li class="pro">
                  <div class="proInner" :style="{width:`${step*33.333}%`}"></div>
                  <span>{{step}}/3</span>
                </li>
              </ul>
              <ul class="proRight">
                <li :class="['stepBox',classNames[index]]"
                    v-for="(status,index) in coinStatus" :key="index" @click="receiveCoin(status,index)">
                  <p class="likeNum">{{getTagText(status,index)}}</p>
                  <img :class="['coinIcon',`day${index+1}`]" :src="icons[index]" alt="">
                  <div class="val">{{(index+1)*100}}</div>
                </li>
              </ul>
            </div>
          <div class="card-container">
              <div class="card-item" v-for="(card,index) in list" :key="index">
                <div class="card-left">
                  <img src="../resource/imgs/ic_ticket.png" alt="">
                  <div class="ticket-count">{{card.count}}</div>
                </div>
                <div class="card-content">
                  <h4 class="card-title">{{card.title}}</h4>
                  <p class="card-subtitle">{{card.subTitle}}</p>
                </div>
                <!-- <div class="card-right">
                  <a href="javascript:;" @click="btnClick(index)" :class="['btn',{clipboard:!index,active:card.status!==1}]"
                     :data-clipboard-text="invitationLink">{{card.status===2?card.btnText:'已完成'}}</a>
                </div> -->
                <div class="card-right" v-if="card.prop === 'vlogStatus'">
                  <a href="javascript:;" @click="btnClick(index)" :class="['btn',{clipboard:!index,active:card.status!==1}]">{{card.status===2?card.btnText:'已完成'}}</a >
                </div>
                <div class="card-right" v-if="card.prop !== 'vlogStatus'">
                  <a href="javascript:;" @click="btnClick(index)" :class="['btn',{clipboard:!index,active:card.status!==1}]"
                     :data-clipboard-text="invitationLink">{{card.status===2?card.btnText:'已完成'}}</a >
                </div>
              </div>
            </div>
          <span :class="['desc',{'x-screen':bigScreen},{'big-bottom':!isShowCoinBox}]">完成任务获得的奖励，当⽇有效，请及时领取使⽤</span>
        </div>
      </transition>
      <CopyLink :isShow="isShowCopyLink" :link="invitationLink" @close="isShowCopyLink=false" @goToChat="goToChat"/>
    </div>

</template>

<script>
  import { throttle } from 'throttle-debounce'
  import ClipboardJS from 'clipboard'
  import {mapGetters,mapActions} from 'vuex'
  import CopyLink from './CopyLink'
  import userApi from '@/api/user'
  import appApi from '@/api/api'

  //状态
  const statusObj = {
    willStart: -1,
    willComplete: 0,
    willReceive: 2,
    received: 1
  }
  let throttleFunc;
  let throttleFunc1;
  export default {
    name: 'CouponDialog',
    props:{
      isShow:{
        type: Boolean,
        default: false
      },
      isShowCoinBox:{
        type: Boolean,
        default: true
      }
    },
    components:{
      CopyLink
    },
    mounted(){
      this.$nextTick(()=>{
        let clipboard = new ClipboardJS('.clipboard');
        clipboard.on('success', e=> {
          e.clearSelection();
        });

        clipboard.on('error', e=> {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
        });
      })
    },
    data() {
      return {
        list: [
          {
           title: '玩拍同款Get爆款视频',
           subTitle: '保存视频可得5张评审券',
           btnText: '去拍摄',
           prop: 'vlogStatus',
           count: 5,
           status: 2,
           handle() {
             this.postVlog()
           }
         },
          {
            title: '邀请朋友⼀起玩穿搭赛',
            subTitle: '朋友上线，可得5张评审券',
            btnText: '去邀请',
            prop: 'invitedStatus',
            count: 5,
            status: 2,
            handle() {
              this.isShowCopyLink = true
            }
          },
          {
            title: '在⼈⽓榜新关注3名⽤户',
            subTitle: '完成可得3张评审券',
            btnText: '去关注',
            prop: 'followStatus',
            count: 3,
            status: 2,
            handle() {
              this.hideDialog()
              this.$router.push({name:'popular'})
            }
          },
          {
            title: '在⼈⽓榜尝试1次试穿',
            subTitle: '完成可得2张评审券',
            btnText: '去试穿',
            prop: 'tryOnStatus',
            count: 2,
            status: 2,
            handle() {
              this.hideDialog()
              this.$router.push({name:'popular'})
            }
          },
          {
            title: '今⽇评审命中6次',
            subTitle: '完成可得3张评审券',
            btnText: '去评审',
            prop: 'comboStatus',
            count: 3,
            status: 2,
            handle() {
              if (this.userInfo.likeTimes) {
                  console.log('push review')
                this.$router.push({name:'review'})
                this.hideDialog()
              }else {
                this.SetToast({flag: 1, text: '评审券不足'})
                this.hideDialog()
                setTimeout(() => {
                  this.SetToast({flag: 0})
                }, 1800)
              }
            }
          },
          {
            title: '报名参赛本期穿搭赛',
            subTitle: '完成可得5张评审券',
            btnText: '去报名',
            prop: 'signStatus',
            count: 5,
            handle() {
              this.$router.push({name:'upload'})
            }
          }
        ],
        coinStatus:[statusObj.willComplete,statusObj.willStart,statusObj.willStart],
        invitationLink: 'ZEPETO-CN://HOME/WEBVIEW?url=https://lnk0.com/easylink/ELgEpoE9',
        questInfo: {},
        texts: [],
        icons:[
            require('../resource/imgs/ic_1coin.png'),
            require('../resource/imgs/ic_2coins.png'),
            require('../resource/imgs/ic_3coins.png')
        ],
        step: 0,//当前任务第几天
        isShowContent: false,
        isShowCopyLink: false
      }
    },
    computed: {
      ...mapGetters(['myApp','userInfo','bigScreen']),
      classNames() {
        const arr = []
        this.coinStatus.forEach((status) => {
          arr.push(this.getClassName(status))
        })
        return arr
      }
    },
    methods: {
      ...mapActions(['SetToast','SetNetwork','SetSign','SetInfo']),

      /**
       * 初始化
       */
      async init(){
        this.getData()
      },

      /**
       * 获取任务数据
       * @returns {Promise<void>}
       */
      async getData(){
        const {code,result} = await userApi.getQuestInfo(this.myApp.zzId)
        if (code === 200) {
          const {coinStatus,...questInfo} = result
          this.step = coinStatus.length
          // 改成方便前端渲染的格式
          switch (coinStatus.length) {
            case 0:
              coinStatus.push(statusObj.willComplete,statusObj.willStart,statusObj.willStart)
              break;
            case 1:
              coinStatus.push(statusObj.willStart,statusObj.willStart)
              break;
            case 2:
              coinStatus.push(statusObj.willStart)
              break;
          }
          coinStatus.forEach((status,index)=>{
            this.$set(this.texts,index,this.getTagText(status,index))
          })
          this.coinStatus = coinStatus
          this.questInfo = questInfo;

          this.list.forEach(x=>{
            // 任务状态放到list中
            x.status = questInfo[x.prop]
          })
        }
      },

      /**
       * 关闭任务弹窗
       */
      hideDialog(){
        this.isShowContent = false
        // setTimeout(()=>{
          this.$emit('close')
        // },600)
      },

      /**
       * 领取金币
       * @param status 状态
       * @param index 索引
       */
      receiveCoin(status, index){
        if (status === statusObj.willReceive) {

          const day = index + 1
          // 防止短时间多次点击
          if (throttleFunc) {
            throttleFunc()
          } else {
            throttleFunc = throttle(500, false, () => {
              // eslint-disable-next-line
              _html({
                e: "z_dresspk.reward.receive", bk: this.myApp.userId, ver: this.myApp.version,
                duid: this.myApp.duid, args: {type: 'reward' + day}
              });

              appApi.goRewardForVoucher({
                zzid: this.myApp.zzId,
                coin: day * 100,
                day,
                token: this.myApp.authToken,
                duid: this.myApp.duid
              }).then(res => {
                if (res.code === 200) {
                  this.SetSign({flag:1,txt:'奖励领取成功！'});
                  this.$set(this.coinStatus, index, statusObj.received)
                  throttleFunc = null
                  setTimeout(() => {
                    this.SetSign({flag: 0,txt:''})
                  }, 1800)
                } else {
                  return Promise.reject()
                }
              }).catch(() => {
                this.SetNetwork({flag: 1, message: '领取失败，请检查网络'})
                setTimeout(() => {
                  this.SetNetwork({flag: 0})
                }, 1800)
              })
            }, true)
            throttleFunc()
          }
        }
      },

      /**
       * 第x天评审点击
       * @param index 索引
       */
      rewardClick(index){
        const status = this.coinStatus[index]
        if(status===statusObj.willComplete){
          this.$router.push({name:'review'})
        }

      },

      /**
       * 获取标签文案
       * @param status 状态
       * @param index 索引
       */
      getTagText(status,index){
        let text = ''
        if (status === statusObj.willStart && index) {
          text = `第${index+1}天`
        }else{
          const arr = ['待完成','已领取','领取奖励']
          text = arr[status]
        }
        return text
      },

      /**
       * 获取标类名
       * @param status 状态
       * @param index 索引
       */
      getClassName(status){
        return ['','canNotGet','canGet'][status] || ''
      },

      /**
       * 按钮点击
       * @param index 索引
       */
      btnClick(index){
        const arr = ['vlog', 'invite_now', 'follow_now', 'tryon_now', 'review_now', 'signup_now']
        // eslint-disable-next-line
        _html({
          e: "z_dresspk.coupon.action", bk: this.myApp.userId, ver: this.myApp.version,
          duid: this.myApp.duid, args: {place:arr[index]}
        })
        const item = this.list[index]
        item.status===2 && item.handle.call(this,index)
      },

      // 按钮去拍摄vlog
      postVlog() {
        appApi.postVlog({
          zzid: this.myApp.zzId
        }).then(res => {
          if (res.code === 200) {
            window.location.href = 'zepeto-cn://zaizai?tagName=hot'
          } else {
            return Promise.reject()
          }
        }).catch(() => {
          this.SetNetwork({flag: 1, message: '领取失败，请检查网络'})
          setTimeout(() => {
            this.SetNetwork({flag: 0})
          }, 1800)
        })
      },

      goToChat() {
          if (throttleFunc1) {
              throttleFunc1()
          } else {
              // eslint-disable-next-line
              _html({
                  e: "z_dresspk.mission.finish", bk: this.myApp.userId, ver: this.myApp.version,
                  duid: this.myApp.duid, args: {place:'invite_now'}
              });
              throttleFunc1 = throttle(1000, false, () => {
                  this.$copyText(this.invitationLink).catch(() => {
                      this.SetNetwork({flag: 1, message: '复制失败'});
                      setTimeout(()=>{
                          this.SetNetwork({flag: 0, message: ''})
                      },1800)
                      return;
                  })

                  const params = {zzid: this.myApp.zzId};
                  appApi.invited(params).then(({code, message}) => {
                      if (code === 200) {
                          this.SetToast({flag: 1, text: '任务完成，评审券+5'})
                          setTimeout(() => {
                              this.SetToast({flag: 0})
                              this.isShowCopyLink = false;
                              // 跳转到关注好友的聊天列表
                              window.location.href = "ZEPETO://HOME/CHAT"
                          }, 800)
                      } else {
                          return Promise.reject(message)
                      }
                  }).catch(err => {
                      this.SetNetwork({flag: 1, message: '请求失败，请检查网络'});
                      setTimeout(()=>{
                          this.SetNetwork({flag: 0, message: ''})
                      },1800)
                  })
              }, true)
              throttleFunc1()
          }
      },
    },
    watch:{
      isShow(val){
        // 弹窗显示后，重新获取任务数据
        if (val) {
          this.isShowContent = val
          this.getData()
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  .bounce-enter-active{
    animation: static-animate .5s;
    .content{
      animation: bounce-up .5s;
    }
  }
  .bounce-leave-active{
    animation: static-animate .5s reverse;
    .content{
      animation: bounce-up .5s reverse;
    }
  }
  @keyframes static-animate {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes bounce-up {
    from {
      left: 0;
    }
    to {
      left: 0;
    }
  }
  .main {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 93;
    font-size: 26px;
  }

  .content {
    width: 100vw;
    position: absolute;
    bottom: 0;
    background: #fff;
    border-radius: 30px 30px 0px 0px;
    .content-header{
      position: relative;
      height: 112px;
      text-align: center;
      background: #fff;
      border-radius: 30px 30px 0px 0px;
      font-size: 30px;
      font-weight: 600;
      color: #000000;
      line-height: 30px;
      >p{
        height: 100%;
        line-height: 114px;
      }
      .close{
        position: absolute;
        top: 18px;
        right: 16px;
        padding: 20px;
        img{
          width: 36px;
        }
      }
    }
    .desc{
      display: inline-block;
      margin-bottom: 40px;
      width: 100%;
      height: 80px;
      line-height: 80px;
      background: #fff;
      font-size: 22px;
      font-weight: 400;
      color: #8d8c98;
      text-align: left;
      padding-left: 52px;
      &.x-screen{
        margin-bottom: 100px;
      }
      &.big-bottom{
        margin-bottom: 330px;
      }
      &::before{
        content: '';
        display: inline-block;
        width: 22px;
        height: 22px;
        margin-right: 6px;
        transform: translateY(3px);
        background: url(../resource/imgs/ic_attention.png);
        background-size: contain;
      }
    }
  }
  .reward-container{
    position: absolute;
    top: -30px;
    width: 100%;
    height: 100px;
    .reward-item{
      position: absolute;
    }
    .coin-icon{
      position: relative;
      width: 50px;
      height: 50px;
      background: url(../resource/imgs/ic_coin_toast.png);
      background-size: cover;
      &.pointer{
        &::after{
          position: absolute;
          width: 50px;
          height: 50px;
          background: url(../resource/imgs/ic_coin_toast.png);
          background-size: cover;
        }
      }
    }
  }

  .card-container{
    background: #fff;
    .card-item{
      display: flex;
      width: 100%;
      height: 140px;
      align-items: center;
    }
    .card-left{
      position: relative;
      width: 180px;
      >img{
        width: 80px;
      }
      .ticket-count{
        position: absolute;
        bottom: 4px;
        right: 34px;
        width: 32px;
        height: 32px;
        line-height: 35px;
        border-radius: 32px;
        background: #5c46ff;
        border: 4px solid #fff;
        font-size: 24px;
        font-weight: bold;
        color: #fff;
        text-align: center;
      }
    }
    .card-content{
      text-align: left;
      flex: 1;
    }
    .card-title{
      font-size: 28px;
      font-weight: 600;
      color: #323232;
      line-height: 28px;
    }
    .card-subtitle{
      font-size: 24px;
      font-weight: 400;
      color: #A7A7B3;
      line-height: 24px;
      margin-top: 12px;
    }
    .card-right{
      width: 200px;
      .btn{
        display: inline-block;
        width: 160px;
        height: 60px;
        line-height: 65px;
        border-radius: 38px;
        font-weight: 600;
        color: #ccccd3;
        background: #fff;
        border-radius: 38px;
        border: 2px solid #e6e6e9;
        &.active{
          color: #fff;
          background: #5c46ff;
          border-color: #5c46ff;
        }
      }
    }
  }

  .proBox {
    width: 100%;
    height: 276px;
    background-color: #33ccff;
    display: flex;
    box-sizing: border-box;
    padding: 40px 25px;
    .proLeft {
      width: 222px;
      .proText {
        font-size: 28px;
        color: #fff;
        font-weight: bold;
        text-align: left;
      }
      .pro {
        height: 28px;
        border-radius: 14px;
        background-color: rgba(0, 0, 0, 0.1);
        margin-top: 74px;
        position: relative;
        .proInner {
          height: 100%;
          width: 0;
          border-radius: 14px;
          background-color: #5c46ff;
        }
        span {
          font-size: 22px;
          color: #fff;
          position: absolute;
          transform: translateX(-50%);
          top: 0;
          font-weight: 600;
        }
      }
    }
    .proRight {
      margin-left: 25px;
      flex-grow: 1;
      display: flex;
      justify-content: space-around;
      .stepBox {
        width: 140px;
        height: 196px;
        background-color: #fff;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        .likeNum {
          font-size: 18px;
          font-weight: 600;
          font-weight: 600;
          color: #323232;
          img {
            width: 20px;
            vertical-align: -4px;
            margin-left: 4px;
          }
        }
        .coinIcon {
          display: block;
          width: 102px;
        }
        .val {
          font-size: 28px;
          font-weight: 600;
          color: #323232;
        }
      }
      .canGet {
        background-color: #5c46ff;
        .likeNum {
          color: #fff;
        }
        .val {
          color: #fff;
        }
      }
      .canNotGet {
        background-color: rgba(255, 255, 255, .65);
        .likeNum {
          color: rgba(50, 50, 50, .65);
        }
        .val {
          color: #323232;
        }
      }
    }
  }
</style>
