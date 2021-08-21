/**
 * 网络连接基础设施
 */
import { Client,Session } from "@heroiclabs/nakama-js";
import { ApiAccount } from "@heroiclabs/nakama-js/dist/api.gen";
let storeDiapatch = {}
let nakamaClient: Client = null;
let session:Session = null;
//初始化
export function netInit(dispatch: Function) {
    storeDiapatch = dispatch
    nakamaClient = new Client("defaultkey", "127.0.0.1", "7350", false)
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
    return session
}

//获得账号信息
export async function getAccount():Promise<ApiAccount> {
    const account = await nakamaClient.getAccount(session)
    return account
}