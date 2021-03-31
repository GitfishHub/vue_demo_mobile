import * as types from './types'
export default {
   
    changeActive: ({ commit, state }, payload) => {
        commit(types.CHANGE_ACTIVE, payload)
    },
    userinfo :({commit, state},payload)=>{
        commit(types.USERINFO, payload)
    }
    
}
