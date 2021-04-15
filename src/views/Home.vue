<template>
    <section id="home" v-if="homeData.length>0">
        <!--:style="{'backgroundImage':`url(${activityData.homeBg})`}"-->
        <header>
            <div class="imgBox">
                <!--预加载主图-->
                <div class="homeBgBox">
                    <img :src="activityData.homeBg" alt="" class="bgImg">
                    <div class="hxnfBox" v-if="activityData.boxId===9 || activityData.boxId===10">
                        <img src="@/resource/imgs/i5/hxnf_clips.png" alt="">
                    </div>
                    <div class="clipBox zxyBox" v-if="activityData.boxId === 11"></div>
                    <div class="clipBox ymzBox" v-if="activityData.boxId === 12"></div>
                </div>
            </div>
            <div class="reviewBox" @click.passive="showDialogFun">
                <span>抽奖卡</span><span>{{ticketNum}}</span>
                <img src="@/resource/imgs/ic_addTicket.png" alt="">
            </div>
            <div class="swiperBox">
                <swiper ref="mySwiper" :options="swiperOptions" @slideChangeTransitionEnd="slideChange">
                    <swiper-slide v-for="(list,index) in swiperList" :key="index">
                        <img :src="list.src" alt="">
                    </swiper-slide>
                </swiper>
            </div>
        </header>
        <main>
            <ul class="itemGroup">
                <li class="itemBox" v-for="(item,index) in activityData.itemList" :key="index"
                    :style="{backgroundImage:`url(${item.imgUrl})`}" @click="jumpHref(item.itemId)">
                    <img src="@/resource/imgs/bridge_rare.png" alt="" class="rare" v-show="item.itemType===2">
                    <img src="@/resource/imgs/bridge_awards.png" alt="" class="rare" v-show="item.itemType===3">
                    <img src="@/resource/imgs/items_own.png" alt="" class="own" v-show="item.isHas === 1">
                </li>
            </ul>
            <ul class="assistGroup">
                <!--<li class="time">剩余:<time>14天59时59分</time></li>-->
                <li class="time">{{activityData.countDown}}</li>
                <li class="progress">
                    <p>收集进度<span>{{activityData.schedule}}</span></p>
                    <ul>
                        <li :style="{width:`${percent}%`}"></li>
                    </ul>
                </li>
            </ul>
        </main>
        <footer>
            <ul v-if="activityData.isEnd === 1">
                <img src="@/resource/imgs/btn_end.png" alt="">
            </ul>
            <ul v-else-if="activityData.isEnd !== 1&&activityData.isComplete === 1" @click="shareFun">
                <img src="@/resource/imgs/btn_share.png" alt="">
            </ul>
            <ul v-else @click="lottery">
                <img src="@/resource/imgs/btn_lottery.png" alt="">
                <li class="corner">{{activityData.isFirst === 1 ? '首抽必中' : (activityData.tenNum === 1 ?
                    "本次必中":`最多抽${activityData.tenNum}次必中`)}}
                </li>
            </ul>
        </footer>
        <!--好友互动按钮-->
        <div class="interaction" v-if="hasNewInvited" @click="showInteractFun">
            <img class="icon" src="../resource/imgs/ic_notice_40@3x.png">
            <span class="txt">你有新的好友互动</span>
            <span class="lookMore">查看</span>
            <img src="../resource/imgs/redDot24@3x.png" class="coner">
        </div>
        <!--<div class="request-loading-component" v-if="isContinue">-->
            <!--<div class="toast">-->
                <!--<p class="title">页面出错啦，请刷新重试</p>-->
                <!--<p class="sheet">-->
                    <!--<button @click="closePage">退出</button>-->
                    <!--<button @click="refresh">刷新</button>-->
                <!--</p>-->
            <!--</div>-->
        <!--</div>-->
        <!--任务列表-->
        <CouponDialog1 :isShow="showDialog" @showHelps="showHelps" @close="closeDialog"/>
        <!--邀请列表-->
        <HelpList :showHelpList="showHelpList" @close="showHelpList=false" @showOther="showOther"/>
        <!--邀请其他-->
        <InviteInput :inviteConfig="inviteConfig" @close="inviteConfig.flag=0"/>
        <!--助力通知-->
        <!--<HelpNotice :helpConfig="helpConfig" @close="helpConfig.flag=0" @makeHelp="makeHelp"/>-->
        <Box :boxContent="boxContent" @close="boxContent.flag=false" @tryWear="tryWear" @saveImg="shareFun"/>
        <LuckyBLoading :luckyConfig="luckyConfig"/>
        <canvas ref="myCanvas" style="position: absolute;top:-999rem;right:999rem;width:375px;height:667px;" width="750"
                height="1334"></canvas>

        <TinderBox v-if="showInteract" @updateTicketNum="updateTicketNum" @inviteFun="toInviteFun" @close="closeFun"
                   @showCancelAll="showCancelAll"/>
        <ul class="request-loading-component" v-if="showCancelAllLayer">
            <li class="cancelAll">
                <h3>是否全部拒绝好友助力?</h3>
                <p>若不拒绝，助力提醒将不会失效</p>
                <div class="btns">
                    <button @click="callcelAllLayer">保留</button>
                    <button @click="callcelAll">全部拒绝</button>
                </div>
            </li>
        </ul>

    </section>
</template>

<script>
    // @ is an alias to /src
    import userApi from '@/api/user'
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import {proLoadImg} from '@/utils/common'
    import Box from "@/components/Box";
    import CouponDialog1 from "@/components/CouponDialog1";
    import HelpList from "@/components/HelpList";
    import LuckyBLoading from "@/components/LuckyBLoading";
    // import HelpNotice from "@/components/HelpNotice";
    import InviteInput from "@/components/InviteInput.vue";
    import TinderBox from "@/components/TinderBox.vue";

    // 合并home接口的数据,对应主图和奖品按钮图
    let assignData = [
        {
            homeBg: require('../resource/imgs/i6/homeBG_g_zxy.jpg'),
            itemList: [
                {imgUrl: require('../resource/imgs/i6/items_g_cloth@3x.png')},
                {imgUrl: require('../resource/imgs/i6/items_g_shoulder@3x.png')},
                {imgUrl: require('../resource/imgs/i6/items_g_hair@3x.png')},
                {imgUrl: require('../resource/imgs/i6/items_g_shoes@3x.png')},
                {imgUrl: require('../resource/imgs/i6/items_g_earring@3x.png')},
                {imgUrl: require('../resource/imgs/i6/items_g_headwear@3x.png')}
            ]
        },
        {
            homeBg: require('../resource/imgs/i6/homeBG_b_ymz.jpg'),
            itemList: [
                {imgUrl: require('../resource/imgs/i6/items_b_cloth@3x.png')},
                {imgUrl: require('../resource/imgs/i6/items_b_hair@3x.png')},
                {imgUrl: require('../resource/imgs/i6/items_b_painting@3x.png')},
                {imgUrl: require('../resource/imgs/i6/items_b_earring@3x.png')},
                {imgUrl: require('../resource/imgs/i6/items_b_shoes@3x.png')},
                {imgUrl: require('../resource/imgs/i6/items_b_socks@3x.png')},
            ]
        },
        {
            homeBg: require('../resource/imgs/i5/homeBG_g_hxnf.jpg'),
            itemList: [
                {imgUrl: require('../resource/imgs/i5/items_g_cloth@3x.png')},
                {imgUrl: require('../resource/imgs/i5/items_g_hair@3x.png')},
                {imgUrl: require('../resource/imgs/i5/items_g_headwear@3x.png')},
                {imgUrl: require('../resource/imgs/i5/items_g_lens@3x.png')},
                {imgUrl: require('../resource/imgs/i5/items_g_shoes@3x.png')},
                {imgUrl: require('../resource/imgs/i5/items_g_earring@3x.png')}
            ]
        },
        {
            homeBg: require('../resource/imgs/i5/homeBG_b_zpst.jpg'),
            itemList: [
                {imgUrl: require('../resource/imgs/i5/items_b_top@3x.png')},
                {imgUrl: require('../resource/imgs/i5/items_b_btm@3x.png')},
                {imgUrl: require('../resource/imgs/i5/items_b_headwear@3x.png')},
                {imgUrl: require('../resource/imgs/i5/items_b_hair@3x.png')},
                {imgUrl: require('../resource/imgs/i5/items_b_glove@3x.png')},
                {imgUrl: require('../resource/imgs/i5/items_b_shoes@3x.png')},
            ]
        }
    ];
    // 抽奖后的部件
    let itemIdToImg = {
        // i6
        'CN_DR_618': {imgSrc: '/i6/prizes/items_g_cloth_640.png', title: '运气爆棚! 获得套装', subTitle: '请稍后前往「礼物盒」领取'},
        'CN_SHOULDER_5': {imgSrc: '/i6/prizes/items_g_shoulder_640.png', title: '运气爆棚! 获得肩饰', subTitle: '请稍后前往「礼物盒」领取'},
        'CN_F_HAIR_65': {imgSrc: '/i6/prizes/items_g_hair_640.png',title: '运气爆棚! 获得头发',subTitle: '请稍后前往「礼物盒」领取'},
        'CN_SH_444': {imgSrc: '/i6/prizes/items_g_shoes_640.png', title: '运气爆棚! 获得鞋子', subTitle: '请稍后前往「礼物盒」领取'},
        'CN_EARRING_30': {imgSrc: '/i6/prizes/items_g_earring_640.png',title: '运气爆棚! 获得耳环',subTitle: '请稍后前往「礼物盒」领取'},
        'CN_HEADWEAR_150': {imgSrc: '/i6/prizes/items_g_headwear_640.png', title: '运气爆棚! 获得头饰', subTitle: '请稍后前往「礼物盒」领取'},

        'CN_DR_620': {imgSrc: '/i6/prizes/items_b_cloth_640.png', title: '运气爆棚! 获得套装', subTitle: '请稍后前往「礼物盒」领取'},
        'CN_M_HAIR_40': {imgSrc: '/i6/prizes/items_b_hair_640.png', title: '运气爆棚! 获得头发', subTitle: '请稍后前往「礼物盒」领取'},
        'CN_PAINTING_4': {imgSrc: '/i6/prizes/items_b_painting_640.png', title: '运气爆棚! 获得彩绘', subTitle: '请稍后前往「礼物盒」领取'},
        'CN_EARRING_31': {imgSrc: '/i6/prizes/items_b_earring_640.png', title: '运气爆棚! 获得耳环', subTitle: '请稍后前往「礼物盒」领取'},
        'CN_SH_445': {imgSrc: '/i6/prizes/items_b_shoes_640.png', title: '运气爆棚! 获得鞋子', subTitle: '请稍后前往「礼物盒」领取'},
        'CN_SOX_38': {imgSrc: '/i6/prizes/items_b_socks_640.png',title: '运气爆棚! 获得袜子',subTitle: '请稍后前往「礼物盒」领取'},
        // i5
        'CN_DR_617': {imgSrc: '/i5/prizes/items_g_cloth_640.png', title: '运气爆棚! 获得套装', subTitle: '请稍后前往「礼物盒」领取'},
        'CN_F_HAIR_64': {imgSrc: '/i5/prizes/items_g_hair_640.png', title: '运气爆棚! 获得发型', subTitle: '请稍后前往「礼物盒」领取'},
        'CN_HEADWEAR_148': {imgSrc: '/i5/prizes/items_g_headwear_640.png',title: '运气爆棚! 获得头饰',subTitle: '请稍后前往「礼物盒」领取'},
        'CN_LENS_1': {imgSrc: '/i5/prizes/items_g_lens_640.png', title: '运气爆棚! 获得美瞳', subTitle: '请稍后前往「礼物盒」领取'},
        'CN_SH_442': {imgSrc: '/i5/prizes/items_g_shoes_640.png', title: '运气爆棚! 获得鞋子', subTitle: '请稍后前往「礼物盒」领取'},
        'CN_EARRING_29': {imgSrc: '/i5/prizes/items_g_earring_640.png', title: '运气爆棚! 获得耳环', subTitle: '请稍后前往「礼物盒」领取'},

        'CN_TOP_442': {imgSrc: '/i5/prizes/items_b_top_640.png', title: '运气爆棚! 获得上装', subTitle: '请稍后前往「礼物盒」领取'},
        'CN_BTM_125': {imgSrc: '/i5/prizes/items_b_painting_640.png', title: '运气爆棚! 获得下装', subTitle: '请稍后前往「礼物盒」领取'},
        'CN_HEADWEAR_149': {imgSrc: '/i5/prizes/items_b_headwear_640.png',title: '运气爆棚! 获得头饰',subTitle: '请稍后前往「礼物盒」领取'},
        'CN_M_HAIR_39': {imgSrc: '/i5/prizes/items_b_hair_640.png', title: '运气爆棚! 获得发型', subTitle: '请稍后前往「礼物盒」领取'},
        'CN_GLOVE_14': {imgSrc: '/i5/prizes/items_b_glove_640.png', title: '运气爆棚! 获得手套', subTitle: '请稍后前往「礼物盒」领取'},
        'CN_SH_443': {imgSrc: '/i5/prizes/items_b_shoes_640.png', title: '运气爆棚! 获得鞋子', subTitle: '请稍后前往「礼物盒」领取'},
    };

    // 分享的对应素材， 抽奖的动画素材，套装集齐图片素材(完成图)
    let boxToImg = {
        '11': {
            imgSrc: '/i6/prizes/img_CardZxy_done@2x.png',
            title: '达成套装集齐成就!',
            subTitle: '仲夏夜',
            shareSrc: '/i6/img_share_zxy.jpg',
            luckyBoxBody: '/i6/boxBody_zxy.png',
            lickyBoxTop: '/i6/boxTop_zxy.png'
        },
        '12': {
            imgSrc: '/i6/prizes/img_CardYmz_done@2x.png',
            title: '达成套装集齐成就!',
            subTitle: '月冥者',
            shareSrc: '/i6/img_share_ymz.jpg',
            luckyBoxBody: '/i6/boxBody_ymz.png',
            lickyBoxTop: '/i6/boxTop_ymz.png'
        },
        '9': {
            imgSrc: '/i5/prizes/img_CardHxnf_done@2x.png',
            title: '达成套装集齐成就!',
            subTitle: '花信宁芙',
            shareSrc: '/i5/img_share_hxnf.jpg',
            luckyBoxBody: '/i5/boxBody_hxnf.png',
            lickyBoxTop: '/i5/boxTop_hxnf.png'
        },
        '10': {
            imgSrc: '/i5/prizes/img_CardZpst_done@2x.png',
            title: '达成套装集齐成就!',
            subTitle: '战魄塞提',
            shareSrc: '/i5/img_share_zpst.jpg',
            luckyBoxBody: '/i5/boxBody_zpst.png',
            lickyBoxTop: '/i5/boxTop_zpst.png'
        }
    };

    export default {
        name: 'home',
        data() {
            return {
                isContinue: 0,
                swiperOptions: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                    centeredSlides: true,
                    clickable: true,
                    slideToClickedSlide: true
                },
                homeData: [],
                activityIndex: 0,
                ticketNum: '',
                // 任务列表 开关
                showDialog: false,
                boxContent: {
                    flag: false,
                    title: '',
                    subTitle: '',
                    imgSrc: ''
                },
                luckyConfig: {
                    isShowBLoading: false,
                    BoxBody: '',
                    BoxTop: ''
                },
                // swiperBox
                swiperList: [
                    {src: require('@/resource/imgs/i6/box_zxy@3x.png')},
                    {src: require('@/resource/imgs/i6/box_ymz@3x.png')},
                    {src: require('@/resource/imgs/i5/box_hxnf@3x.png')},
                    {src: require('@/resource/imgs/i5/box_zpst@3x.png')}
                ],
                inviteConfig: {
                    flag: 0,
                },
                // 任务别表
                showHelpList: false,
                hasNewInvited: false,
                // 互动弹窗
                showInteract: false,
                showCancelAllLayer: false
            }
        },
        components: {
            CouponDialog1, Box, LuckyBLoading, HelpList, InviteInput, TinderBox
        },
        created() {
            this.init();
        },
        methods: {
            ...mapActions(['SetLoading', 'SetNetwork', 'SetSign','SetToast']),
            ...mapMutations(['SetGoldContent3', 'setItemBoxContent', 'setInviteTip', 'setInviteSuccess']),

            init: async function () {
                //  首页加载pv
                // eslint-disable-next-line
                _html({e: "lottery.home", bk: this.myApp.userId, duid: this.myApp.duid});

                try {
                    this.getInitData();
                } catch (e) {
                    console.error(e.message);
                    this.SetLoading({flag: 0, text: '', bg: 'transparent'});
                    this.SetNetwork({flag: 1, message: e.message});
                    setTimeout(() => {
                        this.SetNetwork({flag: 0, message: ''})
                    }, 1800)
                }

            },
            closePage() {
                window.location.href = 'ZEPETO://WEBVIEW/CLOSE';
            },
            refresh() {
                location.replace(document.referrer);
            },
            jumpHref(itemId) {
                _html({e: "lottery.ItemClick", bk: this.myApp.userId, duid: this.myApp.duid});
                window.location.href = `https://zzz-ootd.zepeto.cn/item/${itemId}`;
            },
            slideChange() {
                _html({e: "lottery.PackageSelect", bk: this.myApp.userId, duid: this.myApp.duid});
                this.activityIndex = this.swiper.activeIndex;
            },
            async lottery() {
                _html({e: "lottery.Lottery", bk: this.myApp.userId, duid: this.myApp.duid});
                if (this.ticketNum === 0) {
                    this.showDialog = true;
                } else {
                    const {boxId} = this.activityData;
                    const {luckyBoxBody, lickyBoxTop} = boxToImg[boxId];
                    this.luckyConfig.isShowBLoading = true;
                    this.luckyConfig.BoxBody = require(`@/resource/imgs${luckyBoxBody}`);
                    this.luckyConfig.BoxTop = require(`@/resource/imgs${lickyBoxTop}`);

                    let featherPromise = new Promise((resolve) => {
                        setTimeout(() => {
                            resolve()
                        }, 1000)
                    });
                    Promise.all([featherPromise, userApi.lottery({
                        boxId: this.activityData['boxId'],
                        isFirst: this.activityData['isFirst']
                    })]).then(([, lotteryRes]) => {
                        this.luckyConfig.isShowBLoading = false;
                        const {code, result} = lotteryRes;
                        if (code !== 200) throw Error();
                        const {boxId, type, itemId, isAll, coinNum} = result;
                        // const {boxId,type,itemId,isAll,coinNum} = {isAll: 2,
                        //     itemId: "CN_SOX_37",
                        //     schedule: "1/6",
                        //     type: 2,
                        //     boxId: 2};
                        if (type === 1) {
                            // 金币
                            _html({e: "lottery.CoinPop", bk: this.myApp.userId, duid: this.myApp.duid});
                            this.SetGoldContent3({flag: 1, count: coinNum})
                        } else if (type === 2) {
                            if (isAll === 1) {
                                // 套装集齐
                                _html({e: "lottery.CompletePop", bk: this.myApp.userId, duid: this.myApp.duid});
                                let targetImg = boxToImg[boxId];
                                let imgSrc = require(`@/resource/imgs${targetImg['imgSrc']}`);
                                this.boxContent.flag = true;
                                this.boxContent.title = targetImg.title;
                                this.boxContent.subTitle = targetImg.subTitle;
                                this.boxContent.imgSrc = imgSrc;
                            } else {
                                _html({e: "lottery.ItemPop", bk: this.myApp.userId, duid: this.myApp.duid});
                                let targetPrize = itemIdToImg[itemId];
                                let imgSrc = require(`@/resource/imgs${targetPrize['imgSrc']}`);
                                this.setItemBoxContent({
                                    flag: true,
                                    title: targetPrize['title'],
                                    subTitle: '请稍后前往「礼物盒」领取',
                                    imgSrc: imgSrc
                                })
                            }
                        }
                        this.getInitData();
                    }).catch((e) => {
                        console.error(e.message);
                        this.SetLoading({flag: 0, text: '', bg: 'transparent'});
                        this.SetNetwork({flag: 1, message: '抽奖失败'});
                        setTimeout(() => {
                            this.SetNetwork({flag: 0, message: ''})
                        }, 1800)
                    })
                }
            },
            shareFun() {
                _html({e: "lottery.HomeShare", bk: this.myApp.userId, duid: this.myApp.duid});
                let that = this;
                this.SetLoading({flag: 1, text: '', bg: 'transparent'});
                this.$nextTick(async () => {
                    const myCanvas = this.$refs.myCanvas;
                    const ctx = myCanvas.getContext('2d');
                    const boxId = this.activityData['boxId'];
                    const targetPrize = boxToImg[boxId];
                    const imgSrc = require(`@/resource/imgs${targetPrize['shareSrc']}`);
                    const codeSrc = require(`@/resource/imgs/code.png`);
                    try {
                        const [BgImg, ProImg, CodeImg] = await Promise.all([proLoadImg(imgSrc), proLoadImg(this.myApp.profilePic), proLoadImg(codeSrc)]);
                        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
                        // 绘制背景
                        ctx.drawImage(BgImg, 0, 0, BgImg.naturalWidth, BgImg.naturalHeight, 0, 0, myCanvas.width, myCanvas.height);
                        // 绘制头像
                        ctx.save();
                        ctx.arc(70, 1214, 32, 0, Math.PI * 2);
                        ctx.clip();
                        ctx.drawImage(ProImg, 0, 0, ProImg.naturalWidth, ProImg.naturalHeight, 38, 1182, 64, 64);
                        ctx.restore();
                        // 绘制二维码
                        ctx.drawImage(CodeImg, 0, 0, CodeImg.naturalWidth, CodeImg.naturalHeight, 590, 1180, 132, 132);
                        // 绘制名称和崽崽Code
                        ctx.fillStyle = "#ffffff";
                        ctx.font = '600 28px PingFangSC-Semibold, PingFang SC';
                        ctx.textBaseline = "top";
                        let name = this.myApp.nickName.length > 10 ? `${this.myApp.nickName.slice(0, 10)}...` : this.myApp.nickName;
                        ctx.fillText(name, 120, 1180);
                        ctx.fillText(this.myApp.zzId, 120, 1214);
                        const base64 = myCanvas.toDataURL('image/jpeg');
                        window.ZEPETO.invoke('SaveImage', base64.substring(base64.indexOf(',') + 1), function () {
                            that.SetLoading({flag: 0, text: '', bg: 'transparent'});
                            setTimeout(() => {
                                that.SetSign({flag: 1, txt: '分享图已保存⾄⼿机相册'})
                            }, 100)
                            setTimeout(() => {
                                that.SetSign({flag: 0, txt: ''})
                            }, 1800)
                        })
                    } catch (e) {
                        console.error(e);
                        that.SetNetwork({flag: 1, message: '保存图片失败'});
                        setTimeout(() => {
                            this.SetNetwork({flag: 0, message: ''})
                        }, 1800)
                    }
                })
            },
            async closeDialog() {
                try {
                    let ticketRet = await userApi.getTicketNum();
                    const {code, result} = ticketRet;
                    if (code !== 200) throw Error('获取抽奖券数量失败');
                    this.ticketNum = result;
                    this.showDialog = false;
                } catch (e) {
                    console.error(e.message);
                    this.SetNetwork({flag: 1, message: e.message});
                    setTimeout(() => {
                        this.SetNetwork({flag: 0, message: ''})
                    }, 1800)
                }
            },
            // 显示助力弹窗列表
            async showHelps() {
                try {
                    this.showHelpList = true;
                    let ticketRet = await userApi.getTicketNum();
                    const {code, result} = ticketRet;
                    if (code !== 200) throw Error('获取抽奖券数量失败');
                    this.ticketNum = result;
                    this.showDialog = false;
                } catch (e) {
                    console.error(e.message);
                    this.SetNetwork({flag: 1, message: e.message});
                    setTimeout(() => {
                        this.SetNetwork({flag: 0, message: ''})
                    }, 1800)
                }
            },
            async getInitData() {
                /**
                 * 获取抽奖数据 并合并本地数据
                 */
                const homeData = await userApi.getHomeData(6);

                const {code, result: {homeList: homeResult, hasNewInvited}} = homeData;
                if (code !== 200) throw Error(homeData.message);
                // 是否显示"好友动态提示"按钮
                this.hasNewInvited = hasNewInvited;
                // this.hasNewInvited = true;
                for (let i = 0; i < homeResult.length; i++) {
                    for (let j = 0; j < homeResult[i]['itemList'].length; j++) {
                        homeResult[i]['itemList'][j] = {...assignData[i]['itemList'][j], ...homeResult[i]['itemList'][j]}
                    }
                    homeResult[i] = {...assignData[i], ...homeResult[i]}
                }
                this.homeData = homeResult;
                this.ticketNum = homeResult[0]['ticketNum'];
                this.SetLoading({flag: 0, text: '', bg: 'transparent'});
            },
            tryWear() {
                _html({e: "lottery.CompletePop.Try", bk: this.myApp.userId, duid: this.myApp.duid});
                window.location.href = 'ZEPETO-CN://HOME/NOTIFICATIONS/GIFTBOX';
                setTimeout(() => {
                    window.location.href = 'ZEPETO://WEBVIEW/CLOSE';
                }, 400)
            },
            // 显示任务列表弹窗
            showDialogFun() {
                _html({e: "lottery.Ticket", bk: this.myApp.userId, duid: this.myApp.duid});
                this.showDialog = true
            },
            // 显示邀请其他人
            showOther() {
                this.inviteConfig.flag = 1
            },

            showInteractFun() {
                // 显示好友互动弹窗，隐藏"好友动态提示"
                this.showInteract = true;
                this.hasNewInvited = false;
                _html({e: "lottery.Notice", bk: this.myApp.userId, duid: this.myApp.duid});
            },

            toInviteFun() {
              // 关闭当前弹窗，显示邀请列表页面
              this.showInteract = false;
              this.showHelpList = true;
              _html({e: "lottery.Notice.Invite", bk: this.myApp.userId, duid: this.myApp.duid});
            },
            closeFun() {
                this.showInteract = false;
            },
            async callcelAll() {
                // 全部拒绝
                try {
                    const {code} = await userApi.cancelAllHelp();
                    if (code !== 200) throw Error('全部拒绝助力失败');

                    // 管理当前弹窗
                    this.showCancelAllLayer = false;
                    this.showInteract = false;

                    this.SetToast({flag: 1, text: '已全部拒绝助⼒'});
                    setTimeout(() => {
                        this.SetToast({flag: 0, text: ''})
                    }, 1800);

                } catch (e) {
                    this.SetNetwork({flag: 1, message: e.message});
                    setTimeout(() => {
                        this.SetNetwork({flag: 0, message: ''});
                    }, 1800)
                }
            },
            callcelAllLayer(){
                this.showCancelAllLayer=false;
                this.showInteract=false;
                this.getInitData();
            },
            async updateTicketNum() {
                // 更新当前的抽奖卡数
                try {
                    let ticketRet = await userApi.getTicketNum();
                    const {code, result} = ticketRet;
                    if (code !== 200) throw Error('获取抽奖券数量失败');
                    this.ticketNum = result;
                } catch (e) {
                    this.SetNetwork({flag: 1, message: e.message});
                    setTimeout(() => {
                        this.SetNetwork({flag: 0, message: ''})
                    }, 1800)
                }
            },
            showCancelAll() {
                this.showCancelAllLayer = true;
            }
        },
        computed: {
            ...mapGetters(['myApp', 'config', 'userInfo', 'isFrist', 'bigScreen']),
            swiper() {
                return this.$refs.mySwiper.$swiper
            },
            activityData() {
                if (this.homeData[this.activityIndex]) return this.homeData[this.activityIndex]
                else return [];
            },
            percent() {
                let per = this.activityData.schedule.split('/');
                return ((per[0] / per[1]) * 100).toFixed(0)
            }
        }
    }
</script>
<style lang="scss" scoped>
    #app.big-screen {
        #home {
            footer {
                margin-bottom: 68px;
            }
        }
        .interaction{
            top:88px;
        }
    }

    #home {
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
        max-height: 1624px;
        display: flex;
        flex-direction: column;
        header {
            flex: 1;
            height: 0;
            background-repeat: no-repeat;
            background-position: 0 center;
            background-size: 100% auto;
            box-shadow: 0 10px 40px 0 rgba(1, 31, 69, 0.1);
            border-radius: 0 0 40px 40px;
            position: relative;

            .imgBox {
                width: 100%;
                height: 100%;
                box-shadow: 0 10px 40px 0 rgba(1, 31, 69, 0.1);
                border-radius: 0 0 40px 40px;
                overflow: hidden;
                .homeBgBox {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    display: flex;
                    align-items: center;
                    .bgImg {
                        width: 100%;
                    }
                    /*
                    .lhBox {
                        width: 750px;
                        height: 480px;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-5%);
                        background-image: url("../resource/imgs/i3/lh_clips.png");
                        background-repeat: no-repeat;
                        background-size: 100% auto;
                        background-position: 0 0;
                        animation: fadeLh steps(1, end) 1.8s infinite;
                    }
                    .lhBox1 {
                        transform: translateY(-15%);
                    }
                   */
                    .hxnfBox {
                        width: 750px;
                        height: 975px;
                        position: absolute;
                        left: 0;
                        top: 0;
                        img {
                            width: 100%;
                            animation: fadeHxnf 3.2s 1s infinite;
                        }
                    }
                    .clipBox{
                        width: 750px;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                    .zxyBox{
                        height: 697px;
                        background-image: url("../resource/imgs/i6/zxy_clips.png");
                        background-repeat: no-repeat;
                        background-size: 100% auto;
                        background-position: 0 0;
                        animation: fadeZxy steps(1, end) 0.9s infinite;
                    }
                    .ymzBox{
                        height: 435px;
                        background-image: url("../resource/imgs/i6/ymz_clips.png");
                        background-repeat: no-repeat;
                        background-size: 100% auto;
                        background-position: 0 0;
                        animation: fadeYmz steps(1, end) 0.9s infinite;
                    }
                }
            }

            .reviewBox {
                height: 64px;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 36px 0 0 36px;
                position: absolute;
                bottom: 200px;
                right: 0;
                font-size: 24px;
                font-weight: 500;
                color: #000000;
                display: flex;
                align-items: center;
                padding-left: 48px;
                box-sizing: border-box;
                padding-right: 16px;
                z-index: 2;
                span:nth-of-type(2) {
                    font-size: 30px;
                    font-weight: bold;
                    color: #6332F8;
                    margin-left: 6px;
                    margin-top: 4px;
                }
                img {
                    width: 64px;
                    height: 64px;
                    position: absolute;
                    left: -20px;
                    top: -10px;
                }
            }
            .swiperBox {
                height: 158px;
                position: absolute;
                bottom: -36px;
                left: 0;
                right: 0;
                .swiper-slide {
                    position: relative;
                    font-size: 0;
                    img {
                        height: 158px;
                    }
                    transition: 300ms;
                    transform: scale(0.77);
                }
                .swiper-slide-active {
                    transform: scale(1);
                }
            }
        }
        main {
            width: 670px;
            height: 166px;
            background: #FFFFFF;
            box-shadow: 0 10px 40px 0 rgba(1, 31, 69, 0.1);
            border-radius: 36px;
            margin: 0 auto;
            margin-top: 50px;
            box-sizing: border-box;
            padding: 16px 26px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .itemGroup {
                height: 88px;
                display: flex;
                justify-content: space-between;
                .itemBox {
                    width: 88px;
                    height: 88px;
                    background-repeat: no-repeat;
                    background-size: 100% auto;
                    position: relative;
                    .rare {
                        width: 52px;
                        height: 52px;
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                    .own {
                        width: 88px;
                        height: 88px;
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                }
            }
            .assistGroup {
                display: flex;
                justify-content: space-between;
                box-sizing: border-box;
                padding: 0 4px;
                .time {
                    font-size: 20px;
                    color: #828F9F;
                    time {
                        margin-left: 6px;
                    }
                }
                .progress {
                    display: flex;
                    align-items: center;
                    p {
                        font-size: 20px;
                        color: #828F9F;
                        span {
                            font-weight: 600;
                            color: #6332F8;
                            margin: 0 8px;
                        }
                    }
                    ul {
                        width: 180px;
                        height: 14px;
                        background: #F1F3F8;
                        border-radius: 7px;
                        position: relative;
                        li {
                            width: 0;
                            height: 100%;
                            border-radius: 7px;
                            position: absolute;
                            left: 0;
                            top: 0;
                            background: #6332F8;
                        }
                    }
                }
            }
        }
        footer {
            width: 440px;
            height: 100px;
            margin: 0 auto;
            margin-top: 38px;
            margin-bottom: 20px;
            position: relative;
            img {
                width: 100%;
            }
            .corner {
                height: 34px;
                background: #764EFF;
                border-radius: 17px;
                border: 2px solid #FFFFFF;
                font-weight: 500;
                color: #FFFFFF;
                font-size: 20px;
                line-height: 36px;
                position: absolute;
                top: -8px;
                right: 0;
                padding: 0 14px;
                box-sizing: border-box;
            }
        }
    }

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
            height: 380px;
            margin-top: -200px;
            background-color: #fff;
            border-radius: 40px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 50px 50px;
            box-sizing: border-box;
            .title {
                font-size: 34px;
                color: #323232;
            }
            .sheet {
                display: flex;
                justify-content: space-between;
                font-size: 30px;
                button {
                    width: 256px;
                    height: 100px;
                    border-radius: 50px;
                    font-size: 30px;
                }
                button:nth-of-type(1) {
                    background-color: #f0eff3;
                    color: #323232;
                }
                button:nth-of-type(2) {
                    color: #fff;
                    background-color: #5c46ff;
                }
            }
        }
    }

    .big-screen #home .container .btn-rank {
        top: 204px;
    }

    /*互动*/
    .interaction {
        width: 414px;
        height: 72px;
        background: rgba(255, 255, 255, 0.89);
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.15);
        border-radius: 36px;
        position: fixed;
        z-index: 91;
        left: 36px;
        top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 32px 0 24px;
        box-sizing: border-box;
        .icon {
            width: 40px;
            height: 40px;
        }
        .txt {
            font-size: 26px;
            font-weight: 400;
            color: #000000;
            margin-left: 10px;
            flex:1;
            text-align: left;
        }
        .lookMore {
            font-size: 26px;
            font-weight: 600;
            color: #6332F8;
        }
        .coner {
            width: 24px;
            height: 24px;
            position: absolute;
            right: 0;
            top: 0;
        }
    }

    /*全部拒绝弹窗*/
    .cancelAll {
        width: 590px;
        height: 406px;
        background: #FFFFFF;
        border-radius: 40px;
        h3 {
            height: 44px;
            font-size: 36px;
            font-weight: 600;
            color: #000000;
            line-height: 44px;
            margin-top: 80px;
        }
        p {
            height: 42px;
            font-size: 30px;
            font-weight: 400;
            color: #828F9F;
            line-height: 42px;
            margin-top: 20px;
        }
        .btns {
            width: 494px;
            height: 100px;
            margin: 0 auto;
            margin-top: 60px;
            display: flex;
            justify-content: space-between;
            button {
                width: 236px;
                height: 100px;
                border-radius: 50px;
                box-sizing: border-box;
                font-size: 30px;
                font-weight: 600;
                &:nth-of-type(1) {
                    border: 2px solid #6332F8;
                    background: #ffffff;
                    color: #6332F8;
                }
                &:nth-of-type(2) {
                    background: #6332F8;
                    color: #FFFFFF;
                }
            }
        }
    }

    // 雪花
    /*
    $LhstepHeight: 480px;
    @keyframes fadeLh {
        0% {
            background-position-y: 0;
        }
        11.6% {
            background-position-y: -$LhstepHeight;
        }
        23.2% {
            background-position-y: -2 * $LhstepHeight;
        }
        34.8% {
            background-position-y: -3 * $LhstepHeight;
        }
        46.4% {
            background-position-y: -4 * $LhstepHeight;
        }
        58% {
            background-position-y: -5 * $LhstepHeight;
        }
        70% {
            background-position-y: -6 * $LhstepHeight;
        }
        90% {
            background-position-y: -7 * $LhstepHeight;
        }
        100% {
            background-position-y: -7 * $LhstepHeight;
        }
    }
    */
    @keyframes fadeHxnf {
        0% {
            opacity: 0.1;
        }
        60% {
            opacity: 0.5;
        }
        61% {
            opacity: 0.5;
        }
        100% {
            opacity: 0.1;
        }
    }

    // 蝴蝶, 仲夏夜
    $LhstepHeight: 697px;
    @keyframes fadeZxy {
        0% {
            background-position-y: 0;
        }
        14.28% {
            background-position-y: -$LhstepHeight;
        }
        28.56% {
            background-position-y: -2 * $LhstepHeight;
        }
        42.84% {
            background-position-y: -3 * $LhstepHeight;
        }
        57.12% {
            background-position-y: -4 * $LhstepHeight;
        }
        71.4% {
            background-position-y: -5 * $LhstepHeight;
        }
        85.68% {
            background-position-y: -6 * $LhstepHeight;
        }
        100% {
            background-position-y: -7 * $LhstepHeight;
        }
    }
    $LhstepHeight: 435px;
    @keyframes fadeYmz {
        0% {
            background-position-y: 0;
        }
        14.28% {
            background-position-y: -$LhstepHeight;
        }
        28.56% {
            background-position-y: -2 * $LhstepHeight;
        }
        42.84% {
            background-position-y: -3 * $LhstepHeight;
        }
        57.12% {
            background-position-y: -4 * $LhstepHeight;
        }
        71.4% {
            background-position-y: -5 * $LhstepHeight;
        }
        85.68% {
            background-position-y: -6 * $LhstepHeight;
        }
        100% {
            background-position-y: -7 * $LhstepHeight;
        }
    }
</style>
