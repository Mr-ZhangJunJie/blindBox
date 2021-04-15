<template>
    <div class="main" v-show="isShow">
        <transition name="bounce">
            <div class="content" v-show="isShowContent">
                <div class="nav1">
                    <h3>做任务得抽奖卡</h3>
                    <img
                            class="close"
                            src="../resource/imgs/ex_popup.png"
                            alt=""
                            @click="hideDialog"
                    />
                </div>
                <div class="mainSide">
                    <div class="card-header">
                        <div class="tip">
                            <img src="../resource/imgs/ic_attention.png" alt=""/><span>完成任务获得抽奖卡，请及时使⽤</span>
                        </div>
                    </div>
                    <div class="card-container">
                        <div class="card-item" v-for="(card, index) in list" :key="index">
                            <div class="card-left">
                                <img :src="card.icon" alt=""/>
                                <div class="ticket-count">{{ card.count }}</div>
                            </div>
                            <div class="card-content">
                                <h4 class="card-title">{{ card.title }}</h4>
                                <p class="card-subtitle">{{ card.subTitle }}</p>
                            </div>

                            <div class="card-right" v-if="card.prop === 'timeStatus'">

                                <a
                                        href="javascript:;"
                                        @click="btnClick(card)"
                                        :class="[
                  'btn',
                  {active: card.status === 2, tip: card.status === 3, disabled: card.status === 4}
                ]"
                                >{{card.btnText}}</a
                                >
                            </div>

                            <div class="card-right" v-else>
                                <a
                                        href="javascript:;"
                                        @click="btnClick(card)"
                                        :class="[
                  'btn',
                  {active: card.status === 2, disabled: card.status === 3}
                ]"
                                >{{ card.status === 2 ? card.btnText : card.actBtnText }}</a
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";
    import userApi from "@/api/user";

    export default {
        name: "CouponDialog1",
        props: {
            isShow: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                // status 按钮的状态 2 为 可点击
                list: [
                    {
                        title: "每日定时领取抽奖卡",
                        icon: require("../resource/imgs/ic_ticket.png"),
                        subTitle: "每日6点/12点/20点各领1次",
                        btnText: "12点再领",
                        actBtnText: "领取",
                        prop: "timeStatus",
                        doneKey:'time',
                        count: 1,
                        status: 1,
                        buriedPoint: '',
                        async handle(card) {
                            if(!this.flag) return;
                            this.flag = false;
                            _html({e: "lottery.Task.Timer", bk: this.myApp.userId, duid: this.myApp.duid});

                            if(card.status !== 2) return;
                            try {
                                const finishTask = await userApi.finishList(card.doneKey);
                                const {code} = finishTask;
                                if(code !== 200) throw Error('领取抽奖卡失败');
                                this.flag = true;
                                this.SetSign({flag: 1, txt: '恭喜获得1张抽奖卡'});
                                if(0<=this.hour&&this.hour<6){
                                    card['btnText'] = '6点再领';
                                    card['status'] = 3;
                                }else if(6<=this.hour&&this.hour<12){
                                    card['btnText'] = '12点再领';
                                    card['status'] = 3;
                                }else if(12<=this.hour&&this.hour<20){
                                    card['btnText'] = '20点再领';
                                    card['status'] = 3;
                                }else if(20<=this.hour){
                                    card['btnText'] = '明日再来';
                                    card['status'] = 4;
                                }
                            }catch (e) {
                                console.error(e);
                                this.flag = true;
                                this.SetNetwork({flag:1,message:e.message});
                                setTimeout(()=>{
                                    this.SetNetwork({flag: 0, message: ''})
                                },1800)
                            }

                        }
                    },
                    {
                        title: "邀请好友助力(0/3)",
                        icon: require("../resource/imgs/ic_ticket.png"),
                        subTitle: "邀请好友助力1次得2张抽奖卡",
                        btnText: "去邀请",
                        actBtnText: "明日再来",
                        prop: "helpStatus",
                        count: 6,
                        status: 2,
                        buriedPoint: 'Assist',
                        doneKey: 'help',
                        handle(card) {
                            // eslint-disable-next-line
                            _html({
                                e: "lottery.Task.click",
                                bk: this.myApp.userId,
                                duid: this.myApp.duid,
                                args: {TaskID: card['buriedPoint'], Finished: card['status'] != 3 ? 0 : 1}
                            });

                            // 关闭当前列表
                            if(card.status !== 3){
                                this.$emit('showHelps')
                            }
                        }
                    },
                    {
                        title: "去玩一玩【穿搭赛】",
                        icon: require("../resource/imgs/ic_ticket.png"),
                        subTitle: "参与评审可得2张抽奖卡",
                        btnText: "去评审",
                        actBtnText: "再看看",
                        prop: "pkStatus",
                        count: 2,
                        status: 2,
                        buriedPoint: 'PK',
                        doneKey:'pk',
                        handle() {
                            // window.location.href = 'https://lnk0.com/easylink/ELQxFJBt'
                            window.location.href = 'https://h5-act.kajicam.com/zepeto/dresspk/v2.1/index.html'
                        }
                    },
                    {
                        title: "去点一点【CP匹配】",
                        icon: require("../resource/imgs/ic_ticket.png"),
                        subTitle: "点击喜欢可得2张抽奖卡",
                        btnText: "去匹配",
                        actBtnText: "再看看",
                        prop: "matchStatus",
                        count: 2,
                        status: 2,
                        buriedPoint: 'Match',
                        doneKey:'match',
                        handle() {
                            // window.location.href = 'https://lnk0.com/easylink/ELFJd0kk';
                            window.location.href = 'https://act-beijing.zepeto.cn/match/v1/index.html';
                        }
                    },
                    {
                        title: "去世界来一场跑酷竞技赛",
                        icon: require("../resource/imgs/ic_ticket.png"),
                        subTitle: "进入世界房间可得1张抽奖卡",
                        btnText: "去转转",
                        actBtnText: "再看看",
                        prop: "worldStatus",
                        count: 1,
                        status: 2,
                        buriedPoint: 'World',
                        doneKey:'world',
                        handle() {
                            window.location.href = "zepeto-cn://HOME/MENU/WORLD?mapinfo=map/Game_Jump";
                            setTimeout(() => {
                                window.location.href = 'ZEPETO://WEBVIEW/CLOSE';
                            }, 400)
                        }
                    },
                    {
                        title: "去试一试【拍同款】",
                        icon: require("../resource/imgs/ic_ticket.png"),
                        subTitle: "拍同款视频可得1张抽奖卡",
                        btnText: "去拍摄",
                        actBtnText: "再看看",
                        prop: "vlogStatus",
                        count: 1,
                        status: 2,
                        buriedPoint: 'VLOG',
                        doneKey:'vlog',
                        handle() {
                            window.location.href = "ZEPETO-CN://zaizai?tagName=hot";
                        }
                    },
                    {
                        title: "邀请新朋友来玩崽崽",
                        icon: require("../resource/imgs/ic_ticket.png"),
                        subTitle: "每邀请1名新朋友可得10张抽奖卡",
                        btnText: "去邀请",
                        actBtnText: "去邀请",
                        prop: "inviteStatus",
                        count: 10,
                        status: 2,
                        buriedPoint: 'Invite',
                        doneKey:'invite',
                        handle() {
                            // window.location.href = 'https://lnk0.com/easylink/ELA1EBRd';
                            window.location.href = 'https://h5-act.kajicam.com/zepeto/2020/invite_v4/index.html';
                        }
                    }
                ],
                isShowContent: false,
                flag: true,
                hour:'',
            };
        },
        computed: {
            ...mapGetters(["myApp", "userInfo", "bigScreen"]),
        },
        methods: {
            ...mapActions(["SetNetwork", "SetSign", "SetToast"]),

            /**
             * 获取任务数据
             * @returns {Promise<void>}
             */
            async getData() {
                // 初始化第一个任务列表状态
                try {
                    const {code, result} = await userApi.getQuestList();
                    // const {code, result} = {code:200,result:{feedStatus: 2,
                    //         hour: 5,
                    //         timeStatus: 2,
                    //         matchStatus: 2,
                    //         pkStatus: 2,
                    //         vlogStatus: 2,
                    //         worldStatus: 2}};
                    if(code !== 200) throw Error('获取任务状态失败');
                    let {hour,timeStatus,helpStatus,...otherStatus} = result;
                    this.hour = hour;
                    /**
                     * 设置领取抽奖券按钮状态,领取比较特殊
                      */
                    if(timeStatus === 1){
                        if(0<=hour&&hour<6){
                            this.list[0]['btnText'] = '6点再领';
                            this.list[0]['status'] = 3;
                        }else if(6<=hour&&hour<12){
                            this.list[0]['btnText'] = '12点再领';
                            this.list[0]['status'] = 3;
                        }else if(12<=hour&&hour<20){
                            this.list[0]['btnText'] = '20点再领';
                            this.list[0]['status'] = 3;
                        }else if(20<=hour){
                            this.list[0]['btnText'] = '明日再来';
                            this.list[0]['status'] = 4;
                        }
                    }else{
                        if(0<=hour&&hour<6){
                            this.list[0]['btnText'] = '6点再领';
                            this.list[0]['status'] = 3;
                        }else{
                            this.list[0]['btnText'] = '领取';
                            this.list[0]['status'] = 2;
                        }
                    }

                    /**
                     *  邀请好友助力
                     */
                     this.list[1]['title'] = `邀请好友助力(${helpStatus}/3)`;
                     if(helpStatus === 3){
                         this.list[2]['status'] = 3;
                     }

                    /**
                     * 其他状态  timeStatus 特殊，   helpStatus ，inviteStatus  没有完成状态
                     */
                     this.list.forEach(item=>{
                         if(item.prop !== 'timeStatus' && item.prop !== 'helpStatus'&& item.prop !== 'inviteStatus'){
                             item['status'] = otherStatus[item['prop']]
                         }
                     })

                }catch (e) {
                    console.error(e.message);
                    this.SetNetwork({flag:1,message:e.message});
                    setTimeout(()=>{
                        this.SetNetwork({flag: 0, message: ''})
                    },1800)
                }
            },

            /**
             * 关闭任务弹窗
             */
            hideDialog() {
                this.isShowContent = false;
                setTimeout(() => {
                    this.$emit("close");
                }, 600);
            },

            /**
             * 按钮点击
             * @param index 索引
             */
            // 1。任务点击统计  没有领取   有邀请好友
            // 2。 邀请好友没有完成
            // 助力和邀请 不用调 完成接口，  PK 和match 是V2，其他的都是  /quest/finish?questType=${questType}
            async btnClick(card) {
                // 禁止明日再来点击
                // eslint-disable-next-line
                if(card.doneKey === 'help' && card['status'] === 3) return;
                // time ， help 点击埋点自己计算

                if (card.doneKey !== 'time' && card.doneKey !== 'help') {
                    if (!this.flag) return;
                    this.flag = false;
                    // eslint-disable-next-line
                    _html({
                        e: "lottery.Task.click",
                        bk: this.myApp.userId,
                        duid: this.myApp.duid,
                        args: {TaskID: card['buriedPoint'], Finished: card['status'] == 2 ? 0 : 1}
                    });
                    if (card.doneKey !== 'invite' && card.status === 2) {
                        try {
                            let finishTask;
                            if (card.doneKey === 'pk' || card.doneKey === 'match') {
                                finishTask = await userApi.finishListv2(card.doneKey);
                            } else {
                                finishTask = await userApi.finishList(card.doneKey);
                                // eslint-disable-next-line
                                _html({
                                    e: "lottery.Task.finish",
                                    bk: this.myApp.userId,
                                    duid: this.myApp.duid,
                                    args: {TaskID: card['buriedPoint'], Finished: 0}
                                });
                            }
                            const {code} = finishTask;
                            if (code !== 200) throw Error('任务完成失败');
                            this.flag = true;
                            card.handle.call(this, card);
                        } catch (e) {
                            this.flag = true;
                            this.SetNetwork({flag: 1, message: e.message});
                            setTimeout(()=>{
                                this.SetNetwork({flag: 0, message: ''})
                            },1800)
                        }
                    } else {
                        this.flag = true;
                        card.handle.call(this, card);
                    }
                } else {
                     card.handle.call(this, card);
                }
            },
        },
        watch: {
            isShow(val) {
                // 弹窗显示后，重新获取任务数据
                if (val) {
                    this.isShowContent = val;
                    this.getData();
                } else {
                    this.isShowContent = val;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .big-screen {
        .nav1 {
            margin-top: 58px;
        }
    }

    .bounce-enter-active {
        animation: static-animate 0.5s;
        .content {
            animation: bounce-up 0.5s;
        }
    }

    .bounce-leave-active {
        animation: static-animate 0.5s reverse;
        .content {
            animation: bounce-up 0.5s reverse;
        }
    }

    @keyframes static-animate {
        0% {
            transform: translateY(100%);
        }
        100% {
            transform: translateY(0);
        }
    }

    @keyframes bounce-up {
        from {
            left: 0;
        }
        to {
            left: 0;
        }
    }

    .main {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 110;
        font-size: 26px;
    }

    .content {
        width: 100vw;
        /*max-height: 100%;*/
        height: 100%;
        position: absolute;
        bottom: 0;
        background: #f9f8f9;
        display: flex;
        flex-direction: column;

        .nav1 {
            height: 112px;
            background: #f9f8f9;
            position: relative;
            flex-basis: 112px;
            h3 {
                font-size: 30px;
                font-weight: 600;
                color: #000000;
                line-height: 112px;
                text-align: center;
            }
            .close {
                width: 36px;
                height: 36px;
                padding: 20px;
                position: absolute;
                right: 16px;
                top: 18px;
                pointer-events:auto;
            }
        }
        .mainSide {
            height: 100%;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            flex: 1;
        }
        .card-header {
            .tip {
                padding-left: 36px;
                height: 64px;
                background: #f4f3f6;
                font-size: 22px;
                font-weight: 400;
                color: #babac0;
                display: flex;
                align-items: center;
                img {
                    width: 22px;
                    height: 22px;
                    margin-right: 6px;
                }
            }
        }
    }
    .card-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #f9f8f9;
        margin-top: 28px;
        .card-item {
            display: flex;
            width: 694px;
            align-items: center;
            justify-content: space-between;
            height: 144px;
            background: #ffffff;
            box-shadow: 0 1px 14px 0px rgba(0, 0, 0, 0.06);
            border-radius: 30px;
            margin-bottom: 24px;
            box-sizing: border-box;
            padding: 0 28px;
            &:last-child {
                margin-bottom: 80px;
            }
        }
        .card-left {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            > img {
                width: 80px;
            }
            .ticket-count {
                font-size: 24px;
                font-weight: bold;
                color: #000000;
                margin-top: 12px;
            }
        }
        .card-content {
            text-align: left;
            flex: 1;
            margin-left: 24px;
            padding-right: 30px;
        }
        .card-title {
            font-size: 28px;
            font-weight: 600;
            color: #000000;
            line-height: 28px;
        }
        .card-subtitle {
            font-size: 24px;
            font-weight: 400;
            color: #828f9f;
            line-height: 32px;
            margin-top: 16px;
        }
        .card-right {
            .btn {
                display: inline-block;
                width: 146px;
                height: 72px;
                background: #ffffff;
                border-radius: 36px;
                border: 2px solid #6332F8;
                line-height: 74px;
                font-size: 26px;
                font-weight: 600;
                color: #6332F8;
                box-sizing: border-box;
                vertical-align: 0.1em;

                &.active {
                    border: none;
                    background: #6332F8;
                    color: #FFFFFF;
                }
                &.disabled{
                    border: none;
                    color: #C7D1DA;
                    background: #F1F3F8;
                }
                &.tip{
                    border: none;
                    color: #FFFFFF;
                    background: #6332F8;
                    opacity: 0.35;
                }
            }
        }
    }
</style>
