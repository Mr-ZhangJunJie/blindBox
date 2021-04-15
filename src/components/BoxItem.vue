<template>
    <transition name="fade">
        <div v-if="itemBoxContent.flag" class="bg">
            <div class="box">
                <header>
                    <h2>{{itemBoxContent.title}}</h2>
                    <p>{{itemBoxContent.subTitle}}</p>
                </header>
                <main>
                    <ul class="imgBg">
                        <li class="imgBoxBg">
                            <img src="@/resource/imgs/light_spin.png" alt="">
                        </li>
                        <li class="imgBox">
                            <img :src="itemBoxContent.imgSrc" alt="">
                        </li>
                    </ul>
                </main>
                <footer @click="setItemBoxContent">再抽一次</footer>
                <div class="close" @click="setItemBoxContent"></div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    export default {
        name: "BoxItem",
        computed: {
            ...mapGetters([
                'itemBoxContent'
            ])
        },
        methods:{
            ...mapMutations(['setItemBoxContent']),
        },
        mounted(){
            // this.setItemBoxContent({flag:true,title:'运气爆棚! 获得头饰',subTitle:'请稍后前往「礼物盒」领取',imgSrc: require('@/resource/imgs/v1.0/prizes/items_b_cloth_640.png')})
            // this.SetGoldContent3({flag:1,count:10})
            // setTimeout(()=>{
            //     this.SetGoldContent3({status:0,count:10})
            // },2500)
        }
    }
</script>


<style scoped lang="scss">
    /*.fade-enter-active,*/
    .fade-leave-active {
        transition: opacity .2s;
    }
    /*.fade-enter,*/
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
            width: 100%;
            height: 1000px;
            position: relative;
            header{
                width: 100%;
                height: 152px;
                padding-top: 8px;
                text-align: center;
                h2{
                    font-size: 40px;
                    font-weight: 600;
                    color: #FFFFFF;
                    line-height: 48px;
                }
                p{
                    font-size: 26px;
                    font-weight: 400;
                    color: #FFFFFF;
                    line-height: 34px;
                    margin-top: 20px;
                }
            }
            main{
                overflow: hidden;
                height: 680px;
                width: 100%;
                .imgBg{
                    width: 680px;
                    height: 680px;
                    margin: 0 auto;
                    position: relative;

                }
                .imgBoxBg{
                    position: absolute;
                    left:0;
                    top:0;
                    animation: rotateInZ 4s linear infinite;
                    img{
                        width: 100%;
                    }
                }
                .imgBox{
                    width: 640px;
                    height: 640px;
                    position: absolute;
                    left:20px;
                    top:20px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                @keyframes rotateInZ {
                    0%{
                        transform: rotate(0);
                    }
                    100%{
                        transform: rotate(360deg);
                    }
                }
            }
            footer{
                width: 360px;
                height: 100px;
                background: #FFFFFF;
                border-radius: 50px;
                font-size: 30px;
                font-weight: 600;
                color: #000000;
                line-height: 100px;
                margin: 0 auto;
                margin-top: 60px;
            }
            .close{
                width: 60px;
                height: 60px;
                padding: 20px;
                background:url("../resource/imgs/ex1.png") no-repeat center center;
                background-size: 60px 60px;
                position: absolute;
                top:-88px;
                right: 55px;
            }
        }
    }
</style>
