import React, {useState, useEffect} from 'react';

const Home = () => {

    const [userName, setUserName] = useState('');
    const [show, setShow] = useState(false);
    
    const callHomePage = async() => {
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
            setUserName(data.name);
            setShow(true);
    
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
        callHomePage();
    }, []);

    return (
        <>
            <div className="home-page">
                <div className="home-div">
                    <h3 className="pt-5">WELCOME <strong>{userName}</strong> to Your ONLINE BANK MANAGEMENT</h3>
                    <p className="home-div-text"> { show ? "Happy to see you back" : "Join us today for a hassle-free experience of the bank at your fingertips!"}</p> 
                </div>
            </div>
            
        </>
    )
}

export default Home;
