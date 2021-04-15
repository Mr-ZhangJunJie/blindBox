<template>
    <transition name="fade-transform" mode="out-in">
        <div class="request-loading-component" v-show="reviewEndContent.flag">
            <div class="toast">
                <div class="imgBg">
                    <img class="img" src="../resource/imgs/popup_HeaderPic.png" alt="" width="100%">
                </div>
                <div class="content">
                    <h3>今日评审战绩</h3>
                    <p>最长 <span class="num">{{userInfo.maxCombo}}</span> 连击，最高单次获得 <span class="num">{{config.likeWinReward[userInfo.maxCombo-1]}}</span> 金币</p>
                    <p>共获得 <span class="num">{{userInfo.totalCoins}}</span> 金币</p>
                    <p>明日再来参与评审，赢取更多奖励吧~</p>
                    <div class="btn-group">
                        <button @click="goTo">离开</button>
                        <button @click="goToRank">人气榜</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'ReviewEnd',
        computed: {
            ...mapGetters([
                'myApp','reviewEndContent','config','userInfo'
            ])
        },
        methods:{
            ...mapActions([
                'SetReviewEnd'
            ]),
            goTo(){
                // eslint-disable-next-line
                // _html({e:"z_dresspk.awardbtn",bk:this.myApp.userId,ver:this.myApp.version});
                // window.location.href = this.reviewEndContent.url;
                // eslint-disable-next-line
                _html({e:"z_dresspk.awardhomebtn",bk:this.myApp.userId,ver:this.myApp.version});
                // this.$router.replace({name:'home'})
                // this.SetReviewEnd({status:0,url:''})
                window.location.href = "ZEPETO://WEBVIEW/CLOSE";
            },
            goToRank(){
                this.SetReviewEnd({flag:0,url:''})
                this.$router.push({name: 'sort'})
            }
        },
        mounted(){
            // this.SetReviewEnd({flag:1,url:'https://www.baidu.com'})
            // setTimeout(()=>{
            //     this.SetReviewEnd({flag:0,url:'https://www.baidu.com'})
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
        z-index: 999;
        .toast{
            width: 630px;
            height: 574px;
            margin-top: -200px;
            background-color: #fff;
            border-radius: 40px;
            overflow: unset;
            box-sizing: border-box;
            .imgBg{
                width: 100%;
                height: 130px;
                position: relative;
                .img{
                    position: absolute;
                    top: -80%;
                    transform: translateX(-50%);
                    width: 220px;
                }
                .close{
                    width: 100px;
                    height: 100px;
                    background: url("../resource/imgs/close.png") no-repeat center center;
                    background-size: 60px 60px;
                    position: absolute;
                    padding: 20px;
                    right:0;
                }
            }
            .content{
                height: 408px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                padding:20px 0;
                box-sizing: border-box;
            }
            h3{
                font-size: 40px;
                font-weight: 600;
            }
            p{
                font-size: 28px;
                font-weight: 400;
                color: #686675;
                .num{
                    color: #5c46ff;
                }
            }
            .btn-group{
                margin-top: 40px;
            }
            button{
                width: 256px;
                height: 100px;
                font-size: 30px;
                font-weight: 600;
                border-radius: 50px;
                &:first-child{
                    color: #000;
                    background: #f1f3f8;
                }
                &:last-child{
                    margin-left: 18px;
                    color: #fff;
                    background-color: #6332F8;
                }
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
