import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        accountnumber:"",name:"",email:"",phone:"",password:"",cpassword:""
    });

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name= e.target.name;
        value=e.target.value;
        setUser({...user, [name] : value});

    }

    const postData = async(e) => {
        e.preventDefault();
        const {accountnumber, name, email, phone, password, cpassword} = user;
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                accountnumber, name, email, phone, password, cpassword
            })
        });

        const data = await res.json();
        
        if(data.status === 422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        } else{
            window.alert("Registration succesful");
            console.log("Registration succesful");
            navigate("/login");
        }
    }

    return (
        <>
            <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign Up</h2>
                            <form method="POST" className="registration-form" id="registration-form">
                                <div className="form-group">
                                    <label htmlFor="accountnumber">
                                        <i class="zmdi zmdi-dot-circle"></i>
                                    </label>
                                    <input type="text" name="accountnumber" id="accountnumber" autoComplete="off" value={user.accountnumber} onChange={handleInputs} placeholder="Your Account Number" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i class="zmdi zmdi-account"></i>
                                    </label>
                                    <input type="text" name="name" id="name" autoComplete="off" value={user.name} onChange={handleInputs} placeholder="Your Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i class="zmdi zmdi-email"></i>
                                    </label>
                                    <input type="text" name="email" id="email" autoComplete="off" value={user.email} onChange={handleInputs} placeholder="Your Email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">
                                        <i class="zmdi zmdi-phone-in-talk"></i>
                                    </label>
                                    <input type="text" name="phone" id="phone" autoComplete="off" value={user.phone} onChange={handleInputs} placeholder="Your Phone Number" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i class="zmdi zmdi-lock"></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off" value={user.password} onChange={handleInputs} placeholder="Your Password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cpassword">
                                        <i class="zmdi zmdi-lock"></i>
                                    </label>
                                    <input type="password" name="cpassword" id="cpassword" autoComplete="off" value={user.cpassword} onChange={handleInputs} placeholder="Confirm Your Password" />
                                </div>

                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="Register" onClick={postData} />
                                </div>
                            </form>
                            <NavLink to="/login" className="signup-image-link">I have already registered</NavLink> 
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup;