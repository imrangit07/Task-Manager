import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"task",
    initialState:{
       tasks:[]
    },
    reducers:{
        setTasks:(state,action)=>{
            state.tasks=action.payload;
        },
        addTasks:(state,action)=>{
            state.tasks.push(action.payload);
        },
        updateTasks:(state,action)=>{
            const index = state.tasks.findIndex(t=>t._id === action.payload._id);
            if(index !== -1)
            {
                state.tasks[index]= action.payload
            }
        },
        deleteTasks:(state,action)=>{
            state.tasks = state.tasks.filter(t=>t._id === action.payload);
        },
    },
});

export const {setTasks,addTasks,updateTasks,deleteTasks}=authSlice.actions;
export default authSlice.reducer