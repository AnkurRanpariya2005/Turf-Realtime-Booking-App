const initialState = {
    token:localStorage.getItem("token") || null, 
    loading:false, 
    error:null, 
    user:null
};

export const authReducer = (state = initialState, action) => {

    switch(action.type){
        case 'LOGIN_REQUEST':
            return {...state, loading:true, error:null}
        case 'LOGIN_SUCCESS':
            return {...state, token:action.payload.token, user:action.payload, loading:false, error:null}
        case 'LOGIN_FAILURE':
            return {...state, token:null,loading:false, error:action.payload}
        
        case 'REGISTER_USER_REQUEST':
            return {...state, loading:true, error:null}
        case 'REGISTER_USER_SUCCESS':
            return {...state, token:action.payload.token, user:action.payload , loading:false, error:null}
        case 'REGISTER_OWNER_FAILURE':
            return {...state, token:null, error:action.payload}

        case 'REGISTER_OWNER_REQUEST':
            return {...state, loading:true, error:null}
        case 'REGISTER_OWNER_SUCCESS':
            return {...state, token:action.payload.token, loading:false, error:null}
        case 'REGISTER_USER_FAILURE':
            return {...state, token:null,loading:false, error:action.payload}

        case 'LOGOUT_REQUEST':
            return {...state, loading:true, error:null}
        case 'LOGOUT_SUCCESS':
            return { token:null, user:null, loading:false, error:null};

        case 'GET_PROFILE_SUCCESS':
            return {...state, user:action.payload.token, loading:false, error:null}

        case 'GET_PROFILE_REQUEST':
            return {...state, loading:true, error:null}

        case 'GET_PROFILE_FAILURE':
            return {...state, user:null, loading:false, error:action.payload}
        default:
            return state
    }
}