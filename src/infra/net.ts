/**
 * 网络连接基础设施
 */
import { Client,Session, StorageObjects, WriteStorageObject } from "@heroiclabs/nakama-js";
import { ApiAccount, ApiReadStorageObjectsRequest } from "@heroiclabs/nakama-js/dist/api.gen";
import { getLocalStore, setLocalSore } from './utils';
let storeDiapatch = null;
let nakamaClient: Client = null;
let session:Session = null;
//初始化
export function netInit(dispatch: Function) {
    storeDiapatch = dispatch
    nakamaClient = new Client("defaultkey", "127.0.0.1", "7350", false )

    //从本地获得session
    const sessionJson = getLocalStore("nakama-session")
    if(sessionJson){
        const newSession = JSON.parse(sessionJson)
        console.log("从store获得的session",newSession)
        session = new Session(newSession.token, newSession.refresh_token, newSession.created)
        storeDiapatch({type:"connect/setSession",payload:{session}})
    }
}


//邮箱登陆
export async function loginByEmail(params) {
    // var email = "217@163.com";
    // var password = "c77882507788";
    var create = true;
    var nickname = params.email+"的昵称"
    //如果不存在，则新建
    const sess = await nakamaClient.authenticateEmail(params.email, params.password, create, nickname)
    session = sess
    console.debug("logins Succes", session);
    setLocalSore("nakama-session",session)
    //session写入本地缓存
    return session
}

//获得账号信息
export async function getAccount():Promise<ApiAccount> {
    const account = await nakamaClient.getAccount(session)
    return account
}

//write数据
export async function writeStorageObjects(objects: Array<WriteStorageObject>){

    await nakamaClient.writeStorageObjects(session,objects)
}

//read数据
export async function readStorageObjects(request: ApiReadStorageObjectsRequest): Promise<StorageObjects>{
    return nakamaClient.readStorageObjects(session,request)
}