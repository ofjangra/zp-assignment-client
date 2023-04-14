import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';



const Login = () =>{

    const authState = useSelector((state) => state.user.auth)
    const userData = useSelector((state) => state.user.user)

    return (
        <>
        {
            !authState.authenticated ? <Navigate to = "/login"/> :
        
            <section className="login_main">

                <div className="login">
                    <div className="userLogo">
                        <img src = "/images/ic_user.svg" alt = "user"/>
                    </div>

                    <h1>Welcome! {userData.username}</h1>
                    <p style = {{marginTop:"16px", marginBottom:"16px", textAlign:"center", color:"var(--text-blue)"}}>
                        Let's connect to your workspace.
                        <br/>
                        Please enter your email to continue.
                    </p>
                   
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
        }
        </>
    )
}

export default Login