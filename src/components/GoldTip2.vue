<template>
    <transition name="fade-transform" mode="out-in">
        <div v-if="goldContent1.flag" :class="['toast',{'show':goldContent1.flag}]">
            <img src="../resource/imgs/ic_coin_toast.png" alt="">
            <!--<p>恭喜！获得{{goldContent.count}}个金币</p>-->
            <p>{{goldContent1.count}}</p>
            <!--<p>100</p>-->
        </div>
    </transition>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'GoldTip2',
        computed: {
            ...mapGetters([
                'goldContent1'
            ])
        },
        methods:{
            ...mapActions([
                'SetGold'
            ])
        },
        mounted(){
            this.SetGold1({flag:1,count:10})
            setTimeout(()=>{
                this.SetGold1({status:0,count:10})
            },2500)
        }
    }
</script>

<style lang='scss' scoped>
    .big-screen{
        .toast{
            top: 100px;
        }
    }
    .toast{
        width: 678px;
        height: 100px;
        box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.2);
        border-radius: 12px;
        left: 36px;
        position: fixed;
        top:36px;
        opacity: 0;
        transform: translateY(-100%);
        background-color: #fff;
        z-index: 99;
        display: flex;
        align-items: center;
        img{
            width: 48px;
            height: 48px;
            position: absolute;
            left:32px;
            top: 26px;
        }
        p{
            font-size: 28px;
            margin-left: 96px;
            text-align: left;
            color: #000000;
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
        animation: dance 1.3s;
        animation-delay: 500ms;
    }
    @keyframes dance{
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
