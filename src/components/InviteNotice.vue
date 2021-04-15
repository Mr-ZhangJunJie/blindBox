<template>
    <transition name="fade-transform" mode="out-in">
        <div class="request-loading-component" v-if="inviteNotice.flag">
            <div :class="['toast',{'show':inviteNotice.flag}]">
                <div class="close" @click="setInviteNotice"></div>
                <header>
                    <div class="imgBox">
                        <img :src="inviteNotice.headPro" alt="">
                    </div>
                </header>
                <main>
                    <h1>已通知好友</h1>
                    <p>通知送达可能延迟<br>请稍作等待</p>
                </main>
                <footer>
                    <button @click="setInviteNotice">好的</button>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapGetters,mapMutations} from "vuex"

    export default {
        name: "InviteNotice",
        computed: {
            ...mapGetters([
                'inviteNotice'
            ])
        },
        methods:{
            ...mapMutations(['setInviteNotice'])
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
        z-index: 120;
    }

    .toast {
        width: 540px;
        border-radius: 40px;
        background-color: #fff;
        text-align: center;
        padding: 84px 0 60px;
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
            .imgBox{
                width: 504px;
                height: 200px;
                margin: 0 auto;
                position: relative;
                background: url("../resource/imgs/gif_notice.png") no-repeat;
                background-size: 100% auto;
                img{
                    width: 52px;
                    height: 52px;
                    border-radius: 50%;
                    overflow: hidden;
                    position: absolute;
                    left:28px;
                    top:106px;
                }
            }
            p{
                font-size: 22px;
                color: #000000;
                line-height: 28px;
                margin-top: 16px;
                padding: 0 48px;
                overflow:hidden; //超出的文本隐藏
                text-overflow:ellipsis; //溢出用省略号显示
                white-space:nowrap; //溢出不换行
            }
        }
        main{
            margin-top: 32px;
            h1{
                font-size: 40px;
                font-weight: 600;
                color: #000000;
                line-height: 48px;
            }
            p{
                font-size: 30px;
                color: #828F9F;
                line-height: 42px;
                margin-top: 20px;
            }
        }
        footer{
            margin-top: 30px;
            button{
                width: 360px;
                height: 100px;
                background: #6332F8;
                border-radius: 50px;
                font-size: 30px;
                font-weight: 600;
                color: #FFFFFF;
            }
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

