<template>
    <transition name="fade-transform" mode="out-in">
        <div class="request-loading-component" v-show="isShow">
            <div class="toast">
                <header>
                    <h3>{{title}}</h3>
                    <div class="closeBtn" @click="closeFun"></div>
                </header>
                <pre><p>{{txt}}</p></pre>
                <footer :style="btnStyle" @click="closeFun">
                    {{btnText}}
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
    import {fixedBody,looseBody} from "@/utils/common.js"
    export default {
        name: 'RuleTip1',
        props:{
           isShow: {
               type:Boolean,
               default:false
           },
           title:{
               type: String,
               required: true
           },
           txt: {
               type: String,
               required: true
           },
           btnText: {
               type: String,
               required: true
           },
           btnStyle: {
               type: Object,
               default: ()=>({})
           },
           // footFun: {
           //     type: Function
           // }
        },
        methods: {
            closeFun(){
                this.$emit('footFun')
            }
        },
        watch:{
            // isShow(val){
                // if(val) fixedBody();
                // else looseBody();
            // }
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
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        z-index: 999;
        .toast {
            width: 630px;
            background: #FFFFFF;
            border-radius: 40px;

            header{
                height: 100px;
                position: relative;
                h3{
                    height: 100%;
                    font-size: 30px;
                    font-weight: 600;
                    color: #000000;
                    line-height: 100px;
                }
                .closeBtn{
                    width: 100px;
                    height: 100px;
                    background-color: red;
                    position: absolute;
                    right:0;
                    top:0;
                    background: url("../resource/imgs/ex_popup.png") no-repeat center center;
                    background-size: 36px 36px;
                }
            }
            pre{
                /*min-height: 560px;*/
                max-height: 748px;
                padding: 10px 40px 20px;
                flex: 1;
                overflow-y: scroll;
                -webkit-overflow-scrolling:touch;
                font-size: 26px;
                color: #686675;
                line-height: 40px;
                white-space: pre-wrap;

                h3 {
                    font-size: 38px;
                    color: #323232;
                    font-weight: 600;
                }
                p {
                    font-size: 28px;
                    line-height: 42px;
                    color: #686675;
                    white-space: pre-wrap;
                    text-align: left;
                    /*margin-top: 24px;*/
                }
            }
            footer{
                width: 100%;
                height: 112px;
                /*background: #33EEA7;*/
                border-radius: 0 0 40px 40px;
                font-size: 30px;
                font-weight: 600;
                color: #000000;
                line-height: 112px;
                border-top: 1px solid #E5E5E9;
            }
        }
    }
    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
        border-radius:6px;
        background-color: rgba(0,0,0,0.4);
    }
</style>
