import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import Modal from "./Modal";
import UserContext from "./UserContext";
import JoinTeamModal from "./JoinTeamModal";


export default function Nav() {

    const[isOpen, setIsOpen] = useState(false); 
    const [isJoinTeamOpen, setIsJoinTeamOpen] = useState(false);
    const {user, setUser} = useContext(UserContext);
    


    

    function handleJoinTeam() {
      setIsJoinTeamOpen(true);
    }

    function triggerAccountModal() {

        setIsOpen(true);
        console.log("Model Triggered"); 

    }

  
  return (
    <>
    <nav className="w-[90vw]text-lg shadow-2xl sticky top-0 bg-black  text-white p-4 flex items-center justify-between gap-x-6 ">
      <Link
        to="/"
        className="font-bold text-lg cursor-pointer hover:text-gray-400 transition duration-200 flex items-center"
      >
        <span className="animate-bounce"> 🍏 </span>  Wegmans Produce Trivia
      </Link>

      <Link
        to="/about"
        className="cursor-pointer hover:text-red-400 transition duration-200"
      >
        About us
      </Link>

      <Link
        to="/scores"
        className="cursor-pointer hover:text-yellow-400 transition duration-200"
      > 
        Scores
      </Link>

      {user? 
      <> 
      <button
      className="cursor-pointer hover:text-red-400 transition duration-200"
      onClick={() => setUser(null)}
      >
  
        LogOut 
      </button> 

      <button 
      onClick={handleJoinTeam}
      className="cursor-pointer hover:text-yellow-400"
      > 
          Join Team
      </button>

      </>

      

      
      
      :

      <button 
        className="bg-transparent border-none cursor-pointer hover:text-green-400 transition duration-200"
        onClick={() => triggerAccountModal()}
        
        >
        Log In / SignUp
      </button>

  }
    </nav>

    {isOpen && 


    <Modal setIsOpen={setIsOpen}/>

    }

    {isJoinTeamOpen &&
    
    <JoinTeamModal setIsJoinTeamOpen={setIsJoinTeamOpen}/>
    
    }

    </>
  );
}
