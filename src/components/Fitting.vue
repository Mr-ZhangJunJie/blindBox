<template>
    <span class="fitting" @click="$emit('tryWear')">
        <img src="../resource/ic_fitting@2x.png" alt=""><var>试穿</var>
    </span>
</template>

<script>
    export default {
        name: "fitting"
    }
</script>

<style scoped lang="scss">
    .fitting{
        position: absolute;
        width:160px;
        height:72px;
        background-color: #fff;
        border-radius: 36px;
        right:36px;
        bottom:28px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        font-weight: 500;
        color: #000000;
        z-index:80;
        img{
            width:36px;margin-right: 14px;
        }
    }
</style>
