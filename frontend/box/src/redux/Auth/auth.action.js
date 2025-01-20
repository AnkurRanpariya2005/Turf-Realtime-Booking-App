import axios from 'axios';
import { api, API_BASE_URL } from '../../config/api';
import { GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_OWNER_FAILURE, REGISTER_OWNER_REQUEST, REGISTER_OWNER_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from './auth.actionType';
import { toast } from 'react-toastify';



export const loginUserAction = (loginData) => async(dispatch) => {
    dispatch({type:LOGIN_REQUEST})
    try {

        const {data} = await axios.post(`${API_BASE_URL}/api/auth/login`, loginData.data);
        if(data.success==true){
            console.log(data,"@@@@@@@@@@@@@@@@@@@@@")
            if(data.data.token){
                localStorage.setItem('token', data.data.token)
            }
            toast.success(data.message)    
            dispatch({type:LOGIN_SUCCESS, payload:data.data})
        }
        else{
            dispatch({type:LOGIN_FAILURE, payload:error})
            toast.error("Wrong Credentials")
        }
        
    } catch (error) {
        toast.error("Wrong Credentials")
        dispatch({type:LOGIN_FAILURE, payload:error})
    }
}

export const registerUserAction = (registerData) => async(dispatch) => {
    dispatch({type:REGISTER_USER_REQUEST})
    try {

        const {data} = await axios.post(`${API_BASE_URL}/api/auth/register/user`, registerData.data);
        if(data.success==true){
            if(data.data.token){
                localStorage.setItem('token', data.data.token)   
            }
            toast.success(data.message)
            dispatch({type:REGISTER_USER_SUCCESS, payload:data.data})
        
        }
        else{
            dispatch({type:REGISTER_USER_FAILURE, payload:data.token})
            toast.error(data.message)
        }
    } catch (error) {
        console.log("Authhhhhhhhhhhhhhhh",error);
        dispatch({type:REGISTER_USER_FAILURE, payload:error})
    }
}

export const registerOwnerAction = (registerData) => async(dispatch) => {
    dispatch({type:REGISTER_OWNER_REQUEST})
    try {

        const {data} = await axios.post(`${API_BASE_URL}/api/auth/register/owner`, registerData.data);
        if(data.success==true){
            if(data.data.token){
                localStorage.setItem('token', data.data.token)   
            }
            toast.success(data.message)
            dispatch({type:REGISTER_OWNER_SUCCESS, payload:data})
        }
        else{
            dispatch({type:REGISTER_OWNER_FAILURE, payload:data.message})
            toast.error(data.message)
        }
        
        
    } catch (error) {
        console.log("Authhhhhhhhhhhhhhhh",error);
        dispatch({type:REGISTER_OWNER_FAILURE, payload:error})
    }
}


export const getProfileAction = (jwt) => async(dispatch) => {
    dispatch({type:GET_PROFILE_REQUEST})
    try {

        const {data} = await axios.get(`${API_BASE_URL}/user/profile`,{
            headers:{
                "Authorization": `Bearer ${jwt}`
            }
        });

        console.log("profile done", data);

        dispatch({type:GET_PROFILE_SUCCESS, payload:data})
        
    } catch (error) {
        console.log("Authhhhhhhhhhhhhhhh",error);
        dispatch({type:GET_PROFILE_FAILURE, payload:error})
    }
}


export const updateProfileAction = (requestData) => async(dispatch) => {
    dispatch({type:UPDATE_PROFILE_REQUEST})
    try {
        console.log("*************************************")
        const {data} = await api.put(`${API_BASE_URL}/user/update`,requestData);

        console.log("update_profile done", data);

        dispatch({type:UPDATE_PROFILE_SUCCESS, payload:data})
        
    } catch (error) {
        console.log("Authhhhhhhhhhhhhhhh",error);
        dispatch({type:UPDATE_PROFILE_FAILURE, payload:error})
    }
}

export const LogoutAction = () => async (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST }); // Start the logout process
  
    try {
      localStorage.removeItem("token"); // Remove the JWT from local storage
      dispatch({ type: LOGOUT_SUCCESS }); // Successfully logged out
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


