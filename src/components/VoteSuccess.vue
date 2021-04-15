<template>
<transition name="fade-transform" mode="out-in">
    <div class="request-loading-component" v-show="isShow">
        <div class="voteBox">
            <header>
                <img src="../resource/imgs/coin_168.png" alt="">
            </header>
            <main>
               <h3>投票成功!</h3>
               <p>为Ta增加1票, 消耗1张评审券</p>
               <p>感谢你的助力，奖励你<span>8</span>金币</p>
            </main>
            <footer>
               <button @click="SetVoteContent(false)">好的</button>
            </footer>
        </div>
    </div>
</transition>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    export default {
        name: "VoteSuccess",
        computed:{
            ...mapGetters(['voteContent']),
            isShow(){
                const flag = this.voteContent.flag
                window.canScroll = flag
                return flag
            },
        },
        methods: {
            ...mapMutations([
                'SetVoteContent'
            ])
        },
        // mounted(){
        //     this.SetVoteContent({flag:1})
        // }
    }
</script>

<style scoped lang="scss">
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

    .voteBox{
        width: 540px;
        height: 680px;
        background: #FFFFFF;
        border-radius: 40px;
        header{
            padding-top:38px;
            box-sizing: border-box;
            height: 276px;
            display: flex;
            justify-content: center;
            align-items: center;
             img{
               width: 152px;
             }
        }
        main{
            height: 244px;
            text-align: center;
            overflow: hidden;
            h3{
                font-size: 40px;
                font-weight: 600;
                margin-top: 30px;
                margin-bottom: 12px;
            }
            p{
                font-size: 30px;
                font-weight: 400;
            }
            span{
                font-size: 32px;
                font-weight: bold;
                color: #F323FF;
            }
        }
        footer{
            height: 140px;
            button{
                width: 360px;
                height: 100px;
                background: #33EEA7;
                border-radius: 50px;
                margin: 0 auto;
                font-size: 30px;
                font-weight: 600;
            }
        }
        .show {
            animation: dance 1.3s;
            animation-delay: 1s;
        }
        @keyframes dance {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-60px);
            }
            100% {
                transform: translateY(0px);
            }
        }
    }
}
</style>
