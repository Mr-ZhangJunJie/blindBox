<template>
    <transition name="fade">
        <div v-if="goldContent3.flag" class="bg">
            <div class="box">
                <header>
                    <img src="@/resource/imgs/coin.png" alt="">
                </header>
                <main>
                   <h2>啊～运气欠佳</h2>
                    <p>送你<span>{{goldContent3.count}}</span>金币安慰奖</p>
                </main>
                <footer @click="SetGoldContent3({flag:0,count:0})">再抽一次</footer>
            </div>
        </div>
    </transition>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    export default {
        name: "GoldTip3",
        computed: {
            ...mapGetters([
                'goldContent3'
            ])
        },
        methods:{
            ...mapMutations(['SetGoldContent3']),
        },
        mounted(){
            // this.SetGoldContent3({flag:1,count:10})
            // setTimeout(()=>{
            //     this.SetGoldContent3({status:0,count:10})
            // },2500)
        }
    }
</script>

<style scoped lang="scss">
    .fade-leave-active {
        transition: opacity .2s;
    }
    .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .bg{
        position: fixed;
        z-index: 99;
        left:0;
        top:0;
        right:0;
        bottom:0;
        background: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        .box{
            width: 540px;
            height: 646px;
            border-radius: 40px;
            overflow: hidden;
            background: #FFFFFF;
            header{
                width: 100%;
                height: 276px;
                display: flex;
                justify-content: center;
                img{
                    width: 152px;
                    height: 152px;
                    margin-top: 86px;
                }
            }
            main{
                overflow: hidden;
                height: 210px;
                h2{
                    font-size: 40px;
                    font-weight: 600;
                    color: #000000;
                    line-height: 48px;
                    margin-top: 40px;
                }
                p{
                    height: 42px;
                    font-size: 30px;
                    font-weight: 400;
                    color: #000000;
                    line-height: 42px;
                    margin-top: 20px;
                    span{
                        font-size: 32px;
                        font-weight: bold;
                        color: #F323FF;
                    }
                }
            }
            footer{
                width: 360px;
                height: 100px;
                background: #6332F8;
                border-radius: 50px;
                font-size: 30px;
                font-weight: 600;
                color: #FFFFFF;
                text-align: center;
                line-height: 100px;
                margin: 0 auto;
            }
        }
    }
</style>
