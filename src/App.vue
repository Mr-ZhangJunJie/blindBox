<template>
    <div id="app" :class="{'big-screen':bigScreen}">
        <div id="resizeFont" style="position:absolute;width: 10rem;opacity:0;z-index:-1;"></div>
        <Nav/>
        <router-view/>
        <RequestLoading style="color:#fff;"/>
        <NetworkTip/>
        <SignUp/>
        <Toast/>
        <Offline v-if="!onLine"/>
        <CloseGuide ref="closeGuide"/>
        <GoldTip3/>
        <BoxItem/>
        <InviteTip/>
        <InviteNotice/>
        <HelpSuccess/>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import RequestLoading from "@/components/RequestLoading.vue"
    import NetworkTip from "@/components/NetworkTip.vue"
    import SignUp from "@/components/SignUp.vue"
    import Offline from "@/components/Offline"
    import Toast from "@/components/Toast"
    import CloseGuide from './components/CloseGuide'
    import GoldTip3 from "./components/GoldTip3";
    import BoxItem from "./components/BoxItem.vue";
    import InviteTip from "./components/InviteTip.vue";
    import InviteNotice from "./components/InviteNotice.vue";
    import HelpSuccess from "./components/HelpSuccess.vue";
    import Nav from "./components/Nav";

    export default {
        name: 'app',
        beforeCreate() {
            const isBigScreen = judgeBigScreen();
            this.$store.commit('SET_BIG_SCREEN', isBigScreen)
        },
        async mounted() {
            window.addEventListener('online', this.updateOnlineStatus);
            window.addEventListener('offline', this.updateOnlineStatus);

            setTimeout(() => {
                // 预加载关闭引导图片，防止图片加载出现闪屏
                this.$refs.closeGuide.preload()
            }, 3000);
        },
        beforeDestroy() {
            window.removeEventListener('online', this.updateOnlineStatus);
            window.removeEventListener('offline', this.updateOnlineStatus);
        },
        components: {
            GoldTip3,
            Nav,
            CloseGuide,
            RequestLoading,
            NetworkTip,
            SignUp,
            Offline,
            Toast,
            BoxItem,
            InviteTip,
            InviteNotice,
            HelpSuccess
        },
        computed: {
            ...mapGetters(['bigScreen', 'prevRoutes', 'ticketNum', 'totalVoucherContent', 'couponDialogContent', 'myApp'])
        },
        data() {
            return {
                onLine: navigator.onLine,
            }
        },
        methods: {
            ...mapActions(['SetCloseGuide','SetLoading']),

            updateOnlineStatus(e) {
                const {type} = e;
                const isOnline = type === 'online';
                this.onLine = isOnline;
                this.SetLoading({flag: 0, text: '', bg: 'transparent'});
                if (isOnline) {
                    const router = this.$route
                    this.$router.push({path: router.path, query: {n: Date.now()}})
                }
            },
            closePage() {
                window.location.href = 'ZEPETO://WEBVIEW/CLOSE';
            }
        },
    }

    /**
     * 判断是否全面屏
     */
    function judgeBigScreen() {
        let result = false;
        const rate = window.screen.height / window.screen.width;
        let limit = window.screen.height == window.screen.availHeight ? 2.05 : 1.65; // 临界判断值
        console.log(window.screen.height, window.screen.availHeight, window.screen.height, window.screen.width, window.innerHeight);

        // window.screen.height为屏幕高度
        //  window.screen.availHeight 为浏览器 可用高度
        // console.log('screen rate2', rate);
        if (rate > limit) {
            result = true;
        }
        return result;
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;

        &.big-screen {
            /*height: calc(100% - 180px);*/
            .nav {
                padding-top: 68px;
                &::before {
                    content: '';
                    display: block;
                    width: 100%;
                    height: 68px;
                    position: absolute;
                    background: #fff;
                    top: -68px;
                    left: 0;
                }
            }
            > .toast {
                top: 100px;
            }
        }
        .toast {
            background: #fff;
        }
    }
</style>
