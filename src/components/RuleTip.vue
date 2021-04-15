<template>
    <transition name="fade-transform" mode="out-in">
        <div class="request-loading-component" v-show="isShow">
            <div class="toast">
                <svg-icon icon-class="rule" class="icon"></svg-icon>
                <pre>
                    <h3>活动规则</h3>
                    <p>{{ruleContent.txt}}</p>
                </pre>
                <p class="foot">
                    <button @click="SetRule({flag:0,txt:''})">我知道了</button>
                </p>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'RuleTip',
        computed: {
            ...mapGetters([
                'ruleContent'
            ]),
            isShow(){
                const flag = this.ruleContent.flag
                window.canScroll = flag
                return flag
            }
        },
        methods: {
            ...mapActions([
                'SetRule'
            ])
        },
        mounted() {
            // this.SetRule({flag:1,txt:'nihao'})
            // setTimeout(()=>{
            //     this.SetRule({flag:0,txt:''})
            // },3000)
            // setTimeout(()=>{
            //     this.SetRule(1)
            // },6000)
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
            max-height: 960px;
            background-color: #fff;
            border-radius: 40px;
            padding: 170px 34px 50px;
            box-sizing: border-box;
            position: relative;
            display: flex;
            flex-direction: column;
            .icon {
                font-size: 168px;
                position: absolute;
                left: 231px;
                top: -50px;
            }
            p {
                font-size: 30px;
                color: #fff;
            }
            pre {
                flex: 1;
                font-size: 0;
                overflow-y: scroll;
                -webkit-overflow-scrolling:touch;
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
                    margin-top: 24px;
                }
            }
            .foot {
                padding-top: 50px;
                button {
                    width: 340px;
                    height: 100px;
                    border-radius: 50px;
                    background-color: #5c46ff;
                    font-size: 30px;
                    color: #fff;
                    font-weight: 600;
                }
            }
        }
        .show {
            animation: dance 1.3s;
            animation-delay: 1s;
        }
        @keyframes dance {
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
    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
        border-radius:6px;
        background-color: rgba(0,0,0,0.4);
    }
</style>
