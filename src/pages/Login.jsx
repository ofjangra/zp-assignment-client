import { useState } from 'react';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { Box, Stack } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { handleAuthLoading, login } from '../store/userSlice';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Navigate } from 'react-router-dom';


const Login = () =>{

    const authState = useSelector((state) => state.user.auth)

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:{
            username:"",
            password:"",
        },
        validationSchema:Yup.object({
            username:Yup.string().required('Username is required'),
            password:Yup.string().required('Password is required')
        }),
        onSubmit:(values) =>{
            console.log(values)
            dispatch(handleAuthLoading(true))
            dispatch(login(values))
        }
    })

    const [passwordVisible, setPasswordVisible] = useState(false)

    return (
        <>
        { authState.authenticated ? 
            <section className="login_main">

                <div className="login">
                    <div className="userLogo">
                        <img src = "/images/ic_user.svg" alt = "user"/>
                    </div>

                    <h1>Welcome!</h1>
                    <p style = {{marginTop:"16px", marginBottom:"16px", textAlign:"center", color:"var(--text-blue)"}}>
                        Let's connect to your workspace.
                        <br/>
                        Please enter your email to continue.
                    </p>
                    <form id= "loginForm">
                        <Stack spacing={2}>
                            <TextField
                            size='small'
                            required
                            type = "text"
                            label = 'username'
                            value = {formik.values.username}
                            name = 'username'
                            {...formik.getFieldProps('username')}
                            error = {Boolean(formik.errors.username)}
                            helperText = {formik.errors.username ? formik.errors.username : null}
                            FormHelperTextProps={{
                                sx: {
                                  alignSelf:"flex-start",
                                },
                              }}
                            inputProps={{
                                sx: {
                                  color: 'var(--text-blue)',
                                },
                              }}
                            >
                            </TextField>
                            
                            <TextField
                            size='small'
                            required
                            type = {passwordVisible ? "text" : "password"}
                            label = 'password'
                            value = {formik.values.password}
                            name = 'password'
                            {...formik.getFieldProps('password')}
                            error = {Boolean(formik.errors.password)}
                            helperText = {formik.errors.password ? formik.errors.password : null}
                            FormHelperTextProps={{
                                sx: {
                                  alignSelf:"flex-start",
                                },
                              }}
                            InputProps = {{
                                sx: {
                                    color: 'var(--text-blue)',
                                  },
                                endAdornment:
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        edge="end"
                                      >
                                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                  
                            }}
                            >

                            </TextField>
                            
                    
                            <strong style={{alignSelf:'flex-end', color:"var(--fields-blue)", fontSize:"16px"}}>Forgot Password ?</strong>
                            <Button variant='contained' onClick={formik.submitForm} >
                                {
                                    authState.loading ? 
                                    <img src = "/images/loading.svg" alt = "loading" style = {{
                                        height:"32px"
                                    }}/> :
                                    "Submit"
                                }
                                </Button>
                        </Stack>
                    </form>
                </div>

                <footer className="login_footer">
                <span id = "logo_text" style = {{
                    color:"#728391"
                }}>
                        Powered by <img src = "/images/zaperon_logo.png" alt = "logo" style = {{marginLeft:"8px"}}/>
                    </span>
                    <div id = "support_actions">

                        <p>Need Help?</p>

                        <p style = {{marginLeft:"32px"}}>Privacy policy <span style={{color:"#A2A2A2"}}>&</span> terms</p>

                        </div>
                </footer>
            </section>
            : <Navigate to = "/"/>
              }
           
        </>
    )
}

export default Login