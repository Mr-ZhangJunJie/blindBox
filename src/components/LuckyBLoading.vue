<template>
    <transition name="fade">
        <div v-if="luckyConfig.isShowBLoading" class="bg">
            <div class="loadBox">
                <img :src="luckyConfig.BoxBody" alt="" class="BoxBody">
                <img :src="luckyConfig.BoxTop" alt="" class="Boxtop">
                <p class="loadingTxt">
                    抽奖中<span>.</span><span>.</span><span>.</span>
                </p>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "LuckyBLoading",
        mounted(){
            console.log('====',this.luckyConfig)
        },
        props:{
            luckyConfig: {
                type: Object,
                default(){
                    return {
                        'isShowBLoading': false,
                        'BoxBody':'',
                        'BoxTop': ''
                    }
                }
            }
        }
    }
</script>


<style scoped lang="scss">
    /*.fade-leave-active*/
    .fade-enter-active {
        transition: opacity .1s;
    }
    /*.fade-leave-to */
    .fade-enter/* .fade-leave-active below version 2.1.8 */ {
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
        .loadBox{
            width: 560px;
            height: 560px;
            position: relative;
            img{
                width: 100%;
                height: 100%;
                position: absolute;
                left:0;
                top:0;
            }
            .loadingTxt{
                font-size: 40px;
                font-weight: 600;
                color: #FFFFFF;
                line-height: 48px;
                position: absolute;
                left:50%;
                transform: translateX(-50%);
                top: -88px;
            }
            .BoxBody{
                animation: transformLeft 100ms linear infinite;
            }
            .Boxtop{
                animation: transformRight 100ms linear infinite;
            }
            @keyframes transformRight {
                0%{
                    transform: translateX(0);
                }
                25%{
                    transform: translateX(5px);
                }
                50%{
                    transform: translateX(0);
                }
                75%{
                    transform: translateX(-5px);
                }
                100%{
                    transform: translateX(0);
                }
            }
            @keyframes transformLeft {
                0%{
                    transform: translateX(0);
                }
                25%{
                    transform: translateX(-5px);
                }
                50%{
                    transform: translateX(0);
                }
                75%{
                    transform: translateX(5px);
                }
                100%{
                    transform: translateX(0);
                }
            }
        }
    }
</style>
