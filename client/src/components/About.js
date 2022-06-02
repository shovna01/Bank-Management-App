import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shovnaPic from '../images/shovnaPic.jpg';
import pic1 from '../images/pic1.jpg';
import pic2 from '../images/pic2.jpg';

const About = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    const callAboutPage = async() => {
        try{
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);
            setUserData(data);

            if(!res.status===200){
                const error = new Error(res.error);
                throw error;
            }
        } catch(err){
            console.log(err);
            navigate("/login");
        }
    }

    useEffect(() => {
      callAboutPage();
    }, []);
    
    return (
        <>
            <div className="container user-profile">
                <form method="">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="col-md-4">
                                <img src={userData.name === "sun" ? pic2 : pic1} alt="userpic" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>{userData.name}</h5>
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggles="tab" href="#home" role="tab" aria-controls="home">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggles="tab" href="#profile" role="tab" aria-controls="profile">Account Details</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            
                        </div>
                        <div className="col-md-8 pl-5 about-info">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Account Number</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.accountnumber}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.name}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.email}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.phone}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Account Number</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.accountnumber}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Savings</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>342563</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Latest Transaction</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>123242</p>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default About;