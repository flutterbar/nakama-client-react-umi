import { getAccount, loginByEmail, readStorageObjects, writeStorageObjects } from '../infra/net'

import { Session, StorageObjects } from '@heroiclabs/nakama-js';
import { message } from 'antd';
import { ApiAccount } from '@heroiclabs/nakama-js/dist/api.gen';
import { IplayerInfo } from '../dto/player';
export interface Iconnect {
    status: number;
    session?: Session;
    account?: ApiAccount
    playerInfo?: IplayerInfo;
}

let init: Iconnect = {
    status: 0,
}

export default {
    namespace: 'connect',

    state: init,
    effects: {

        *fetchLogin({ payload }, { call, put }) {
            try {
                const session = yield call(loginByEmail,payload)
                yield put({type:"setSession",payload:{session}})
                yield put({type:"fetchAccount"})

            }catch (e) {
                message.error("账号密码错误")
            }
        },

        *fetchAccount({ payload }, { call, put }){
            try {                
                const account = yield call(getAccount)
                yield put({type:"setAccount",payload:{account}})
            }catch (e) {
                console.error(e)
                message.error("session失效",e)
                yield put({type:"logOut"})
            }
        },

        *fetchWriteObjects({ payload }, { call, put }){
            try {
                const session = yield call(writeStorageObjects,payload)
            }catch (e) {
                message.error("写入数据错误")
            }
        },
        *fetchReadObjects({ payload }, { call, put }){
            try {
                const result: StorageObjects = yield call(readStorageObjects,payload.data)
                if(!result.objects || result.objects.length == 0){
                    return 
                }
                console.log(result.objects)
                switch (payload.readName){
                    case "playerInfo":
                         yield put({type:"setPlayerInfo",payload:result.objects[0].value})
                         break;
                }
            }catch (e) {
                message.error("读取数据错误")
            }
        },
    },
    reducers: {
        add(state, action) {
            //启动immer的写法
            state.status = state.status + action.payload;
        },
        setSession(state,{payload}){
            state.session = payload.session;
        },
        setAccount(state,{payload}){
            state.account = payload.account;
        },
        logOut(state,{payload}){
            return {}
        },

        setPlayerInfo(state,{payload}){
            state.playerInfo = payload
        }

    }
}