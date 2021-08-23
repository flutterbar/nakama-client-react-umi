import { Client, Session, StorageObjects, WriteStorageObject } from "@heroiclabs/nakama-js";
import { ApiAccount, ApiReadStorageObjectsRequest } from "@heroiclabs/nakama-js/dist/api.gen";
import { getLocalStore, setLocalSore } from '@/infra/utils';

 let nakamaClient: Client = null;
 let session:Session = null;

export function initAccount(client: Client,assesion:Session){
    nakamaClient = client
    session = assesion
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

