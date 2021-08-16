
export interface Iconnect {
    status: number;
}

let init: Iconnect = {
    status: 0,
}

export default {
    namespace: 'connect',
  
    state:init,
    effects: {

    },
    reducers:{
        add(state,action){
            //启动immer的写法
            state.status = state.status +  action.payload;
        }
    }
}