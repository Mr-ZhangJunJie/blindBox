<template>
    <transition name="fade-transform" mode="out-in">
        <!--v-show="reviewEndContent.flag"-->
        <div class="request-loading-component" v-if="sendPrize.flag">
            <div class="toast">
                <div class="imgBg">
                    <img class="img" src="../resource/imgs/coins180@3x.png" alt="" width="100%">
                </div>
                <div class="content">
                    <h3>发奖啦！</h3>
                    <p class="tip" v-html="sendPrize.content">
                        <!--上期助力Top100<br>成功瓜分<span>200</span>金币！-->
                    </p>
                    <!--第五期 2020.11.30-2020.12.06-->
                    <p class="cycle">{{sendPrize.date}}</p>

                    <div class="btn-group">
                        <button @click="$emit('sendCoins')">领取到钱包</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'SendPrize',
        computed: {
            ...mapGetters([
                'sendPrize'
            ])
        },
        methods:{
            ...mapActions([
                'SetSendPrize'
            ]),
        },
        mounted(){
            // this.SetSendPrize({flag:1,date:'huhsuhsu'})
            // setTimeout(()=>{
            //     this.SetSendPrize({flag:0,date:''})
            // },3000)

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
        background-color: rgba(0,0,0,0.7);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        z-index: 100;
        .toast{
            width: 540px;
            height: 738px;
            background: #FFFFFF;
            border-radius: 40px;
            overflow: unset;
            box-sizing: border-box;
            overflow: hidden;
            .imgBg{
                width: 180px;
                height: 180px;
                display: block;
                margin: 0 auto;
                margin-top: 72px;
                .img{
                    width: 100%;
                }
            }
            .content{
                height: 462px;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                margin-top: 24px;
                padding: 30px 0 60px;
            }
            h3{
                font-size: 40px;
                font-weight: 600;
                padding-left:30px;
            }
            .tip{
                font-size: 30px;
                font-weight: 400;
                color: #000000;
                line-height: 42px;
                text-align: center;
                span{
                    font-size: 32px;
                    font-weight: bold;
                    color: #F323FF;
                }
            }
            .cycle{
                font-size: 26px;
                font-weight: 400;
                color: #A7A7B3;
                text-align: center;
            }
            .btn-group{
                margin-top: 40px;
            }
            button{
                width: 360px;
                height: 100px;
                border-radius: 50px;
                font-size: 30px;
                font-weight: 600;
                color: #ffffff;
                background: #6332F8;
            }
        }
        .show{
            animation: dance 1.3s;
            animation-delay: 500ms;
        }
        @keyframes dance{
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-60px);
            }
            100% {
                transform: translateY(0px);
            }
        }
    }
</style>
