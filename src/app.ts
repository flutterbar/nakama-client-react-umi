/*
 * @Description: 无
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2018-12-29 16:45:38
 * @LastEditors: hammercui
 * @LastEditTime: 2020-11-07 15:49:13
 */
import 'moment/locale/zh-cn';
//标准model结构
export interface StandardViewModelType {
	namespace: string;
	state: any;
	effects: {},
	reducers: {}
}

const dvaConf = {
	config: {
		onError(e) {
			e.preventDefault();
			console.error(e.message);
		}
	},
	plugins: []
};

//非生产模式
if (process.env.NODE_ENV != 'production') {
	dvaConf.plugins.push(
		require('dva-logger')({
			duration: false, // print the duration of each action?
			diff: false,
			level: 'info',
			predicate: (getState: Function, action: any) => {
				let type: string = action.type;
				if (type.startsWith('@@')) return false;
				return true;
			} // 是否过滤action
		})
	)
}

// module.exports = {
// 	dva,
// }
export const dva = dvaConf