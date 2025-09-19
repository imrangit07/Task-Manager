import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        token:null,
    },
    reducers:{
        setAuth:(state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
            localStorage.setItem("token",action.payload.token)
        },

        logout:(state,action)=>{
            state.user=null;
            state.token=null;
            localStorage.removeItem("token");
        }
    },
});

export const {setAuth,logout}=authSlice.actions;
export default authSlice.reducer