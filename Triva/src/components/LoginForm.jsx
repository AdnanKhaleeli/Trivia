import { useState, useContext } from "react"
import UserContext from "./UserContext";


export default function LoginForm({setIsOpen}) {

    const [email, setEmail] = useState();  
    const [pwd, setPwd] = useState()
    
    const { user, setUser } = useContext(UserContext);

    async function handleSubmit(e) {
        e.preventDefault();

        const userData = {email: email, pwd: pwd};

        const response = await fetch("http://192.168.12.172:5185/api/Login", 
        { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
        }

        )
        if (response.ok) {
            setIsOpen(false);
            const data = await response.json();

            console.log(data);

            setUser(data);

     

        } else {
            alert("User Not Found. Invalid Credentials");
        }

    



    }

    return (
        <> 
        
        <form onSubmit={(e) => handleSubmit(e)} className="overflow-y-auto flex-grow flex flex-col justify-around gap-y-4 px-4" >

      
        <input className="mx-2 p-1" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email "  value={email} required /> 
        <input className="mx-2 p-1" onChange= {( e) => setPwd(e.target.value)} type="password" placeholder="Enter your password" required/>


        <button className=" p-2 mx-auto rounded hover:bg-green-800" type="submit" > Submit</button>
        </form>
        
        </>
    )
}