<template>
    <transition name="fade-transform" mode="out-in">
        <div class="request-loading-component" v-show="requestLoading.flag" :style="{backgroundColor:requestLoading.bg}">
            <div class="bg">
                <svg-icon icon-class="loading" class="rotate"/>
            </div>
            <p>{{requestLoading.text}}</p>
        </div>
    </transition>
</template>

<script>
    import { mapGetters, mapActions} from 'vuex'
    export default {
        name: 'RequestLoading',
        methods:{
            ...mapActions(['SetLoading'])
        },
        computed: {
            ...mapGetters([
                'requestLoading'
            ])
        },
        mounted(){
            // this.SetLoading({flag:1,text:'正在等待pk结果...',bg:'rgba(0,0,0,0.3)'})
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
        font-size: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 999;
        .bg{
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background-color: rgba(0,0,0,0.4);
            display: flex;
            justify-content: center;
            align-items: center;
        }
        p{
            margin-top: 20px;
            font-size: 30px;
            color: currentColor;
        }
    }
    .rotate{
        animation: rotating 2s infinite linear;
    }
    @keyframes rotating {
       0% {
           transform: rotate(0);
       }
       100% {
           transform: rotate(360deg);
       }
    }
</style>
