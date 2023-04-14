import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import Layout from './Layout'
import './App.css'
import './index.css'
import { useEffect } from 'react'
import { getProfile } from './store/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { handleSnack } from './store/userSlice'
const App = () =>{
  const dispatch = useDispatch()
  const snackMessage = useSelector((state) => state.user.snack)
 

  useEffect(() =>{
    dispatch(getProfile())
  },[])


  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    dispatch(handleSnack({
        ...snackMessage,
        open:false
    }))
};



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  return (
    <>
    <Snackbar open={snackMessage.open} autoHideDuration={5000} onClose={handleSnackClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert severity={snackMessage.severity} sx={{ width: '100%' }} onClose={handleSnackClose}>
                <span>{snackMessage.message}</span>
            </Alert>
        </Snackbar>
    <BrowserRouter>
       <Layout/>
    </BrowserRouter> 
    </>
  )
}

export default App