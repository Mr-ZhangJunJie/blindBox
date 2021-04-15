<template>
    <transition name="fade-transform" mode="out-in">
        <div class="container" v-show="inviteConfig.flag">
            <div :class="['toast',{'show':inviteConfig.flag}]" ref="box">
                <div class="close" @click="$emit('close')"></div>
                <header>
                    <h3>邀请已关注你<br>的粉丝助⼒</h3>
                </header>
                <main>
                    <input type="text" placeholder="输入6位代码，发起邀请" maxlength="6" v-model="hashCode" ref="inputId" @blur="fnBlur1"
                           @focus="fnfocus1">
                </main>
                <footer @click="inviteFun">确认邀请</footer>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapGetters,mapActions,mapMutations} from "vuex"
    import userApi from "@/api/user"

    export default {
        name: "InviteInput",
        props: {
            inviteConfig: Object
        },
        data() {
            return {
                hashCode: ''
            }
        },
        computed:{
            ...mapGetters(['myApp'])
        },
        created() {
            this.platForm = this.checkPlatForm();
        },
        methods: {
            ...mapActions(['SetLoading','SetNetwork']),
            ...mapMutations(['setInviteTip','setInviteNotice']),
            async inviteFun() {
                // Code 码长度不为6
                if (this.hashCode.length !== 6) return;
                // 验证有效性
                let reg = /^[a-z0-9A-Z]{6}$/;
                if (!reg.test(this.hashCode)) {
                    this.$emit('close');
                    this.hashCode = '';
                    return this.setInviteTip({flag: true, title: '该⽤户不存在', subTitle: '请输⼊有效的⽤户六位代码', btnTxt: '好的'})
                } else {
                    _html({
                        e: "lottery.Invitation.otherconfirm",
                        bk: this.myApp.userId,
                        duid: this.myApp.duid
                    });

                    // 网络请求
                    this.SetLoading({flag: 1, text: '', bg: 'transparent'});
                    try {
                        const {code, result} = await userApi.helpSend({type: 2, targetId: this.hashCode});
                        if (code !== 200) throw Error('发送邀请失败');
                        if (result.code === 200) {
                            //邀请通知
                            this.SetLoading({flag: 0, text: '', bg: 'transparent'});
                            this.$emit('close');
                            this.hashCode = '';
                            _html({
                                e: "lottery.Invitation.success",
                                bk: this.myApp.userId,
                                duid: this.myApp.duid
                            });

                            this.setInviteNotice({flag: true, headPro: this.myApp.profilePic});
                        } else if (result.code === 300) {
                            // 邀请失败
                            const {failTitle, failSubTitle} = result.result;
                            this.SetLoading({flag: 0, text: '', bg: 'transparent'});
                            this.$emit('close');
                            this.hashCode = '';
                            this.setInviteTip({flag: true, title: failTitle, subTitle: failSubTitle, btnTxt: '好的'});
                        }
                    } catch (e) {
                        this.SetLoading({flag: 0, text: '', bg: 'transparent'});
                        this.SetNetwork({flag: 1, message: e.message})
                        setTimeout(()=>{
                            this.SetNetwork({flag: 0, message: ''})
                        },1800)
                    }
                }
            },
            fnfocus1() {
                if (this.platForm === 'Android') { // 安卓弹出键盘时不能向上推页面，iOS可以自动推起
                    let clientH = document.body.clientHeight;
                    let timer = setTimeout(() => {
                        if (clientH < 680) {
                            this.$refs.box.style.marginTop = '-65%';
                        } else {
                            this.$refs.box.style.marginTop = '-56%';
                        }
                        clearTimeout(timer)
                    }, 100);
                }
            },
            fnBlur1() {
                if (this.platForm === 'Android') { // 安卓弹出键盘时不能向上推页面，iOS可以自动推起
                    let timer = setTimeout(() => {
                        this.$refs.box.style.marginTop = 0;
                        clearTimeout(timer)
                    }, 100);
                }
            },
            checkPlatForm() {
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    //Ios
                    return 'iOS'
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    //Android终端
                    return 'Android'
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .container {
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
        z-index: 100;
    }

    .toast {
        width: 540px;
        border-radius: 40px;
        background-color: #fff;
        text-align: center;
        padding: 80px 0 60px;
        position: relative;

        .close {
            position: absolute;
            width: 60px;
            height: 60px;
            background: url("../resource/imgs/ex_popup_grey.png") no-repeat center center;
            background-size: 36px 36px;
            right: 16px;
            top: 16px;
        }

        header {
            h3 {
                font-size: 36px;
                font-weight: 600;
                color: #000000;
                line-height: 44px;
            }
        }
        main {
            margin-top: 50px;
            input {
                width: 476px;
                height: 90px;
                background: #F1F3F8;
                border-radius: 24px;
                font-size: 30px;
                font-weight: 600;
                color: #000000;
                text-align: center;
            }
            ::placeholder {
                color: #C7D1DA;
            }
        }
        footer {
            width: 360px;
            height: 100px;
            background: #6332F8;
            border-radius: 50px;
            margin: 0 auto;
            margin-top: 80px;
            font-size: 30px;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 100px;
        }
    }

    .show {
        animation: dance 1.3s;
    }

    @keyframes dance {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>

