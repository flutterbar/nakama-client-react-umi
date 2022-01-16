/**
 * инфраструктура сетевых подключений
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


 //Инициализировать сетевое подключение
 export function initNetWork(dispatch: Function) {
    storeDiapatch = dispatch
    nakamaClient = new Client("defaultkey", "172.31.221.37", "7350", false )

    //получить сеанс от локального 
    const sessionJson = getLocalStore("nakama-session")
    if(sessionJson){
        const newSession = JSON.parse(sessionJson)
        console.log("Сессия получена из магазина",newSession)
        session = new Session(newSession.token, newSession.refresh_token, newSession.created)
        storeDiapatch({type:"connect/setSession",payload:{session}})
        //открыть API 
        startApi()
    }
}

//Открытое сокетное соединение 
export async function startSocket() {
    nakamaSocket = nakamaClient.createSocket();
    session = await nakamaSocket.connect(session,true);
    console.info("****Socket connected.");
    initChat(nakamaSocket,session)
}

//открыть API-соединение 
function startApi(){
    initAccount(nakamaClient,session)
}


//Аутентификация входа по электронной почте 
export async function authByEmail(params) {
    // var email = "217@163.com";
    // var password = "c77882507788";
    var create = true;
    var nickname = params.email+"прозвище"
    //Если его нет, создайте новый 
    const sess = await nakamaClient.authenticateEmail(params.email, params.password, create, nickname)
    session = sess
    console.debug("logins Succes", session);
    //session записать в локальный кеш 
    setLocalSore("nakama-session",session)
    //включи api
    startApi()
    return session
}


