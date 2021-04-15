import request from '@/utils/request'
import config from "@/config/index"
import store from "@/store"

export default {
    // 1. 用户信息上报
    postUsrInfo(params) {
        return request({
            url: config.REPORT_URL,
            headers: {
                "Content-Type": "application/json",
            },
            data: params,
            method: 'POST',
        })
    },
    // 获取首页数据
    getHomeData(version) {
        return request({
            url: `/item/home/v2?version=${version}`,
            headers: {
                token: store.getters.token
            },
            method: 'GET',
        })
    },
    // 获取剩余抽奖卡
    getTicketNum() {
        return request({
            url: '/item/getTicketNum',
            headers: {
                token: store.getters.token
            },
            method: 'GET',
        })
    },
    // 抽奖
    lottery({boxId, isFirst}) {
        return request({
            url: `/item/lottery?boxId=${boxId}&isFirst=${isFirst}`,
            headers: {
                token: store.getters.token
            },
            method: 'POST',
        })
    },
    // 获取任务列表
    getQuestList() {
        return request({
            url: '/quest/list',
            headers: {
                token: store.getters.token
            },
            method: 'GET',
        })
    },
    // 完成任务列表
    finishList(questType) {
        return request({
            url: `/quest/finish?questType=${questType}`,
            headers: {
                token: store.getters.token
            },
            method: 'POST',
        })
    },
    // 完成任务，跳转 Pk
    finishListv2(questType) {
        return request({
            url: `/quest/finish/v2?questType=${questType}`,
            headers: {
                token: store.getters.token
            },
            method: 'POST',
        })
    },
    // 获取我的粉丝列表
    getFollowList() {
        return request({
            url: `/help/getFollow`,
            headers: {
                token: store.getters.token
            },
            method: 'GET'
        })
    },
    // 发送邀请
    helpSend({type=1,targetId='',targetUserId=''}={}) {
        return request({
            url: `/help/send`,
            params:{
                type,
                targetId,
                targetUserId
            },
            headers: {
                token: store.getters.token
            },
            method: 'POST'
        })
    },
    // 完成助力
    makeHelp(targetId,recordId,targetUserId){
       return request({
           url:`/help/makeHelp`,
           params:{
             targetId,
             recordId,
             targetUserId
           },
           headers:{
               token: store.getters.token
           },
           method: 'POST'
       })
    },
    // 通过崽崽ID获取信息
    getInfo(targetUserId){
        return request({
            url:`/help/getInfo`,
            params:{
                targetUserId
            },
            headers:{
                token: store.getters.token
            },
            method: 'GET'
        })
    },
    // 拒绝全部助力
    cancelAllHelp(){
        return request({
            url:`/help/cancelAllHelp`,
            headers:{
                token: store.getters.token
            },
            method: 'POST'
        })
    },
    // 拒绝助力
    cancelHelp(recordId){
        return request({
            url:`/help/cancelHelp`,
            headers:{
                token: store.getters.token
            },
            params:{
                recordId
            },
            method: 'POST'
        })
    },
    // 结束引导页（粉丝列表）
    getEndFollow(){
        return request({
                url:`/help/getEndFollow`,
                headers:{
                    token: store.getters.token
                },
                method: 'GET'
            })
    },
    // 获取助力列表
    getHelpList(){
        return request({
            url:`/help/invitedMeList`,
            headers:{
                token: store.getters.token
            },
            method: 'GET'
        })
    }



    // getUserId(targetId){
    //     return request({
    //         url:`/help/getUserId`,
    //         params:{
    //             targetId
    //         },
    //         headers:{
    //             token: store.getters.token
    //         },
    //         method: 'GET'
    //     })
    // }
}
