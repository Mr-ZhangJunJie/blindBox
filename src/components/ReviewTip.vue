<template>
    <transition name="fade-transform" mode="out-in">
        <div v-show="reviewContent" :class="['toast',{'show':reviewContent}, tipDirection]">
            <img src="../resource/imgs/ic_no-coin_toast.png" alt="">
            <p>猜错了</p>
            <p><span class="num">+0 </span>金币</p>
        </div>
    </transition>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'ReviewTip',
        computed: {
            ...mapGetters([
                'reviewContent','tipDirection'
            ])
        },
        methods:{
            ...mapActions([
                'SetReview'
            ])
        },
        mounted(){
            // this.SetReview(1)
            // setTimeout(()=>{
            //     this.SetReview(0)
            // },3000)
        }
    }
</script>

<style lang='scss' scoped>
    .toast{
        width:240px;
        height: 114px;
        padding-top: 86px;
        background:rgba(255,255,255,0.92);
        box-shadow:0px 10px 20px 0px rgba(0,0,0,0.08);
        position: fixed;
        top:50% !important;
        opacity: 0;
        transform: translateY(-100%);
        z-index: 99;
        &.left{
            left: 0;
            border-radius:0px 40px 40px 0px;
            animation: slideInLeft .5s;
        }
        &.right{
            right: 0;
            border-radius:40px 0px 0px 40px;
            animation: slideInRight .5s;
        }
        img{
            width: 108px;
            height: 108px;
            position: absolute;
            left:66px;
            top: -46px;
        }
        p{
            font-size: 34px;
            line-height: 34px;
            font-weight: 600;
            color: #000;
            margin-bottom: 16px;
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
