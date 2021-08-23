import React from "react";
import styles from "./index.less";
import { connect } from "dva";
import { Iconnect } from "@/models/connect";
import { initNetWork } from "@/network/init";
import { Button, Form, Input } from "antd";
import { NavLink } from 'umi';
import { ApiReadStorageObjectsRequest } from "@heroiclabs/nakama-js/dist/api.gen";
import { WriteStorageObject } from "@heroiclabs/nakama-js";
import { IplayerInfo } from '../dto/player';
export interface IindexProps {
  connect: Iconnect;
  dispatch: Function;
  isLoading: boolean;
}

@connect(
  ({ connect, loading }: { connect: Iconnect; loading: IdvaLoading }) => ({
    isLoading: loading.models["connect"],
    connect: connect,
  })
)
export default class IndexPage extends React.Component<any, IindexProps> {
  constructor(props) {
    super(props);
    console.log("props", props);
   
    initNetWork(props.dispatch);

    //获得账号信息
    props.dispatch({type: "connect/fetchAccount"})
  }

  render() {
    const { status } = this.props.connect;
    return (
      <div>
        {this.props.connect.account? this.renderLobby():this.renderLogin()}    
      </div>
    );
  }

  //渲染大厅页面
  renderLobby(){
    const {connect} = this.props
    return (<div>
       <Button onClick={this.onClickLoginOut}>登出</Button>

      {connect.session && (
          <div>
              token信息 ：
              <div>{JSON.stringify(connect.session)}</div>
          </div>
          
        )}

        {connect.account && (
          <div>
            用户基础信息：
            <div>{JSON.stringify(connect.account)}</div>
          </div>
        )}

        {/* 玩家信息 */}
        {connect.playerInfo && (
           <div>
           玩家信息：
           <div>{JSON.stringify(connect.playerInfo)}</div>
         </div>
        )}

        <Button onClick={this.onClickRead}>读取玩家信息</Button>

        <Button onClick={this.onClickWrite}>写入玩家信息</Button>

        <div>
          <div>菜单栏</div>
          <NavLink to="/Friend">好友</NavLink>
        </div>
    </div>)
  }

  //渲染登陆
  renderLogin(){
    return (<div style={{margin:10}}>
      <div>登陆模块</div>
      <Form  onFinish={this.onClickLogin} name="登陆">
        <Form.Item label="账号（邮箱）" name="email"   rules={[{ required: true, max: 20 }]}>
          <Input />
        </Form.Item>
        <Form.Item label="密码" name="password"   rules={[{ required: true, max: 20 }]}>
        <Input />
        </Form.Item>
        <Button style={{ marginLeft: 10 }} type="primary" htmlType="submit">
            登陆
            </Button>
      </Form>
    </div>)
  }

  onClickLogin = (values) => {
    console.log("values",values)
    this.props.dispatch({ type: "connect/fetchLogin",payload:values });
  };
  onClickLoginOut = ()=>{
    this.props.dispatch({ type: "connect/logOut" });
  }

  onClickRead = ()=>{

    let readData: ApiReadStorageObjectsRequest = {
      object_ids:[{
        collection:"player",
        key:"baseInfo",
        user_id:this.props.connect.session.user_id
      }]
    }
    this.props.dispatch({ type: "connect/fetchReadObjects",payload:{readName:"playerInfo",data:readData}})
  }

  onClickWrite = ()=>{
    let baseInfo: IplayerInfo = {
      exp: 10,
      atk:10,
      level:1,
      wins:1,
      fail:1,
      pets: 100,
    }
    let writeData: Array<WriteStorageObject> = [
      {
        collection:"player",
        key:"baseInfo",
        value:baseInfo
      }
    ]
    this.props.dispatch({type:"connect/fetchWriteObjects",payload:writeData})
  }

}
