import { ChannelMessage, Session, Socket } from "@heroiclabs/nakama-js";

let nakamaSocket: Socket = null
let session: Session = null;

//世界频道id
let worldChannelId = "";
const worldChannelName = "world"

export function initChat(socket: Socket,asession: Session){
    nakamaSocket = socket
    session = asession

     //socket绑定回调函数
     nakamaSocket.onchannelmessage = onchannelmessage
}


//接收消息
function onchannelmessage(message: ChannelMessage){
    console.log("Received a message on channel: %o", message.channel_id);
    console.log("Message content: %o", message.content);
    console.log("Message all: ", message);
}

//加入世界频道
export async function joinWorldChat():Promise<string>{
    worldChannelId = await joinRoomChat(worldChannelName)
    return worldChannelId;
}

//发送世界频道信息
export async function sendWorldMsg(data: object){
    const messageAck = await nakamaSocket.writeChatMessage(worldChannelId, data);
}


// 1 = Room, 2 = Direct Message, 3 = Group
export async function joinRoomChat(roomname: string): Promise<string> {
    const persistence = true;
    const hidden = false;
    const response = await nakamaSocket.joinChat(roomname,1, persistence, hidden);
    console.log("Now connected to channel id: '%o'", response.id)
    return response.id
}

//Each user who joins a chat becomes a "presence" in the chat channel
