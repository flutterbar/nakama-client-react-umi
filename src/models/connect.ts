import { getAccount, loginByEmail } from '../infra/net'

import {Session} from "@heroiclabs/nakama-js";
import { message } from 'antd';
import { ApiAccount } from '@heroiclabs/nakama-js/dist/api.gen';
export interface Iconnect {
    status: number;
    session?: Session;
    account?: ApiAccount
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
                
                const account = yield call(getAccount)

                yield put({type:"setSession",payload:{session,account}})

            }catch (e) {
                message.error("账号密码错误")
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
            state.account = payload.account;
        },
        logOut(state,{payload}){
            return {}
        }
    }
}