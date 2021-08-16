import React from "react";
import styles from "./index.less";
import {connect} from "dva";
import { Iconnect } from "@/models/connect";

export interface IindexProps{
  connect: Iconnect;
  dispatch:Function;
}

@connect(
	({ connect, loading }: { connect: Iconnect; loading: IdvaLoading }) => ({
		isLoading: loading.models['connect'],
		connect:connect,
	})
)
export default class IndexPage extends React.Component<any,IindexProps> {

  constructor(props) {
    super(props);
    console.log("props",props);
    props.dispatch({type: "connect/add",payload: 2})
  }

  render() {
    const {status} = this.props.connect;
    return (
      <div>
        {/* <h1 className={styles.title}>Page index</h1> */}
        <h1 >{status}</h1>
      </div>
    );
  }
}
