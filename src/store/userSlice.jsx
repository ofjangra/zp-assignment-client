import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const login = createAsyncThunk(
    'login',
    async(body) =>{
        const response = await fetch('/api/signin',{
            method:"POST",
            headers:{
                "content-Type":"application/json",
            },
            body:JSON.stringify(body),
            credentials:"include"
        })

        const jsonResponse = await response.json()
        console.log(jsonResponse)
        return jsonResponse
    }
)

const getProfile = createAsyncThunk(
    'getProfile',
    async () =>{
        console.log('i am called')
        const response = await fetch("/api",
        {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
        })
        let responseJson = await response.json()
        console.log(responseJson)
        return responseJson
    }
)



const userSlice = createSlice({
    name:'user',
    initialState:{
        auth:{
            authenticated:false,
            error:"",
            loading:false
        },
        user:{
            username:""
        },
        snack:{
            open: false,
            severity: "",
            message: ""
        },
    },
    reducers:{
        handleAuthLoading:(state, action) =>{
            state.auth.loading = action.payload
        },
        handleSnack(state, action){
            state.snack = action.payload
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(login.fulfilled, (state, action) =>{
            state.user = action.payload.user
            state.auth = {
                authenticated:true,
                error:"",
                loading:false,
            },
            state.snack = {
                open: true,
                severity: "success",
                message: action.payload.message
            }
        }),
        builder.addCase(login.rejected, (state, action) =>{
            state.auth = {
                authenticated:false,
                error:"Something went wrong",
                loading:false,
            },
            state.snack = {
                open: true,
                severity: "error",
                message: "Something went wrong"
            }
        }),
        builder.addCase(getProfile.fulfilled, (state, action) =>{
            state.user = action.payload.user
            state.auth = {
                authenticated:true,
                error:"",
                loading:false,
            }
        }),
        builder.addCase(getProfile.rejected, (state, action) =>{
            state.auth = {
                authenticated:false,
                error:"Something went wrong",
                loading:false,
            }
        })
    }
})

export default userSlice.reducer

export {login, getProfile}

export const { handleAuthLoading, handleSnack } = userSlice.actions
