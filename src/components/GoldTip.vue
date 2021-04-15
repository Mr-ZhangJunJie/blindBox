<template>
    <transition name="fade-transform" mode="out-in">
        <div v-if="goldContent.flag" :class="['toast',{'show':goldContent.flag},tipDirection]">
            <img src="../resource/imgs/ic_coin_toast2.png" alt="">
            <p><span class="count">{{userInfo.combo}}</span>连击</p>
            <p :class="{mt10:myApp.isAnd}"><span class="num">+{{goldContent.count}}</span>金币</p>
        </div>
    </transition>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'GoldTip',
        computed: {
            ...mapGetters([
                'goldContent','userInfo','tipDirection','myApp'
            ])
        },
        methods:{
            ...mapActions([
                'SetGold'
            ])
        },
        mounted(){
            // this.SetGold({flag:1,count:10})
            // setTimeout(()=>{
            //     this.SetGold({status:0,count:10})
            // },2500)
            // setTimeout(()=>{
            //     this.SetLike({status:true,count:10})
            // },6000)
        }
    }
</script>

<style lang='scss' scoped>
    .toast{
        width:240px;
        height: 120px;
        padding-top: 80px;
        background:rgba(255,255,255,0.92);
        box-shadow:0px 10px 20px 0px rgba(0,0,0,0.08);
        position: fixed;
        top:50%;
        opacity: 0;
        transform: translateY(-100%);
        z-index: 99;
        &.left{
            left: 0;
            border-radius:0px 40px 40px 0px;
            animation: .5s slideInLeft;
        }
        &.right{
            right: 0;
            border-radius:40px 0px 0px 40px;
            animation: .5s slideInRight;
        }
        img{
            width: 140px;
            height: 108px;
            position: absolute;
            left:66px;
            top: -46px;
        }
        p{
            font-size: 34px;
            font-weight: 600;
            color: #000;
            &.mt10{
                margin-top: 10px;
            }
            .count{
                font-size: 68px;
                line-height: 40px;
                vertical-align: text-top;
                color: #5c46ff;
            }
            .num{
                color: #5c46ff;
            }
        }
        button{
            width: 340px;
            height: 100px;
            background-color: #5c46ff;
            font-size: 30px;
            color: #fff;
            border-radius: 50px;
        }
    }

    .show{
        opacity: 1;
        transform: translateY(0);
    }

    @keyframes slideInLeft {
        0% {
            transform: translate3d(-100%,0,0);
            visibility: visible
        }

        to {
            transform: translateZ(0)
        }
    }

    @keyframes slideInRight {
        0% {
            transform: translate3d(100%,0,0);
            visibility: visible
        }

        to {
            transform: translateZ(0)
        }
    }

   </style>
