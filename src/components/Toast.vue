<template>
    <transition name="fade-transform" mode="out-in">
        <div v-if="toastContent.flag" :class="['toast',{'show':toastContent.flag}]">
            <p>{{toastContent.text}}</p>
        </div>
    </transition>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'Toast',
        computed: {
            ...mapGetters([
                'toastContent'
            ])
        },
        methods:{
            // ...mapActions([
            //     'SetToast'
            // ])
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
        position: fixed;
        top:36px;
        left: 36px;
        opacity: 0;
        transform: translateY(-100%);
        background-color: #fff;
        z-index: 999;
        text-align: left;
        display: flex;
        align-items: center;

        img{
            width: 56px;
            height: 56px;
            position: absolute;
            left:28px;
            top: 28px;
        }
        p{
            font-size: 28px;
            color: #000000;
            text-indent: 32px;
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
