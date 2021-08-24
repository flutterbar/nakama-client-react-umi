/**
 * 网络连接基础设施
 */
 import { Client,Session, Socket, StorageObjects, WriteStorageObject } from "@heroiclabs/nakama-js";
 import { ApiAccount, ApiReadStorageObjectsRequest } from "@heroiclabs/nakama-js/dist/api.gen";
 import { ChannelMessage } from "@heroiclabs/nakama-js/dist/socket";
 import { getLocalStore, setLocalSore } from '@/infra/utils';
 import {initChat} from '@/network/socket/chat'
 import {initAccount} from '@/network/api/account'
 let storeDiapatch = null;
 let nakamaClient: Client = null;
 let session:Session = null;
 let nakamaSocket: Socket = null


 //初始化网络连接
 export function initNetWork(dispatch: Function) {
    storeDiapatch = dispatch
    nakamaClient = new Client("defaultkey", "127.0.0.1", "7350", false )

    //从本地获得session
    const sessionJson = getLocalStore("nakama-session")
    if(sessionJson){
        const newSession = JSON.parse(sessionJson)
        console.log("从store获得的session",newSession)
        session = new Session(newSession.token, newSession.refresh_token, newSession.created)
        storeDiapatch({type:"connect/setSession",payload:{session}})
        //开启api
        startApi()
    }
}

//开启socket连接
export async function startSocket() {
    nakamaSocket = nakamaClient.createSocket();
    session = await nakamaSocket.connect(session,true);
    console.info("****Socket connected.");
    initChat(nakamaSocket,session)
}

//开启api连接
function startApi(){
    initAccount(nakamaClient,session)
}


//邮箱登陆认证
export async function authByEmail(params) {
    // var email = "217@163.com";
    // var password = "c77882507788";
    var create = true;
    var nickname = params.email+"的昵称"
    //如果不存在，则新建
    const sess = await nakamaClient.authenticateEmail(params.email, params.password, create, nickname)
    session = sess
    console.debug("logins Succes", session);
    //session写入本地缓存
    setLocalSore("nakama-session",session)
    //开启api
    startApi()
    return session
}


