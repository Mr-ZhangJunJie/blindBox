<template>
    <transition name="fade-transform" mode="out-in">
        <div v-if="networkContent.flag" :class="['toast',{'show':networkContent.flag}]">
        <!--<div  class="toast show" style="display: block;transform: translateY(0);opacity: 1">-->
            <img src="../resource/imgs/ic_mistake_toast.png" alt="">
            <p v-html="networkContent.message"></p>
            <!--<p>你好</p>-->
        </div>
    </transition>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'NetworkTip',
        computed: {
            ...mapGetters([
                'networkContent'
            ])
        },
        methods: {
            ...mapActions([
                'SetNetwork'
            ])
        },
        mounted() {
            // this.SetNetwork({flag: 1, message: '网络不可用，请检查网络配置'})
            // setTimeout(()=>{
            //     this.SetNetwork({flag:0,message:''})
            // },2500)
            // setTimeout(()=>{
            //     this.SetNetwork({flag:true,message: '网络不可用，请检查网络配置'})
            // },1000)
        }
    }
</script>

<style lang='scss' scoped>
    .toast {
        width: 678px;
        height: 100px;
        box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.2);
        border-radius: 12px;
        position: fixed;
        top: 36px;
        left: 36px;
        opacity: 0;
        background-color: #fff;
        transform: translateY(-100%);
        z-index: 999;
        display: flex;
        align-items: center;

        img {
            width: 36px;
            height: 36px;
            position: absolute;
            left: 32px;
            top: 32px;
        }
        p {
            font-size: 28px;
            color: #f60000;
            margin-left: 84px;
            text-align: left;
            vertical-align: -0.88em;
        }
        button {
            width: 340px;
            height: 100px;
            background-color: #5c46ff;
            font-size: 30px;
            color: #fff;
            border-radius: 50px;
        }
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
