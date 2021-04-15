// import BrowserChecker from '@/utils/BrowserChecker'

const app = {
    state: {
        requestLoading: {flag: 1, bg: 'transparent', text: ''},
        likeContent: {flag: 0, count: 0},
        networkContent: {flag: 0, message: ''},
        goldContent: {flag: 0, count: 0},
        goldContent1: {flag: 0, count: ''},
        goldContent3: {flag: 0, count: ''},
        ruleContent: {flag: 0, txt: ''},
        toastContent: {flag: 0, text: ''},
        voteContent: {flag: 0},
        couponDialogContent: {flag: false, isShowCoinBox: false},
        reviewPromtContent: {flag: 0},
        totalVoucherContent: {flag: 0},
        sendPrize: {flag: 0, date: '第五期 2020.11.30-2020.12.06', content: '', likeCount: 0},
        voucherEndContent: {type: 0, voucher: 0, coin: 0},
        reviewContent: 0,
        guideContent: 0,
        closeGuideContent: {flag: 0, coin: 0},
        signInContent: {flag: 0, coin: 0},
        tipDirection: 'left',
        signContent: {flag: 0, txt: ''},
        isFrist: true,//是否刚进入首页
        reviewEndContent: {flag: 0, url: ''},
        showVoteCouponDialog: false,
        token: '',
        config: {
            likeWinReward: 0,
            photoPose: '',
            questInfo: [{coin: 0, likeCount: 0}],
            ruleDesc: '',
            startDate: '',
            endDate: '',
            dailyLikeTimes: 0
        },
        myApp: {
            // version: '',
            dpr: window.devicePixelRatio,
            version: '2.24.3',

            // zzId: '4CYBGI', //手机测试号
            // authToken: 'pL+IjV8rsl94qG4zoPgx4U2LfTOASwQHwSFuJ12Jtn3X+9y3okVufPrLX1/3HTN5KsEFp+SD5Zn4kop056aKvA85AR/G6dDEqWitt9Mc1og=\\1\\/pbqMjbgMdbNExPRhjk+BmbnExXmE8CN3xbg',
            // profilePic: 'http://china-preview-migration-web.v.nfra.io/users/5dc3c4f8051bb49340e2dfbb/profile/5dc3c50c051bb49340e2dfbd.png?modified=1573111052000',
            // name: 'GUEST 4IQ8VZ', //线上的
            // userId:'5dc2ad2089dbbe1ba05a7859', //线上的
            // duid: 'CEA9BD4C-B278-5061-9DA3-58E883CA2374', // 线上的
            // userAgent: '-'//线上的

            // 本机电脑
            zzId: 'VQX045', //电脑测试号
            authToken: "t6B+ZdSEdtY4xRP30NsozU8FaMbnoG99ED4nIf/qhrM+5lzhfjihcC1VAgwYNGOappbIllZV72mUA4b7vEh85JiVB70cY6SVYdBtLt5/6qc=\\1\\AtElC5P2Z54wZFq8Z9D8ZFfvZYgluYSIurgX094=",
            profilePic: 'https://cdn.zepeto.cn/users/5f03de9d89dbbe2217a3b740/profile/5f03deda89dbbe2217a3bab1.png?modified=1594089179000',
            nickName: 'GUEST VQX045', //线上的
            userId: '5f03de9d89dbbe2217a3b740', //线上的
            duid: 'CEA9BD4C-B278-5061-9DA3-58E883CA2374', // 线上的
            deviceId: 'CEA9BD4C-B278-5061-9DA3-58E883CA2374',
            userAgent: 'ios.zepeto_cn/2.24.3 (ios; U; iOS 13.5.1; zh-CN; occ-CN; iPhone8,2)'//线上的

            // zzId: '4CYBGI', //电脑测试号
            // authToken: 'pL+IjV8rsl94qG4zoPgx4U2LfTOASwQHwSFuJ12Jtn3X+9y3okVufPrLX1/3HTN5KsEFp+SD5Zn4kop056aKvA85AR/G6dDEqWitt9Mc1og=\\1\\/pbqMjbgMdbNExPRhjk+BmbnExXmE8CN3xbg',
            // profilePic: 'http://china-preview-migration-web.v.nfra.io/users/5dc3c4f8051bb49340e2dfbb/profile/5dc3c50c051bb49340e2dfbd.png?modified=1573111052000',
            // name: 'GUEST 4IQ8VZ', //线上的
            // userId:'5dc2ad2089dbbe1ba05a7859', //线上的
            // duid: 'CEA9BD4C-B278-5061-9DA3-58E883CA2374', // 线上的
            // deviceId: 'CEA9BD4C-B278-5061-9DA3-58E883CA2374',
            // userAgent: '-'//线上的

            // qiu成账号
            // zzId: 'G4DO5R', //电脑测试号
            // authToken: "OevaDfzcs349uaJy9685R/gRXMAHpqlCil34fyHBcyJHPLZ5BS0RLzSWBJ2CgPrC0lxba/M5Y6Xu+R7NY3FhXzzf1yw0/txg8kvc2L1BJiE=\\1\\CXkYNYP2Z5uw0tyM0hswZhur0YzvNtZ309uBNYq=",
            // profilePic: 'https://cdn.zepeto.cn/users/5f03de9d89dbbe2217a3b740/profile/5f03deda89dbbe2217a3bab1.png?modified=1594089179000',
            // name: 'Guest G4DO5R', //线上的
            // userId: '5f335ee6a3fc654b9fd43095', //线上的
            // duid: 'CEA9BD4C-B278-5061-9DA3-58E883CA2374', // 线上的
            // deviceId: 'CEA9BD4C-B278-5061-9DA3-58E883CA2374',
            // userAgent: 'ios.zepeto_cn/2.24.3 (ios; U; iOS 13.5.1; zh-CN; occ-CN; iPhone8,2)'//线上的
        },
        bigScreen: false,
        prevRoutes: [{name: 'home'}],
        title: '',
        itemBoxContent: {flag: false, title: '', subTitle: '', imgSrc: ''},
        inviteTip: {flag: false, title: '', subTitle: '', btnTxt: ''},
        inviteNotice: {flag: false,headPro:''},
        inviteSuccess: {flag: false, title: '', subTitle: '', btnTxt: ''}
    },
    mutations: {
        SET_LOADING: (state, {flag, text, bg}) => {
            state.requestLoading.text = text;
            state.requestLoading.bg = bg;
            state.requestLoading.flag = flag ? 1 : 0;
        },
        SET_LIKE: (state, {flag, count}) => {
            //设置点赞人数
            state.likeContent.count = count;
            state.likeContent.flag = flag ? 1 : 0;
        },
        SET_REVIEW: (state, obj) => {
            //设置点赞人数
            state.reviewContent = obj.flag ? 1 : 0;
            state.tipDirection = obj.direction ? 'right' : 'left';
        },
        SET_GUIDE: (state, isShow) => {
            //设置是否显示引导弹窗
            state.guideContent = isShow
        },
        SET_CLOSE_GUIDE: (state, {flag, coin}) => {
            //设置是否显示关闭引导弹窗
            state.closeGuideContent.flag = flag
            state.closeGuideContent.coin = coin
        },
        SET_SIGN_IN_GUIDE: (state, {flag, coin}) => {
            //设置是否显示关闭引导弹窗
            state.signInContent.flag = flag;
            state.signInContent.coin = coin;
        },
        SET_SIGN: (state, {flag, txt}) => {
            //设置点赞人数
            // error 的时候直接重置
            state.signContent.txt = txt;
            state.signContent.flag = flag ? 1 : 0;
        },
        SET_REVIEW_END: (state, {flag, url}) => {
            //设置点赞人数
            state.reviewEndContent.url = url;
            state.reviewEndContent.flag = flag ? 1 : 0;
        },
        SET_VOUCHER_END: (state, status) => {
            // 0：不显示，1：评审券不足 2：评审券用完
            state.voucherEndContent = status;
        },
        SET_NETWORK: (state, {flag, message}) => {
            state.networkContent.message = message;
            state.networkContent.flag = flag ? 1 : 0;
        },
        SET_RULE: (state, {flag, txt}) => {
            state.ruleContent.txt = txt;
            state.ruleContent.flag = flag ? 1 : 0;
        },
        SET_GOLD: (state, {flag, count, direction}) => {
            //设置点赞人数
            state.goldContent.count = count;
            state.goldContent.flag = flag ? 1 : 0;
            state.tipDirection = direction ? 'right' : 'left';
        },
        SET_GOLD1: (state, {flag, count}) => {
            //设置点赞人数
            state.goldContent1.count = count;
            state.goldContent1.flag = flag ? 1 : 0;
        },

        SetGoldContent3: (state, {flag, count}) => {
            //设置点赞人数
            state.goldContent3.count = count;
            state.goldContent3.flag = flag ? 1 : 0;
        },

        SET_TOAST: (state, {flag, text}) => {
            state.toastContent.text = text;
            state.toastContent.flag = flag ? 1 : 0;
        },
        SetVoteContent: (state, {flag}) => {
            state.voteContent.flag = flag ? 1 : 0;
        },
        SetCouponDialogContent: (state, {flag, isShowCoinBox}) => {
            state.couponDialogContent.flag = flag;
            state.couponDialogContent.isShowCoinBox = isShowCoinBox;
        },
        SetReviewPromtContent: (state, {flag}) => {
            state.reviewPromtContent.flag = flag ? 1 : 0;
        },
        SetTotalVoucherContent: (state, {flag}) => {
            state.totalVoucherContent.flag = flag ? 1 : 0;
        },

        SET_SEND_PRIZE: (state, {flag, date, content, likeCount}) => {
            state.sendPrize.flag = flag;
            state.sendPrize.date = date;
            state.sendPrize.content = content;
            state.sendPrize.likeCount = likeCount;
        },
        SET_CONFIG: (state, obj) => {
            state.ruleContent.txt = obj.ruleDesc;
            state.config = obj;
        },
        SET_FRIST: (state, status) => {
            state.isFrist = status
        },
        SET_BIG_SCREEN: (state, status) => {
            state.bigScreen = status
        },
        RESET_TITLE: (state, title) => {
            state.title = title
        },
        SET_PREV_ROUTE: (state, routes) => {
            state.prevRoutes = routes
        },
        SetShowVoteCouponDialog(state, status) {
            state.showVoteCouponDialog = status
        },
        setToken(state, token) {
            state.token = token
        },
        setItemBoxContent(state, {flag = false, title = '', subTitle = '', imgSrc = ''} = {}) {
            state.itemBoxContent.flag = flag;
            state.itemBoxContent.title = title;
            state.itemBoxContent.subTitle = subTitle;
            state.itemBoxContent.imgSrc = imgSrc;
        },
        setInviteTip(state, {flag = false, title = '', subTitle = '', btnTxt = ''} = {}) {
            state.inviteTip.flag = flag;
            state.inviteTip.title = title;
            state.inviteTip.subTitle = subTitle;
            state.inviteTip.btnTxt = btnTxt;
        },
        setInviteNotice(state, {flag = false,headPro = ''} = {}) {
            state.inviteNotice.flag = flag;
            state.inviteNotice.headPro = headPro;
        },
        setInviteSuccess(state, {flag = false, title = '', subTitle = '', btnTxt = ''} = {}) {
            state.inviteSuccess.flag = flag;
            state.inviteSuccess.title = title;
            state.inviteSuccess.subTitle = subTitle;
            state.inviteSuccess.btnTxt = btnTxt;
        }
    },
    actions: {
        SetLoading({commit}, status) {
            commit('SET_LOADING', status)
        },
        SetLike({commit}, obj) {
            commit('SET_LIKE', obj)
        },
        SetGold({commit}, obj) {
            commit('SET_GOLD', obj)
        },
        SetGold1({commit}, obj) {
            commit('SET_GOLD1', obj)
        },
        SetToast({commit}, obj) {
            commit('SET_TOAST', obj)
        },
        SetSendPrize({commit}, obj) {
            commit('SET_SEND_PRIZE', obj)
        },
        SetRule({commit}, status) {
            commit('SET_RULE', status)
        },
        SetNetwork({commit}, status) {
            commit('SET_NETWORK', status)
        },
        SetReview({commit}, status) {
            commit('SET_REVIEW', status)
        },
        SetGuide({commit}, status) {
            commit('SET_GUIDE', status)
        },
        SetCloseGuide({commit}, status) {
            commit('SET_CLOSE_GUIDE', status)
        },
        SetSignInGuide({commit}, status) {
            commit('SET_SIGN_IN_GUIDE', status)
        },
        SetSign({commit}, status) {
            console.log('obj', status)
            commit('SET_SIGN', status)
        },
        SetReviewEnd({commit}, status) {
            commit('SET_REVIEW_END', status)
        },
        SetVoucherEnd({commit}, status) {
            commit('SET_VOUCHER_END', status)
        },
        Check_App_Info({state}) {
            state.myApp.zzId = window.ZEPETO ? window.ZEPETO.userInfo.hashCode : state.myApp.zzId;
            state.myApp.authToken = window.ZEPETO ? window.ZEPETO.userInfo.authToken : state.myApp.authToken;
            state.myApp.profilePic = window.ZEPETO ? window.ZEPETO.userInfo.profilePic : state.myApp.profilePic;
            state.myApp.nickName = window.ZEPETO ? window.ZEPETO.userInfo.name : state.myApp.nickName;
            state.myApp.version = window.ZEPETO ? window.ZEPETO.version : state.myApp.version;
            state.myApp.userId = window.ZEPETO ? window.ZEPETO.userInfo.userId : state.myApp.userId;
            state.myApp.duid = (window.ZEPETO && window.ZEPETO.duid) ? window.ZEPETO.duid : state.myApp.duid;
            state.myApp.deviceId = (window.ZEPETO && window.ZEPETO.duid) ? window.ZEPETO.duid : state.myApp.deviceId;
            state.myApp.userAgent = (window.ZEPETO && window.ZEPETO.userAgent) ? window.ZEPETO.userAgent : state.myApp.userAgent;
        },
        SetConfig({commit}, config) {
            commit('SET_CONFIG', config)
        },
        SetFrist({commit}, status) {
            commit('SET_FRIST', status)
        }
    }
}

export default app
