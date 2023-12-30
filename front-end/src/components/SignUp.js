import {React,useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () =>{
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    },[])


    const collectData = async () =>{
        // console.log(name,email,password);
        let result = await fetch('http://localhost:2000/register',{
            method : 'post',
            body : JSON.stringify({name,email,password}),
            headers: {
                'Content-Type' : 'application/JSON'
            },
        });

        if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
          }
      

        result = await result.json();
        console.log("sssssssss" + result);
        if(result.result){
            localStorage.setItem("user",JSON.stringify(result.result));
            // localStorage.setItem("user",JSON.stringify(result.result));
            localStorage.setItem("token",JSON.stringify(result.auth));
            if(result.auth){
                navigate('/');
            }
        }
        
        
    }
    return(
        <div>
            <h1>Regisiter</h1>
            <input className = "inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name'/>
            <input className = "inputBox" type="text" value={email} onChange={(e) => setEmail(e.target.value)}placeholder='Enter Email'/>
            <input className = "inputBox" type="password" value={password} onChange={(e) => setPassword(e.target.value)}placeholder='Enter Passowrd'/>
            <button onClick={collectData} class= "appButton">SignUp</button>
        </div>
    )
}

export default SignUp;