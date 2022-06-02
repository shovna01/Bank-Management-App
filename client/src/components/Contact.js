import React, {useEffect, useState} from 'react';

const Contact = () => {

    const [userData, setUserData] = useState({name:"", email:"", phone:"", accountnumber:"", message:""});

    const callContactPage = async() => {
        try{
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    //Accept: "application/json",
                    "Content-Type": "application/json"
                },
                //credentials: "include"
            });

            const data = await res.json();
            console.log(data);
            setUserData({...userData, name:data.name, email:data.email, phone:data.phone, accountnumber:data.accountnumber});

            if(!res.status===200){
                const error = new Error(res.error);
                throw error;
            }
        } catch(err){
            console.log(err);
            //navigate("/login");
        }
    }

    useEffect(() => {
      callContactPage();
    }, []);

    
    //storing dynmaic data in state
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]:value});
    }


    //sending data to backend
    const handleContactFormSubmission = async(e) => {
        e.preventDefault();
        const {name, email, phone, accountnumber, message} = userData;

        const res = await fetch('/contact', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, accountnumber, message
            })
        });

        const data = await res.json(); //so that it does not get into the pending stage
        
        if(!data){
            console.log("Message not sent");
        } else{
            alert("Message sent succesfully!");
            setUserData({...userData, message: ""});
        }
    }


    return (
        <>
            <div className="contact_info">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 d-flex justify-content-around">
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <i class="zmdi zmdi-phone"></i>
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Phone Number
                                    </div>
                                    <div className="contact_info_text">
                                        +91 8928810671
                                    </div>
                                </div>
                            </div>
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <i class="zmdi zmdi-email"></i>
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Email
                                    </div>
                                    <div className="contact_info_text">
                                        shovnapanda01@gmail.com
                                    </div>
                                </div>
                            </div>
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <i class="zmdi zmdi-home"></i>
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Address
                                    </div>
                                    <div className="contact_info_text">
                                        GITC, Navi Mumbai
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact_form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="contact_form_container py-5">
                                <div className="contact_form_title">
                                    Get in touch!
                                </div>
                                <form method="POST" id="contact_form">
                                    <div className="contact_form_name d-flex justify-content-between align-items-between">
                                        <input type="text" id="contact_form_name" className="contact_form_name input_field" name="name" value={userData.name} onChange={handleInput} placeholder="Your name" required="true" />
                                        <input type="email" id="contact_form_email" className="contact_form_email input_field" name="email" value={userData.email} onChange={handleInput} placeholder="Your email" required="true" />
                                        <input type="number" id="contact_form_number" className="contact_form_number input_field" name="phone" value={userData.phone} onChange={handleInput} placeholder="Your phone number" required="true" />
                                        <input type="text" id="contact_form_accountnumber" className="contact_form_accountnumber input_field" name="accountnumber" value={userData.accountnumber} onChange={handleInput} placeholder="Your Account number" required="true" />
                                    </div>
                                    <div className="contact_form_text mt-4">
                                        <textarea className="text_field contact_form_message" name="message" value={userData.message} onChange={handleInput} placeholder="Message" cols="122" rows="10"></textarea>
                                    </div>
                                    <div className="contact_form_button">
                                        <button type="submit" className="button contact_submit_button" onClick={handleContactFormSubmission}>
                                            Send Message
                                        </button> 
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact;