import * as types from './types'
export default {
  [types.CHANGE_ACTIVE]: (state, payload) => {
       
        switch (payload) {
            case 1:
                state.changeActive = 1;
                break;
            case 2:
                state.changeActive = 2;
                break;
            case 3:
                state.changeActive = 3;
                break;
            
        }
    },
    // 存储用户信息
    [types.USERINFO]:(state,payload)=>{
        console.log(payload)
        state.userinfo =  payload
    }
    
}
