import store from "@/store"

export function visitePersion(zzId) {
    window.location.href = `ZEPETO://HOME/PROFILE/CARD?${zzId}`;
    setTimeout(() => {
        window.location.href = 'ZEPETO://WEBVIEW/CLOSE';
    }, 100);
}

export function recalc() {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var docW = w > h ? h : w;
    docW = docW > 750 ? 750 : docW;
    var fz = docW / 10;
    document.getElementsByTagName("html")[0].style.cssText = 'font-size: ' + fz +"px";
    if (!navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        var realfz = parseFloat(window.getComputedStyle(document.documentElement, null)['fontSize']) || 37.5;
        if (fz !== realfz) {
            document.getElementsByTagName("html")[0].style.cssText = 'font-size: ' + fz * (fz / realfz) +"px";
        }
    }
}

/**
 * 获取图片blob地址
 * @param url 图片地址
 * @returns {Promise<any>}
 */
export function getBlobUrl(url) {
    const promise = new Promise(function (resolve, reject) {
        const handler = function () {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                const src = inputPathToUrl(this.response)
                resolve(src);
            } else {
                reject(new Error(this.statusText));
            }
        };
        const client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "blob";
        client.send();

    });
    return promise;
}

/**
 * 文件或blob对象转blob地址
 * @param file 文件或blob对象
 * @returns {string} 返回blob地址
 */
export function inputPathToUrl(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}


/**
 * 弹窗滑动时，滚动不穿透
 */
export function fixedBody() {
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    document.body.style.cssText += 'position:fixed;width:100%;top:-' + scrollTop + 'px;'
}

export function looseBody() {
    let body = document.body
    body.style.position = ''
    let top = body.style.top
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top)
    body.style.top = ''
}

// 尝试获取ZEPETO
export function tryGetZepeto() {
    return new Promise((resolve) => {
        console.log('store.getters.isFrist', store.getters.isFrist)
        if (store.getters.isFrist) {
            store.dispatch('SetLoading', {flag: 1, text: '', bg: 'transparent'})
            // requestLoading
            // setTimeout(()=>{
            //     window.ZEPETO = {
            //         duid: "4d4582a0-462e-4c7a-8866-a0d06c7eea99",
            //         onKeyboardChanged: null,
            //         userAgent: "android.zepeto_cn/2.18.2 (android; U; Android OS 9 / API-28 (HUAWEIMHA-AL00/9.1.0.212C00); zh-CN; occ-CN; HUAWEI MHA-AL00)",
            //         userInfo: {
            //             HasCharacter: true,
            //             IsActived: true,
            //             IsLoggedIn: true,
            //             NeedsEmailActivation: true,
            //             authToken: "wW3KR2AMESb/fMW3ouKgpjf2HyfTcucW8THCK5tMnRBxV9o/NJUUyRxJnttQI3nEFbrtQ8PtGPBYOh7CaRkCr/9G3/2plyN9SO3ud0JjMlo=\\1\\uOkpqrKi0tu8NFzhuhCKN9s8utpB0YyIuw1hNY38",
            //             backgroundPic: "https://cdn.zepeto.cn/users/5c98df2f48191d055a31f999/background/5c98df410314a8fd0222526c.png?modified=1582807822000",
            //             blockCode: "",
            //             blockReason: "",
            //             characterCount: 1,
            //             characterId: "5c98df410314a8fd0222526c",
            //             characterPic: "https://cdn.zepeto.cn/users/5c98df2f48191d055a31f999/characters/5c98df410314a8fd0222526c.png?modified=1582807822000",
            //             coin: 5487,
            //             createdAsIso: "2019-03-25T22:01:20",
            //             dailyBonus: 169,
            //             displayName: "开心",
            //             email: "",
            //             followerCount: 7,
            //             followingBookmarkCount: 0,
            //             followingCount: 31,
            //             giftCount: 0,
            //             greetingsLikeCount: 0,
            //             hasAccount: true,
            //             hasBasicPack: false,
            //             hasEmail: false,
            //             hasExternalIds: true,
            //             hasFacebook: false,
            //             hasGoogle: false,
            //             hasItemCount: 28,
            //             hasKakao: false,
            //             hasLine: false,
            //             hasMobile: false,
            //             hasPassword: false,
            //             hasQq: false,
            //             hasQuestReward: false,
            //             hasRandomBoxes: false,
            //             hasTwitter: false,
            //             hasWechat: true,
            //             hashCode: "L8NKZB",
            //             isBanDevice: false,
            //             isBlocked: false,
            //             isEmailVerification: false,
            //             isFollowing: false,
            //             isOfficialAccount: false,
            //             isRegistered: true,
            //             job: "",
            //             maxCharacterSlot: 1,
            //             migrationCount: 0,
            //             name: "GUEST 4IQ8VZ",
            //             nationality: "",
            //             notiCount: 27,
            //             profilePic: "https://cdn.zepeto.cn/users/5dc2ad2089dbbe1ba05a7859/profile/5dc2ad39cc34fc32b2daffb4.png?modified=1573039417000",
            //             questCount: 8,
            //             questRewardedCount: 0,
            //             sendbirdAPIHost: "https://api-zepetto.sendbird.com",
            //             sendbirdAccessToken: "",
            //             sendbirdAppId: "ECE96CAD-4B24-4F5B-A6C1-FBC64D7D373E",
            //             socialProvider: "",
            //             statusMessage: "",
            //             unreadMessageCount: 0,
            //             userId: "5dc2ad2089dbbe1ba05a7859",
            //             zem: 0,
            //             zepetoPackCount: 0,
            //         },
            //         version: "2.15.0"
            //     }
            //
            // },200)
            if (process.env.NODE_ENV === 'development') {
                store.dispatch('SetFrist', false);
                store.dispatch('Check_App_Info');
                resolve(true)
            }else{
                let timer;
                timer = setInterval(() => {
                    // 站内
                    if (window.ZEPETO) {
                        store.dispatch('SetFrist', false);
                        store.dispatch('Check_App_Info');
                        clearInterval(timer);
                        resolve(true)
                    }
                }, 60);
            }
        } else {
            resolve(true);
        }
    })
}

export function proLoadImg(imgSrc) {
    return new Promise((resolve, reject) => {
        const Img = new Image();
        Img.crossOrigin = "Anonymous";
        Img.src = imgSrc;
        Img.onload = function () {
            resolve(this)
        };
        Img.onerror = reject
    })
}
