import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = res.json;

        if(res.status === 400 || !data){
            window.alert("Invalid credentials");
        } else{
            window.alert("Login succesful");
            navigate("/");
        }

    }


    return (
        <>
            <section className="sign-in">
                <div className="container mt-5">
                    <div className="signin-content">
                        <div className="signin-form">
                            <h2 className="form-title">Sign In</h2>
                            <form method="POST" className="registration-form" id="registration-form">
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i class="zmdi zmdi-email"></i>
                                    </label>
                                    <input type="text" name="email" id="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i class="zmdi zmdi-lock"></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off" vale={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your Password" />
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" value="Login" onClick={loginUser} />
                                </div>
                            </form>
                            <NavLink to="/signup" className="signup-image-link">Create an account here</NavLink> 
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;