<template>
    <div class="rankBox">
        <!--<div :class="['rank',userMsg.myRank<4?`rank${userMsg.myRank}`:'']">{{ (userMsg.myRank>0&&100>=userMsg.myRank)?userMsg.myRank:'-'}}</div>-->
        <div :class="['rank',userMsg.myRank<4?`rank${userMsg.myRank}`:'']">{{userMsg.myRank}}</div>
        <div class="user">
            <img  v-lazy="userMsg.head" class="avatar" @click="goToHome(userMsg.hashCode,userMsg.nickName)"/>
            <div class="info">
                <div class="nick">{{userMsg.nickName||'-'}}</div>
                <span class="like-count">{{(userMsg.likedCount||0) | transformCount}}</span>
            </div>
        </div>
        <div class="request-loading-component" v-if="isContinue">
            <div class="toast">
                <p class="title">查看用户{{targetName}}<br>将要离开当前页？</p>
                <p class="sheet">
                    <button @click="isContinue=0">取消</button>
                    <button @click="visitePersion">确认</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {transformCount} from '@/utils/filter'
    import {mapGetters} from 'vuex'
    import {visitePersion} from '@/utils/common'

    export default {
        name: "Rank",
        data(){
            return{
                isContinue: 0,
                targetZzid: '',
                targetName: '',
            }
        },
        props:{
            userMsg:{
                type: Object,
                default:()=>({})
            }
        },
        filters:{
            transformCount(val) {
                return transformCount(val)
            }
        },
        mounted(){
            console.log('this.userMsg',this.userMsg)
        },
        computed:{
            ...mapGetters(['myApp']),
        },
        methods:{
            goToHome(zzid, name) {
                if(!this.myApp.isInApp){
                    return window.location.href= `zepeto-cn://HOME/WEBVIEW?url=${window.location.href}`;
                }
                if (zzid === this.myApp.zzId) return;
                this.isContinue = 1;
                this.targetZzid = zzid;
                this.targetName = name;
            },
            visitePersion() {
                visitePersion(this.targetZzid)
            },
        }
    }
</script>

<style scoped lang="scss">
.rankBox {
    display: flex;
    width: 100%;
    height: 112px;
    justify-content: center;
    align-items: center;
    padding: 0 36px;
    box-sizing: border-box;
    .rank {
        height: 44px;
        line-height: 44px;
        margin-right: 18px;
        background: no-repeat, center;
        background-size: 100%;
        font-size: 26px;
        font-weight: 600;
        // height: 100%;
        color: #000;
        &.rank1 {
            width: 40px;
            font-size: 0;
            // margin-top: 15px;

            background-image: url(../resource/imgs/rank1.png);
        }
        &.rank2 {
            width: 40px;
            font-size: 0;
            // margin-top: 15px;
            background-image: url(../resource/imgs/rank2.png);
        }
        &.rank3 {
            width: 40px;
            font-size: 0;
            // margin-top: 15px;
            background-image: url(../resource/imgs/rank3.png);
        }
    }
    .user {
        flex: 1;
    }
    .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        float: left;
    }
    .info {
        text-align: left;
        margin-left: 100px;
        line-height: 26px;
        .nick {
            padding-top: 10px;
            width: 290px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 28px;
            font-weight: 600;
            color: #000000;
        }
        .like-count {
            position: relative;
            display: inline-block;
            margin-top: 12px;
            padding-left: 37px;
            font-size: 24px;
            font-weight: normal;
            &::before {
                content: '';
                position: absolute;
                left: -2px;
                top: -3px;
                display: inline-block;
                width: 29px;
                height: 29px;
                background: url(../resource/imgs/ic_like_pink2.png) no-repeat center;
                background-size: contain;
            }
        }
    }
    .follow-status {
        margin-top: 3px;
        width: 146px;
        height: 72px;
        line-height: 72px;
        border-radius: 36px;
        font-weight: 600;
        box-sizing: border-box;
        padding-top: 2px;
        &.followed {
            color: #ccccd3;
            border: 2px solid;
            font-weight: normal;
        }
        &.not-follow {
            color: #fff;
            background: #5c46ff;
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
</style>
