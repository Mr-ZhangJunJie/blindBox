<template>
    <transition name="fade">
        <div id="tinderBox">
            <h3 class="title">
                <template v-if="targetSource && targetSource.zzId !== '&&&&&&'">
                    好友互动({{currentIndex}}/{{total}})
                </template>
                <template v-else>
                    好友互动
                </template>
            </h3>
            <div class="tinder">
                <Tinder ref="tinder" key-name="zzId" :queue.sync="queue" :offset-y="10" @submit="onSubmit">
                    <template slot-scope="scope">
                        <div class="card" v-if="scope.data.zzId !=='&&&&&&'">
                            <div class="headIcon">
                                <img :src="scope.data.profilePic" alt="">
                            </div>
                            <div class="content">
                                <p>{{scope.data.nickName}}</p>
                                <p>向你发来助力请求</p>
                            </div>
                            <p class="time">{{scope.data.createTime}}</p>
                            <div class="tipTxt">
                                快来帮我助力抽盲盒<br>你我各得2张抽奖卡
                            </div>
                        </div>
                        <div class="inviteCard" v-else>
                            <h3>向好友请求助力</h3>
                            <p>你和Ta各得2张抽奖卡</p>
                            <ul class="userBox">
                                <template>
                                    <li class="userList" v-for="user in scope.data.followingUsers" :key="user.hashCode">
                                        <div class="imgBox"><img :src="user.profilePic" alt=""></div>
                                        <p>{{user.name}}</p>
                                    </li>
                                </template>
                                <template v-if="scope.data.num > 4">
                                    <li class="userList">
                                        <div class="imgBox"><img src="../resource/imgs/ic_more_100@3x.png" alt=""></div>
                                        <p>共{{scope.data.num}}人</p>
                                    </li>
                                </template>
                            </ul>
                            <button @click="$emit('inviteFun')">去邀请</button>
                        </div>
                    </template>
                </Tinder>
                <div class="btns" v-if="targetSource && targetSource.zzId !== '&&&&&&'">
                    <div class="btnGroup">
                        <span class="refuse" @click="decide('nope')">拒绝</span><span class="help"
                                                                                    @click="decide('like')">助力得卡</span>
                    </div>
                    <p>今日剩余助力机会 {{successNum}}/3</p>
                </div>
            </div>
            <img src="../resource/imgs/ex_72@3x.png" class="close" @click="closeFun">
        </div>
    </transition>
</template>

<script>
    import Tinder from "./vue-tinder/Tinder";
    import UserApi from "@/api/user"
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "TinderBox",
        data: () => ({
            // 当前展示的数据列表
            queue: [],
            // 从总数据中截取的索引
            offset: 0,
            // 要求助力列表的总条数
            total: '',
            // 成功的机会数
            successNum: '',
            // 全部待处理数据（助力列表，要求提示卡片） 邀请列表模拟zzId（&&&&&&） 可以判断类型
            source: [],
            // 当前处理的个数
            currentIndex: 1,
            // 助力弹窗处理完成标记
            doneHelpFlag: false,
            // 控制按钮多次点击
            flag: true,
        }),
        created() {
            this.getData();
        },
        computed: {
            ...mapGetters(['myApp']),
            targetSource() {
                return this.queue[0]
            }
        },
        methods: {
            ...mapActions(['SetLoading', 'SetNetwork', 'SetSign', 'SetToast']),
            async getData() {
                try {
                    //  获取助力列表，和引导卡片

                    const [invitedMeListRet, guideRet] = await Promise.all([UserApi.getHelpList(), UserApi.getEndFollow()]);

                    const {code: invitedMeCode, result: {invitedMeList, successNum}} = invitedMeListRet;
                    const {code: guideCode, result: guideObj} = guideRet;
                    if(invitedMeList.length === 0) throw Error('不存在助力列表');

                    if (invitedMeCode !== 200 || guideCode !== 200) throw Error('获取助力列表失败');

                    if (!guideObj.num) {
                        this.source = invitedMeList;
                    } else {
                        this.source = [...invitedMeList, {zzId: '&&&&&&', ...guideObj}];
                    }

                    // 总数量
                    this.total = invitedMeList.length;
                    // 成功的次数
                    this.successNum = successNum;

                    this.mock();

                } catch (e) {
                    this.SetNetwork({flag: 1, message: e.message});
                    setTimeout(() => {
                        this.SetNetwork({flag: 0, message: ''})
                    }, 1800)
                }
            },
            async mock(count = 5, append = true) {
                const list = [];
                // 截取数据,如果数据不存在则不截取
                for (let i = 0; i < count; i++) {
                    if(!this.source[this.offset]) continue;
                    list.push(this.source[this.offset]);
                    this.offset++;
                }
                // 加入队列
                if (append) {
                    this.queue = this.queue.concat(list);
                } else {
                    this.queue.unshift(...list);
                }
            },
            onSubmit() {
                // this.source.length > this.offset：还有数据，且当前数据小于3的时，获取新数据
                if (this.source.length > this.offset && this.queue.length < 3) {
                    this.mock();
                }
            },
            async decide(choice) {
                // this.flag ：避免重复点击， this.doneHelpFlag ：避免重复点击移除了最后的邀请列表
                if (!this.flag || this.doneHelpFlag) {
                    return;
                }
                this.flag = false;

                try{
                    if (choice === "like") {
                        _html({e: "lottery.Notice.Inviteeconfirm", bk: this.myApp.userId, duid: this.myApp.duid});
                        const {code, result} = await UserApi.makeHelp(this.targetSource.zzId, this.targetSource.id, this.targetSource.userId);
                        if (code !== 200 && code !== 300) throw Error('助力失败');
                        if (code === 200) {
                            // 更新今日已助力次数
                            this.successNum = result;
                            this.$refs.tinder.decide(choice);
                            // 动画500ms，动画结束后开启下次点击
                            setTimeout(()=>{
                                this.flag = true;
                            },500);
                            //助力成功提示
                            this.SetSign({flag: 1, txt: '为Ta助⼒成功，获得2张抽奖卡'});
                            setTimeout(() => {
                                this.SetSign({flag: 0, txt: ''})
                            }, 1800);
                            // 更新票数
                            this.$emit('updateTicketNum');

                            _html({e: "lottery.Notice.Inviteesuccess", bk: this.myApp.userId, duid: this.myApp.duid});
                        } else if (code === 300) {
                            // 邀请失败
                            const {failTitle} = result;
                            throw Error('助力失败，' + failTitle);
                        }
                    }else{
                        const {code} = await UserApi.cancelHelp(this.targetSource.id);
                        if (code !== 200) throw Error('拒绝助力失败');

                        this.$refs.tinder.decide(choice);
                        setTimeout(()=>{
                            this.flag = true;
                        },500);

                        this.SetToast({flag: 1, text: '已拒绝助⼒'});
                        setTimeout(() => {
                            this.SetToast({flag: 0, text: ''})
                        }, 1800);

                        _html({e: "lottery.Notice.Inviteereject", bk: this.myApp.userId, duid: this.myApp.duid});
                    }
                }catch(e){
                    this.SetNetwork({flag: 1, message: e.message});
                    setTimeout(() => {
                        this.SetNetwork({flag: 0, message: ''});
                    }, 1800);
                    this.$refs.tinder.decide(choice);
                    setTimeout(()=>{
                        this.flag = true;
                    },500);
                }
                // 当前索引+1
                this.currentIndex++;
                // 如果索引大于了总的邀请助力条数，则：  代表处理完了邀请列表，当前索引不再增加
                if (this.currentIndex > this.total) {
                    // 处理完助力列表
                    this.doneHelpFlag = true;
                    this.currentIndex = this.total;
                    // 如果没有结束引导，则关闭
                    if (this.queue.length === 0) {
                        this.$emit('close');
                    }
                }
            },
            closeFun() {
                // 如果再结束引导处关闭则直接关闭弹窗
                if (this.targetSource.zzId === '&&&&&&') {
                    this.$emit('close')
                } else {
                    // 如果再助力列表状态关闭则弹出取消全部助力弹窗
                    this.$emit('showCancelAll')
                }
                _html({e: "lottery.Notice.close", bk: this.myApp.userId, duid: this.myApp.duid});
            }
        },
        components: {
            Tinder
        }
    }
</script>

<style scoped lang="scss">
    #tinderBox {
        position: fixed;
        z-index: 99;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
            font-size: 40px;
            font-weight: 600;
            color: #FFFFFF;
            margin-bottom: 36px;
        }

        .tinder {
            width: 590px;
            height: 758px;
            position: relative;

            .vue-tinder {
                width: 100%;
                height: 100%;

                .card {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;

                    .headIcon {
                        width: 160px;
                        height: 160px;
                        margin: 0 auto;
                        margin-top: 70px;
                        border-radius: 50%;
                        overflow: hidden;
                        img {
                            width: 100%;
                        }
                    }
                    .content {
                        height: 36px;
                        display: flex;
                        justify-content: center;
                        font-size: 28px;
                        color: #000000;
                        line-height: 36px;
                        margin-top: 24px;
                        p:nth-of-type(1) {
                            font-weight: 600;
                            max-width: 252px;
                            overflow: hidden; //超出的文本隐藏
                            text-overflow: ellipsis; //溢出用省略号显示
                            white-space: nowrap; //溢出不换行
                        }
                        p:nth-of-type(2) {
                            font-weight: 400;
                            margin-left: 8px;
                        }
                    }
                    .time {
                        font-size: 22px;
                        font-weight: 400;
                        color: #828F9F;
                        line-height: 28px;
                        margin-top: 4px;
                    }
                    .tipTxt {
                        font-size: 40px;
                        font-weight: 600;
                        color: #000000;
                        line-height: 52px;
                        margin-top: 50px;
                    }
                }

                .inviteCard {
                    width: 100%;
                    height: 100%;
                    h3 {
                        height: 48px;
                        font-size: 40px;
                        font-weight: 600;
                        color: #000000;
                        line-height: 48px;
                        margin-top: 60px;
                    }
                    p {
                        height: 42px;
                        font-size: 30px;
                        font-weight: 400;
                        color: #828F9F;
                        line-height: 42px;
                        margin-top: 20px;
                    }
                    .userBox {
                        width: 384px;
                        height: 318px;
                        margin: 0 auto;
                        margin-top: 50px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-wrap: wrap;
                        .userList {
                            width: 160px;
                            height: 144px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            .imgBox {
                                width: 100px;
                                height: 100px;
                                border-radius: 50%;
                                overflow: hidden;
                                img {
                                    width: 100%;
                                }
                            }
                            p {
                                width: 100%;
                                height: 28px;
                                font-size: 22px;
                                font-weight: 400;
                                color: #000000;
                                line-height: 28px;
                                overflow: hidden; //超出的文本隐藏
                                text-overflow: ellipsis; //溢出用省略号显示
                                white-space: nowrap; //溢出不换行
                            }
                            &:nth-of-type(2n) {
                                margin-left: 64px;
                            }
                            &:nth-of-type(3),&:nth-of-type(4){
                                margin-top: 30px;
                            }
                        }
                    }
                    button {
                        width: 360px;
                        height: 100px;
                        background: #6332F8;
                        border-radius: 50px;
                        font-size: 30px;
                        font-weight: 600;
                        color: #FFFFFF;
                        margin-top: 60px;
                    }
                }
            }

            .btns {
                height: 198px;
                width: 100%;
                position: absolute;
                left: 0;
                bottom: 0;
                z-index: 101;
                .btnGroup {
                    height: 100px;
                    padding: 0 48px;
                    display: flex;
                    justify-content: space-between;

                    span {
                        width: 236px;
                        height: 100px;
                        border-radius: 50px;
                        box-sizing: border-box;
                        font-size: 30px;
                        font-weight: 600;
                        line-height: 100px;
                    }
                    .refuse {
                        border: 2px solid #6332F8;
                        color: #6332F8;
                    }
                    .help {
                        color: #FFFFFF;
                        background: #6332F8;
                    }

                }
                p {
                    font-size: 22px;
                    font-weight: 400;
                    color: #828F9F;
                    line-height: 28px;
                    margin-top: 20px;
                }
            }
        }

        .close {
            width: 72px;
            height: 72px;
            margin-top: 72px;
            pointer-events: auto;
        }
    }
</style>
<style>
    .tinder-card {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #ffffff;
        border-radius: 200px;
    }
</style>
