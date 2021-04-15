<template>
    <div>
        <nav class="nav">
            <img src="@/resource/imgs/rule.png" alt="" class="rule" @click="showRule">
            <img src="@/resource/imgs/ex.png" alt="" @click="showCloseDialog">
        </nav>
        <RuleTip1 :isShow="ruleShow" title="盲盒抽奖规则说明" :txt="ruleTxt" btnText="我知道了" :btnStyle="{color:'#6332F8'}"
                  @footFun="ruleShow= false"/>
    </div>
</template>

<script>
    import RuleTip1 from "@/components/RuleTip1.vue"
    import {mapGetters, mapMutations, mapActions} from "vuex"

    export default {
        name: "Nav",
        data() {
            return {
                ruleShow: false,
                ruleTxt: `1、在盲盒有效期内，可使⽤抽奖卡进⾏抽奖，每张抽奖卡可抽奖1次；
2、通过完成任务，可获得抽奖卡，各任务可获得的抽奖卡数⽬不同；
3、盲盒抽奖时，有机会获得服装和⾦币，⼤奖服装概率0.1%，稀有服装概率1%，普通服装概率5%，⾦币概率93.9%；
4、每个盲盒第1次抽奖时，⼀定会抽中1件服装；
5、每个盲盒，连续第10次抽奖且始终未中奖时，⼀定会抽中1件⾐服(套装内服装未集⻬时)；
6、该活动最终解释权归崽崽ZEPETO所有，与苹果公司⽆关。`
            }
        },
        computed: {
            ...mapGetters(['title', 'config', 'prevRoutes', 'ticketNum', 'myApp'])
        },
        mounted() {
            console.log('this.title', this.title)
        },
        methods: {
            ...mapMutations(['SetCouponDialogContent']),
            ...mapActions(['SetCloseGuide']),
            async showCloseDialog() {
                _html({e: "lottery.ClosePop", bk: this.myApp.userId, duid: this.myApp.duid});
                this.SetCloseGuide({flag: 1, coin: 10})
            },
            showRule(){
                this.ruleShow = true;
                _html({e: "lottery.Rule", bk: this.myApp.userId, duid: this.myApp.duid});
            },
            // 点左上角的返回功能时
            back() {
                const {name: routeName} = this.$route;
                const routes = this.prevRoutes;
                const {name, params, query} = routes[routes.length - 1];

                // 从 "报名参赛页"或"我的穿搭赛页" 跳转 人气榜页面
                if (['dress', 'upload'].includes(routeName) && name === 'popular') {
                    this.$router.push({name, params: {showMe: true}})
                } else {
                    this.$router.push({name, params, query})
                }
            },
        },
        components: {
            RuleTip1
        }
    }
</script>

<style scoped lang="scss">
    .nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 112px;
        line-height: 112px;
        font-size: 30px;
        font-weight: 600;
        color: #000;
        padding-left: 36px;
        padding-right: 36px;
        z-index: 90;
        img {
            width: 72px;
            height: 72px;
            pointer-events:auto;
        }
        .rule {
            margin-right: 24px;
        }
    }
</style>
