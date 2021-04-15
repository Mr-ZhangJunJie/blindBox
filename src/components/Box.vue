<template>
    <transition name="fade">
        <div v-if="boxContent.flag" class="bg">
            <div class="box">
                <header>
                    <h2>{{boxContent.title}}</h2>
                    <p><img class="qualified" src="@/resource/imgs/tag_limited.png" alt=""><span class="tag">{{boxContent.subTitle}}</span></p>
                </header>
                <main>
                    <img :src="boxContent.imgSrc" alt="">
                </main>
                <footer>
                    <button @click="$emit('tryWear')">试穿套装</button>
                    <button @click="saveImg">保存炫耀</button>
                </footer>
                <div class="close" @click="$emit('close')"></div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "Box",
        props:{
            'boxContent':Object
        },
        computed: {
            ...mapGetters([
                'myApp'
            ])
        },
        methods:{
            saveImg(){
                _html({e: "lottery.CompletePop.Share", bk: this.myApp.userId, duid: this.myApp.duid});
                this.$emit('saveImg')
            }
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
            width: 100%;
            height: 1110px;
            position: relative;
            header{
                width: 100%;
                height: 120px;
                text-align: center;
                h2{
                    font-size: 40px;
                    font-weight: 600;
                    color: #FFFFFF;
                    line-height: 48px;
                }
                p{
                    margin-top: 20px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .qualified{
                        width: 68px;
                        height: 32px;
                    }
                    .tag{
                        font-size: 30px;
                        font-weight: 600;
                        color: #FFFFFF;
                        margin-left: 10px;
                    }
                }
            }
            main{
                overflow: hidden;
                height: 860px;
                width: 100%;
                img{
                    height: 100%;
                    width: 670px;
                }
            }
            footer{
                display: flex;
                justify-content: center;
               margin-top: 30px;
               button:nth-of-type(1){
                   width: 304px;
                   height: 100px;
                   border-radius: 50px;
                   border: 2px solid #FFFFFF;
                   line-height: 100px;
                   font-size: 30px;
                   font-weight: 600;
                   color: #FFFFFF;
                   background: transparent;
               }
               button:nth-of-type(2){
                   width: 304px;
                   height: 100px;
                   background: #FFFFFF;
                   border-radius: 50px;
                   line-height: 100px;
                   font-size: 30px;
                   font-weight: 600;
                   color: #000000;
                   margin-left: 22px;
               }
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
