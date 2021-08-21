import React from "react";
import styles from "./index.less";
import { connect } from "dva";
import { Iconnect } from "@/models/connect";
import { netInit } from "@/infra/net";
import { Button, Form, Input } from "antd";
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
    // props.dispatch({type: "connect/add",payload: 2})
    netInit(props.dispatch);
  }

  render() {
    const { status } = this.props.connect;
    return (
      <div>
        {/* <h1 className={styles.title}>Page index</h1> */}
        <Button onClick={this.onClickLoginOut}>登出</Button>
        {!this.props.connect.account && this.renderLogin()}
        
        {/* <Button type="primary" onClick={this.onClickLogin} size="large">
          登陆
        </Button> */}
        {this.props.connect.session && (
          <div>{JSON.stringify(this.props.connect.session)}</div>
        )}

        {this.props.connect.account && (
          <div>
            玩家基础信息：
            <div>{JSON.stringify(this.props.connect.account)}</div>
          </div>
        )}
      </div>
    );
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
}
