<template>
    <transition name="fade-transform" mode="out-in">
        <div class="request-loading-component" v-show="likeContent.flag && newCount">
            <div :class="['toast',{'show':likeContent.flag}]">
                <img src="../resource/imgs/close.png" alt="" class="close" @click="handleClose">
                <img class="icon" src="../resource/imgs/ic_like_toast.png" alt="">
                <div class="content">哇！新收到了 <span class="num">{{newCount}}</span> 个赞</div>
                <button class="btn" @click="goToLike">看看谁赞了我</button>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'LikeTip',
        computed: {
            ...mapGetters([
                'likeContent'
            ])
        },
        data(){
            return {
                newCount: 0
            }
        },
        methods: {
            ...mapActions([
                'SetLike'
            ]),
            goToLike() {
                this.handleClose()
                this.$router.push({name: 'dress'})
            },
            handleClose(){
                this.SetLike({flag:0})
            },
            init(){
                const likeCount = +localStorage.getItem('$likeCount') || 0
                const {count} = this.likeContent
                if ( count > likeCount) {
                    localStorage.setItem('$likeCount', count)
                    this.newCount = count - likeCount
                } else if( count < likeCount){
                    this.newCount = count
                    localStorage.setItem('$likeCount', count)
                }
            }
        },
        mounted() {
            // this.init()
            // this.SetLike({flag: 1, count: 10})
            // setTimeout(()=>{
            //     this.SetLike({flag:1,count:10})
            // },2500)
            // setTimeout(()=>{
            //     this.SetLike({status:true,count:10})
            // },6000)
        },
        watch:{
            'likeContent.flag'(val){
                if (val) {
                    this.init()
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    .request-loading-component{
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
        z-index: 98;
    }
    .toast {
        width: 540px;
        height: 518px;
        border-radius: 40px;
        background-color: #fff;
        text-align: center;
        .icon {
            width: 120px;
            margin-top: 68px;
        }
        .close{
            position: absolute;
            padding: 10px;
            width: 60px;
            height: 60px;
            top: 14px;
            right: 14px;
            pointer-events:auto;
        }
        .content {
            font-size: 34px;
            font-weight: 500;
            margin-top: 35px;
            margin-bottom: 40px;
        }
        .num{
            color: #5a45f8;
        }
        .btn {
            width: 340px;
            height: 100px;
            background-color: #5a45f8;
            font-size: 30px;
            color: #fff;
            border-radius: 50px;
        }
    }

    .show {
        animation: dance 1.3s;
        /*animation-delay: 500ms;*/
    }

    @keyframes dance {
        from{
            /*top: 0;*/
            /*left: 0;*/
            /*transform: translate(0,0);*/
            opacity: 0;
        }
        to{
            // top: 50%;
            // left: 50%;
            // transform: translate(-50%,-50%);
            opacity: 1;
        }
    }
</style>
