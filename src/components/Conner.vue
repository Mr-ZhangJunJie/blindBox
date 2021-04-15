<template>
    <ul class="conner">
        <li class="hotBox">
            <span class="hot"></span>
            <span>{{sort}}</span>
        </li>
        <li class="heartBox">
            <span class="heart"></span>
            <span class="heartNum">{{likeTimes}}</span>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "Conner",
        props: {
            sort:{
                type: [String,Number],
                required:true,
            },
            likeTimes:{
                type: [String,Number],
                required:true,
            }
        }
    }
</script>

<style scoped lang="scss">
.conner{
    height: 60px;
    background: #FFFFFF;
    border-radius: 30px;
    position: absolute;
    padding: 0 22px;
    left:24px;
    top:24px;
    display: flex;
    align-items: center;
    font-size: 26px;
    font-weight: bold;
    color: #323232;
    .hotBox,.heartBox{
        display: flex;
        align-items: center;
    }
    .hotBox{
       margin-right: 10px;
    }
    .hot,.heart{
        display: block;
        width: 26px;
        height: 26px;
        margin-right: 4px;
    }
    .hot{
        background: url("../resource/imgs/ic_rank_24.png") no-repeat;
        background-size: 24px 24px;
    }
    .heart{
        background: url("../resource/imgs/ic_heart_24.png") no-repeat;
        background-size: 24px 24px;
    }
    .heartNum{

    }
}
</style>
