<template>
    <transition name="fade-transform" mode="out-in">
        <div class="request-loading-component" v-if="inviteSuccess.flag">
            <div :class="['toast',{'show':inviteSuccess.flag}]">
                <div class="close" @click="setInviteSuccess"></div>
                <header></header>
                <main>
                    <h3>{{inviteSuccess.title}}</h3>
                    <p v-html="inviteSuccess.subTitle"></p>
                </main>
                <footer @click="setInviteSuccess">{{inviteSuccess.btnTxt}}</footer>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapGetters,mapMutations} from "vuex"

    export default {
        name: "HelpSuccess",
        computed: {
            ...mapGetters([
                'inviteSuccess'
            ])
        },
        methods:{
            ...mapMutations(['setInviteSuccess'])
        }
    }
</script>

<style scoped lang="scss">
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
        z-index: 98;
    }

    .toast {
        width: 540px;
        border-radius: 40px;
        background-color: #fff;
        text-align: center;
        padding: 80px 0 60px;
        position: relative;

        .close{
            position: absolute;
            width: 60px;
            height: 60px;
            background: url("../resource/imgs/ex_popup_grey.png") no-repeat center center;
            background-size: 36px 36px;
            right:16px;
            top:16px;
        }
        header{
            width: 160px;
            height: 160px;
            background: url("../resource/imgs/ic_ticket_228.png") no-repeat;
            background-size: 100% auto;
            margin:0 auto;
        }
        main{
            margin-top: 60px;
            h3{
                font-size: 36px;
                font-weight: 600;
                color: #000000;
                line-height: 44px;
            }
            p{
                font-size: 30px;
                font-weight: 400;
                color: #828F9F;
                line-height: 42px;
                margin-top: 20px;
            }
        }
        footer{
            width: 360px;
            height: 100px;
            line-height: 100px;
            background: #6332F8;
            border-radius: 50px;
            margin: 0 auto;
            margin-top: 60px;
            font-size: 30px;
            font-weight: 600;
            color: #FFFFFF;
        }
    }

    .show {
        animation: dance 1.3s;
    }

    @keyframes dance {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
