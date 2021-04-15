<template>
    <div>
        <nav class="nav2">
            <img src="../resource/imgs/exit_wh.png" @click="closePage">
        </nav>
        <div class="main">
            <div class="content">
                <div class="warning"></div>
                <h4>当前网络不可用</h4>
                <p>请关闭重试</p>
                <button class="btn" @click="closePage">关闭</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Offline',
        methods:{
            back() {
                this.$router.back()
            },
            closePage() {
                window.location.href = 'ZEPETO://WEBVIEW/CLOSE'
            },
            refresh(){
                const router = this.$route
                this.$router.push({ path: router.path, query: { n: Date.now() }})
            }
        }
    }
</script>

<style lang='scss' scoped>
    .main{
        position: fixed;
        display: flex;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        justify-content: center;
        align-items: center;
        background: #323232;
        z-index: 91;
    }
    .big-screen{
        padding-top: 179px;
        border-top: 1px solid transparent;
        height: calc(100% - 180px);
        .nav2{
            padding-top: 68px;
            img{
                pointer-events:auto;
            }
            &::before{
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
    }

    .nav2 {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 112px;
        line-height: 112px;
        font-size: 30px;
        font-weight: 600;
        color: #000;
        background: #323232;
        padding-left: 26px;
        padding-right: 26px;
        z-index: 92;
        img {
            width: 36px;
            height: 36px;
            padding: 10px;
        }
    }
    .content{
        text-align: center;
        .warning{
            width: 148px;
            height: 148px;
            background: url(../resource/imgs/warning.png) no-repeat center;
            background-size: cover;
            margin-left: auto;
            margin-right: auto;
        }
        h4{
            margin-top: 34px;
            color: #fff;
            font-size: 36px;
        }
        p{
            margin-top: 10px;
            font-size: 30px;
            font-weight: 400;
            color: #fff;
            background: #323232;
        }
        .btn{
            width: 220px;
            height: 84px;
            margin-top: 66px;
            font-size: 30px;
            background: #f0f0f0;
            border-radius:50px;
        }
    }
</style>
