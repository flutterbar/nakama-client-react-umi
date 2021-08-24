import {joinWorldChat, sendWorldMsg} from '@/network/socket/chat';
import {getChatHistory} from '@/network/api/account'
import { message } from 'antd';

export interface Ichat{
    worldState: number;
}
let init: Ichat = {
    worldState:0
}

export default {
    namespace: 'chat',

    state: init,
    effects: {

        *fetchJoinWorld({ payload }, { call, put }) {
            try {
                const worldChannelId = yield call(joinWorldChat)
                yield put({type:"updateWorldState",payload:1})
                //请求历史记录
            }catch (e) {
                message.error("加入世界频道错误！")
            }
        },
        *fetchSendWorld({ payload }, { call, put}){
            yield call(sendWorldMsg,payload)
        },
    },
    reducers: {
        updateWorldState(state, action) {
            //启动immer的写法
            state.worldState =  action.payload;
        },
        // setSession(state,{payload}){
        //     state.session = payload.session;
        // },
        // setAccount(state,{payload}){
        //     state.account = payload.account;
        // },
        // logOut(state,{payload}){
        //     return {}
        // },

        // setPlayerInfo(state,{payload}){
        //     state.playerInfo = payload
        // }

    }
}