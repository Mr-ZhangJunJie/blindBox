<template>
    <div class="main" v-show="showHelpList">
        <transition name="bounce">
            <div class="content" v-show="isShowContent">
                <div class="nav1">
                    <h3>好友助力邀请 <span>{{helpedNum}}/10</span></h3>
                    <p>每天10次邀请机会。邀好友助力，Ta也可得两张抽奖卡</p>
                    <img
                            class="close"
                            src="../resource/imgs/ex_popup.png"
                            alt=""
                            @click="hideDialog"
                    />
                </div>
                <ul class="mainSide">
                    <li class="card-nolist" v-if="userList.length === 0">
                        <p>
                            你⽬前没有粉丝<br>
                            暂时⽆法邀请好友助⼒哦
                        </p>
                    </li>
                    <li class="card-container" v-else>
                        <!--disablePointer: true-->
                        <iscroll-view class="scroll-view" :options="{disableMouse: true}">
                            <div class="user-container">
                                <ul class="user-box" v-for="(user,index) in userList" :key="index"
                                    @click="inviteToHelp(user,1)">
                                    <li class="user-img">
                                        <img :src="user.profilePic" alt="">
                                    </li>
                                    <li class="user-name">
                                        {{user.name}}
                                    </li>
                                    <img src="../resource/imgs/ic_done_48.png" alt="" class="checkedIcon"
                                         v-if="user.invited === 1">
                                </ul>
                            </div>
                        </iscroll-view>
                    </li>
                </ul>
                <ul class="other-box" v-if="userList.length !== 0">
                    <button v-if="helpedNum<10" @click="inviteOther">邀请其他好友</button>
                    <button class="disabled" v-else>今日次数已用完</button>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from "vuex";
    import userApi from "@/api/user";

    export default {
        name: "HelpList",
        props: {
            showHelpList: Boolean
        },
        data() {
            return {
                userList: [],
                isShowContent: false
            };
        },
        computed: {
            ...mapGetters(["myApp", "userInfo", "bigScreen"]),
            helpedNum() {
                let num = 0;
                this.userList.forEach(item => {
                    if (item.invited === 1) num++;
                })
                return num;
            }
        },
        methods: {
            ...mapActions(["SetLoading", "SetNetwork", "SetSign", "SetToast"]),
            ...mapMutations(['setInviteNotice', 'setInviteTip']),

            async getData() {
                try {
                    const {code, result} = await userApi.getFollowList();
                    if (code !== 200) throw Error('获取粉丝列表失败');
                    this.userList = result;
                    // this.userList = [
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    //     {
                    //         hashCode: "NQFOBI",
                    //         invited: 2,
                    //         name: "TEST",
                    //         profilePic: "https://cdn.zepeto.cn/users/5eaa66bc62b1103917d26fdd/profile/5eaa66d412918c418d1a5962.png?modified=1612250103000",
                    //         userId: "5eaa66bc62b1103917d26fdd"
                    //     },
                    //     {
                    //         hashCode: "28M5N0",
                    //         invited: 1,
                    //         name: "Cheney99",
                    //         profilePic: "https://cdn.zepeto.cn/users/5e4ac48012918c7bcb316212/profile/5e4ac49689dbbe246b0fa12a.png?modified=1612338787000",
                    //         userId: "5e4ac48012918c7bcb316212"
                    //     },
                    //     {
                    //         hashCode: "6RC37Z",
                    //         invited: 2,
                    //         name: "Guest 6RC37Z",
                    //         profilePic: "https://cdn.zepeto.cn/users/5fbdf40ba3fc652915be33ef/profile/5fbdf40ba3fc652915be33f0.png?modified=1606284964000",
                    //         userId: "5fbdf40ba3fc652915be33ef"
                    //     },
                    //     {
                    //         hashCode: "GY7YX2",
                    //         invited: 2,
                    //         name: "❁趁夜色偷亲❁",
                    //         profilePic: "https://cdn.zepeto.cn/users/5f2921cedcda1b431f8b7bf2/profile/5f292214dcda1b431f8b84f3.png?modified=1611805613000",
                    //         userId: "5f2921cedcda1b431f8b7bf2"
                    //     },
                    // ];
                } catch (e) {
                    this.SetNetwork({flag: 1, message: e.message})
                    setTimeout(()=>{
                        this.SetNetwork({flag: 0, message: ''})
                    },1800)
                }
            },
            async inviteToHelp(user, type) {
                // 已邀请过
                if (user.invited === 1) return;
                if (this.helpedNum >= 10) {
                    this.hideDialog();
                    return this.setInviteTip({
                        flag: true,
                        title: '今日邀请次数已用完',
                        subTitle: '去提醒已经邀请的好友<br>完成助力吧',
                        btnTxt: '好的'
                    });
                }
                this.SetLoading({flag: 1, text: '', bg: 'transparent'});
                _html({
                    e: "lottery.Invitation.list",
                    bk: this.myApp.userId,
                    duid: this.myApp.duid
                });
                try {
                    const {code, result} = await userApi.helpSend({type: type, targetId: user.hashCode, targetUserId: user.userId});
                    if(code !== 200) throw Error('发送邀请失败');
                    if (result.code === 200) {
                        //邀请通知
                        user.invited = 1;
                        this.hideDialog();
                        this.SetLoading({flag: 0, text: '', bg: 'transparent'});
                        this.setInviteNotice({flag: true, headPro: this.myApp.profilePic});
                        _html({
                            e: "lottery.Invitation.success",
                            bk: this.myApp.userId,
                            duid: this.myApp.duid
                        });
                    } else if (result.code === 300) {
                        // 邀请失败
                        const {failTitle, failSubTitle} = result.result;
                        this.hideDialog();
                        this.SetLoading({flag: 0, text: '', bg: 'transparent'});
                        this.setInviteTip({flag: true, title: failTitle, subTitle: failSubTitle, btnTxt: '好的'});
                    }

                } catch (e) {
                    console.error(e.message);
                    this.SetLoading({flag: 0, text: '', bg: 'transparent'});
                    this.SetNetwork({flag: 1, message: e.message});
                    setTimeout(()=>{
                        this.SetNetwork({flag: 0, message: ''})
                    },1800)
                }
            },

            inviteOther(){
                _html({
                    e: "lottery.Invitation.other",
                    bk: this.myApp.userId,
                    duid: this.myApp.duid
                });
                this.hideDialog();
                this.$emit('showOther');
            },

            /**
             * 关闭任务弹窗
             */
            hideDialog() {
                this.isShowContent = false;
                this.$emit("close");
                // setTimeout(() => {
                //     this.$emit("close");
                // }, 600);
            }
        },
        watch: {
            showHelpList(val) {
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
        .content{
            .mainSide{
                .card-container{
                    padding-bottom: 216px;
                }
            }
            .other-box{
                padding-bottom: 88px;
            }
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
        background: rgba(0, 0, 0, 0.5);;
        z-index: 110;
        font-size: 26px;
    }

    .content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #ffffff;

        .nav1 {
            height: 112px;
            position: relative;
            flex-basis: 112px;
            box-sizing: border-box;
            padding: 0 36px;
            text-align: left;
            h3 {
                font-size: 30px;
                font-weight: 600;
                color: #000000;
                line-height: 38px;
                margin-top: 37px;
                span{
                    color: #6332F8;
                }
            }
            p {
                font-size: 22px;
                color: #828F9F;
                line-height: 28px;
                margin-top: 9px;
            }
            .close {
                width: 36px;
                height: 36px;
                padding: 20px;
                position: absolute;
                right: 16px;
                top: 18px;
                pointer-events: auto;
            }
        }

        .mainSide {
            height: 0;
            flex: 1;
            overflow: hidden;
            .card-nolist {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                font-size: 28px;
                color: #828F9F;
                line-height: 40px;
                text-align: center;
            }

            .card-container {
                box-sizing: border-box;
                height: 100%;
                padding: 20px 0 148px;

                .scroll-view{
                    width: 100%;
                    height: 100%;
                    touch-action: none;
                    overflow: hidden;
                }
                .user-container{
                    display: flex;
                    flex-wrap: wrap;
                    .user-box {
                        width: 132px;
                        height: 220px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 24px 0 20px;
                        box-sizing: border-box;
                        margin-left: 46px;
                        position: relative;

                        .user-img {
                            width: 132px;
                            height: 132px;
                            border-radius: 50%;
                            overflow: hidden;
                            img {
                                width: 100%;
                            }
                        }
                        .user-name {
                            width: 100%;
                            margin-top: 16px;
                            font-size: 22px;
                            color: #000000;
                            line-height: 28px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        &:nth-of-type(4n + 1) {
                            margin-left: 42px;
                        }

                        .checkedIcon {
                            position: absolute;
                            width: 48px;
                            height: 48px;
                            background: url("../resource/imgs/ic_done_48.png") no-repeat;
                            background-size: 100% 100%;
                            right: -4px;
                            top: 16px;
                        }
                    }
                }
            }
        }

        .other-box {
            width: 100%;
            height: 128px;
            padding-bottom: 20px;
            background: #ffffff;
            position: fixed;
            bottom: 0;

            button {
                width: 440px;
                height: 88px;
                border-radius: 50px;
                border: 2px solid #6332F8;
                font-size: 30px;
                font-weight: 600;
                color: #6332F8;
                line-height: 88px;
                background: #ffffff;
                margin-top: 20px;
            }
            .disabled {
                background: #F1F3F8;
                color: #C7D1DA;
                border: 2px solid #F1F3F8;
            }
        }

    }
</style>
