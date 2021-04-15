<template>
    <transition name="fade-transform" mode="out-in">
        <div class="request-loading-component" v-show="reviewPromtContent.flag">
            <div class="toast">
                <div class="header">评审券不足啦!</div>
                <!--<p v-if="title !== ''">{{title}}</p>-->
                <div class="content">
                    <p>为Ta投票需消耗1张评审券</p>
                    <p>去做任务赚取评审券吧!</p>
                    <p>还可得最高<span>300</span>金币奖励</p>
                </div>
                <div class="btn-group">
                    <button class="btn" @click="goToChat">做任务得券</button>
                    <button class="btn" @click="SetReviewPromtContent({flag:false})">取消</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapGetters,mapMutations} from 'vuex'


    export default {
        name: 'ReviewPromt',
        computed:{
            ...mapGetters(['myApp','reviewPromtContent'])
        },
        data() {
            return {

            }
        },
        mounted(){
            console.log('reviewPromtContent',this.reviewPromtContent)
        },
        methods: {
            ...mapMutations(['SetReviewPromtContent','SetCouponDialogContent']),
            goToChat() {
               this.SetReviewPromtContent({flag:false});
                setTimeout(()=>{
                    this.SetCouponDialogContent({flag:true,isShowCoinBox:true})
                },800)
               this.$router.push('/');
            }
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
    }

    .toast {
        width: 550px;
        border-radius: 40px;
        background-color: #fff;
        text-align: center;
        padding: 70px 40px;
        .header{
            font-size: 40px;
            font-weight: 600;
            color: #000000;
            line-height: 40px;
        }
        .content {
            font-size: 28px;
            font-weight: 400;
            color: #000000;
            text-align: center;
            margin-top: 34px;
            line-height: 44px;
        }
        .btn-group{
            width: 100%;
            margin-top: 60px;
        }

        .btn {
            width: 360px;
            height: 100px;
            background: #6332F8;
            border-radius: 50px;
            font-size: 30px;
            font-weight: 600;

            &:first-child{
                background: #6332F8;
                margin-right: 18px;
                color: #FFFFFF;
            }
            &:last-child{
                color: #000000;
                background: #F1F3F8;
                margin-top: 30px;
            }
        }
    }
</style>
