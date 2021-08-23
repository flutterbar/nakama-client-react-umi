import { ChannelMessage, Session, Socket } from "@heroiclabs/nakama-js";

let nakamaSocket: Socket = null
let session: Session = null;
export function initChat(socket: Socket,asession: Session){
    nakamaSocket = socket
    session = asession

     //socket绑定回调函数
     nakamaSocket.onchannelmessage = onchannelmessage
}


function onchannelmessage(message: ChannelMessage){
    console.info("message:",message)
}