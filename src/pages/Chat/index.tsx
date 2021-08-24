import React from "react";
import styles from "./index.less";
import { connect } from "dva";
import { Iconnect } from "@/models/connect";
import { initNetWork } from "@/network/init";
import { Button, Form, Input, Tabs } from "antd";
import { NavLink } from 'umi';
import { ApiReadStorageObjectsRequest } from "@heroiclabs/nakama-js/dist/api.gen";
import { WriteStorageObject } from "@heroiclabs/nakama-js";
import chat, { Ichat } from './models/chat';
const { TabPane } = Tabs;

interface IchatPros{
    chat: Ichat;
    dispatch: Function;
    isLoading: boolean;
}

@connect(
    ({ chat, loading }: { chat: Ichat; loading: IdvaLoading }) => ({
      isLoading: loading.models["chat"],
      chat: chat,
    })
  )
export default class ChatPage extends React.Component<any, IchatPros> {
    constructor(props) {
        super(props)

        //加入世界频道
        props.dispatch({type:"chat/fetchJoinWorld"})

    }

    render(){
        return <div>
            聊天页面
            <NavLink to="/">首页</NavLink>
        <Tabs tabPosition={'left'}>
          <TabPane tab="世界频道" key="1">
           {this.renderWorldChat()}
          </TabPane>
          <TabPane tab="工会" key="2">
            Content of Tab 2
          </TabPane>
          <TabPane tab="私聊" key="3">
            Content of Tab 3
          </TabPane>
        </Tabs>
        </div>
    }

    renderWorldChat(){
        const chat: Ichat = this.props.chat;
        let stateValue = "未连接"
        if(chat.worldState == 1){
            stateValue = "已连接"
        }
        return <div>
            世界频道聊天列表({stateValue})
            <div>聊天区</div>
            <Button onClick={this.onClickSendWorld}>发送</Button>
        </div>
    }

    onClickSendWorld = ()=>{
        const {dispatch}= this.props
        dispatch({type: "chat/fetchSendWorld",payload:{data:"这是一个世界聊天"}})
    }
}