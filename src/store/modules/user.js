const user = {
    state: {
        info: {
            likeTimes:-1
        },
        ticketNum: 0,
    },
    mutations: {
        SET_INFO: (state, {combo = 0, maxCombo = 0,totalCoins = 0, voucher=0,questStatus=0,finQuest = 0 , head = '', likeTimes = 0 , likedCount = 0 , nickName = '' , signUp = false , todayLike = '', myRank=''}={}) => {
            // error 的时候直接重置
            state.info = {combo,maxCombo,totalCoins,questStatus,finQuest,head,likeTimes,likedCount,nickName,signUp,todayLike,voucher,myRank}
        },
        SET_LIKE_TIMES: (state,status) => {
            state.info.likeTimes = status;
        },
        SET_TICKET_NUM: (state,num) => {
            state.ticketNum = num;
        }
    },
    actions: {
        SetInfo ({ commit }, status) {
            commit('SET_INFO', status)
        },
        SetLikeTimes ({ commit }, status){
            commit('SET_LIKE_TIMES', status)
        },
        SetTicketNum ({ commit }, num){
            commit('SET_TICKET_NUM', num)
        }
    }
}

export default user
