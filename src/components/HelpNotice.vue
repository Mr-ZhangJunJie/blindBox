<template>
    <transition name="fade-transform" mode="out-in">
        <div class="request-loading-component" v-if="helpConfig.flag">
            <div :class="['toast',{'show':helpConfig.flag}]">
                <div class="close" @click="closeFun"></div>
                <header>
                    <div class="imgBox">
                        <img :src="helpConfig.headPro" alt="">
                    </div>
                    <p>{{helpConfig.nickName}}</p>
                </header>
                <main>
                    快来帮我助力抽盲盒<br>你也得一张抽奖卡!
                </main>
                <footer>
                    <button @click="makeHelp">为Ta助力</button>
                    <p>今日剩余助力机会({{helpConfig.restTickets}}/3)</p>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapGetters} from "vuex"

    export default {
        name: "HelpNotice",
        computed: {
            ...mapGetters([
                'inviteTip'
            ])
        },
        props:{
            'helpConfig': Object
        },
        mounted() {
            console.log(this.inviteTip)
        },
        methods:{
            makeHelp(){
                this.$emit('makeHelp')
            },
            closeFun(){
                this.$emit('close')
            }
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
        padding: 80px 0 50px;
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
                width: 132px;
                height: 132px;
                margin: 0 auto;
                line-height: 0;
                border-radius: 50%;
                overflow: hidden;
                img{
                    width: 100%;
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
            font-size: 40px;
            font-weight: 600;
            color: #000000;
            line-height: 52px;
            margin-top: 60px;
        }
        footer{
            margin-top: 80px;
            button{
                width: 360px;
                height: 100px;
                background: #6332F8;
                border-radius: 50px;
                font-size: 30px;
                font-weight: 600;
                color: #FFFFFF;
            }
            p{
                font-size: 22px;
                font-weight: 400;
                color: #828F9F;
                line-height: 28px;
                margin-top: 16px;
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


