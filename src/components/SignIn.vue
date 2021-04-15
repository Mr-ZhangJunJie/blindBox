<template>
  <div id="main">
    <div class="center">
      <h2>连续3天打卡奖励<b></b><span>第{{prizeStatus.days}}天</span></h2>
      <!--receive-->
      <ul :class="['punchCard',`day${prizeStatus.days}`,{'receive':prizeStatus.isSignIn===1}]">
      <!--<ul :class="['punchCard','day2','receive']">-->
        <li class="line">
          <div class="lineInner"></div>
          <ul class="prize prize1">
            <li class="time">1天</li>
            <li class="done"></li>
            <li class="coins">
              <img src="../resource/imgs/ic_coin.png" alt="" />
              <span>100</span>
            </li>
          </ul>
          <!--active-->
          <ul class="prize prize2">
            <li class="time">2天</li>
            <li class="done"></li>
            <li class="coins">
              <img src="../resource/imgs/ic_coin.png" alt="" />
              <span>200</span>
            </li>
          </ul>
          <ul class="prize prize3">
            <li class="time">3天</li>
            <li class="done"></li>
            <li class="coins">
              <img src="../resource/imgs/ic_coin.png" alt="" />
              <span>300</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="prizeBtn" v-if="prizeStatus.isSignIn !== 1" @click="getPrize">
          <img src="../resource/imgs/ic_coin.png" alt=""><span>打卡得金币</span>
      </div>
      <div v-else :class="['prizeBtn',{'yet':prizeStatus.isSignIn===1}]">今日已打卡</div>
    </div>
  </div>
</template>

<script>
  import userApi from '@/api/user'
  import {mapGetters,mapActions} from "vuex"

export default {
  name: "SignIn",
  data(){
    return {
        step:0,
        prizeStatus:{
            days: 0,
            isSignIn: 1
        }
    }
  },
  mounted(){
      this.getData();
  },
  methods:{
      ...mapActions(['SetNetwork','SetGold1']),
      /**
       * 获取任务数据
       * @returns {Promise<void>}
       */
      async getData() {
          try{
              const { code, result } = await userApi.getQuestInfo(this.myApp.zzId);
              if (code === 200) {
                  const { coinStatus, isSignIn } = result;
                  if(isSignIn === 1){
                      this.prizeStatus.days = coinStatus.length;
                      this.prizeStatus.isSignIn = isSignIn;
                  }else{
                      this.prizeStatus.days = coinStatus.length+1;
                      this.prizeStatus.isSignIn = isSignIn;
                  }
              }else{
                 throw Error('获取打卡记录失败')
              }
          }catch (e) {
              this.SetNetwork({flag: 1, message: '获取打卡记录失败'});
              setTimeout(()=>{
                  this.SetNetwork({flag: 0, message: ''})
              },1800)
          }
      },
      async getPrize(){
         try{

             let ret = await userApi.toSignIn({zzId:this.myApp.zzId,token:this.myApp.authToken,duid:this.myApp.duid});
             if(ret.code === 200){
                 this.prizeStatus.isSignIn = 1;
                 _html({
                     e: "z_dresspk.coupon.signin",
                     bk: this.myApp.userId,
                     duid: this.myApp.duid,
                     args:{day:this.prizeStatus.days}
                 });
                 this.SetGold1({flag:1,count:`打卡成功！获得${this.prizeStatus.days * 100}金币`});
                 setTimeout(()=>{
                     this.SetGold1({flag:0,count:0})
                 },1800)
             }else{
                 throw Error('打卡失败')
             }
         }catch (e) {
             this.SetNetwork({flag: 1, message: '打卡失败'});
             setTimeout(()=>{
                 this.SetNetwork({flag: 0, message: ''})
             },1800)
         }

      }
  },
  computed:{
      ...mapGetters(["myApp"]),
  }
};
</script>

<style scoped lang="scss">
#main {
  height: 438px;
  background: #f9f8f9;
  overflow: hidden;
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 56px;
  }
  h2 {
    height: 40px;
    font-size: 40px;
    font-weight: 600;
    color: #000000;
    line-height: 40px;
    b {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: #000000;
      border-radius: 50%;
      vertical-align: 0.2em;
      margin: 0 8px;
    }
    span {
      font-size: 40px;
      color: #6332f8;
    }
  }
  .punchCard {
    .line {
      width: 580px;
      height: 14px;
      background: #dcdce1;
      border-radius: 7px;
      position: relative;
      margin-top: 90px;
      .lineInner {
        height: 100%;
        border-radius: 7px;
        position: absolute;
        background: #6332f8;
      }
      .prize {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #dcdce1;
        border: 5px solid #f9f8f9;
        position: absolute;
        display: flex;
        justify-content: center;
        .time {
          font-size: 26px;
          font-weight: 600;
          color: #323232;
          position: absolute;
          width: 50px;
          top: -48px;
        }
        .done {
          position: absolute;
          width: 40px;
          height: 26px;
          background: url("../resource/imgs/ic_done.png") no-repeat;
          background-size: 100% auto;
          top: -42px;
          display: none;
        }
        .coins {
          width: 94px;
          height: 38px;
          display: flex;
          align-items: center;
          position: absolute;
          top: 34px;
          img {
            width: 36px;
            height: 36px;
          }
          span {
            font-size: 32px;
            font-weight: bold;
            color: #ff9800;
            margin-left: 4px;
          }
        }
      }
      .prize1 {
        top: -5px;
        left: -5px;
      }
      .prize2 {
        top: -5px;
        left: 273px;
      }
      .prize3 {
        top: -5px;
        right: -5px;
        &.active {
          top: 0;
          right: 0;
          border: none;
          background: #6332f8;
        }
      }
    }

    &.day1 {
      .line {
        .lineInner {
          width: 0;
        }
        .prize1 {
          top: 0;
          left: 0;
          border: none;
          background: #6332f8;
          .done {
            display: none;
          }
        }
      }
      &.receive {
        .line {
          .prize1 {
            .done {
              display: block;
            }
            .time {
              display: none;
            }
          }
        }
      }
    }
    &.day2 {
      .line {
        .lineInner {
          width: 50%;
        }
        .prize1 {
          top: 0;
          left: 0;
          border: none;
          background: #6332f8;
          .done {
            display: block;
          }
          .time {
            display: none;
          }
        }
        .prize2 {
          background: #6332f8;
        }
      }
      &.receive {
        .prize2 {
          background: #6332f8;
          .done {
            display: block;
          }
          .time {
            display: none;
          }
        }
      }
    }

    &.day3 {
      .line {
        .lineInner {
          width: 100%;
        }
        .prize1 {
          top: 0;
          left: 0;
          border: none;
          background: #6332f8;
          .done {
            display: block;
          }
          .time {
            display: none;
          }
        }
        .prize2 {
          background: #6332f8;
          .done {
            display: block;
          }
          .time {
            display: none;
          }
        }
        .prize3 {
          background: #6332f8;
        }
      }
      &.receive {
        .prize3 {
          background: #6332f8;
          .done {
            display: block;
          }
          .time {
            display: none;
          }
        }
      }
    }
  }
  .prizeBtn {
    width: 320px;
    height: 88px;
    background: #6332f8;
    border-radius: 44px;
    margin-top: 106px;
    font-size: 30px;
    font-weight: 600;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 36px;
      height: 36px;
      margin-right: 12px;
    }
  }
  .yet {
    opacity: 0.24;
  }
}
</style>
