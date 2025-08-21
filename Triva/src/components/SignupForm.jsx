import { useContext, useState } from "react";
import UserContext from "./UserContext";

export default function SignupForm({setIsOpen}) {
  const [email, setEmail] = useState();
  const [username, setUserName] = useState();
  const [pwd, setPwd] = useState();
  const [cpwd, setCpwd] = useState();
  
  const { user, setUser } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Sign Up submitted");

    if (pwd !== cpwd) {
      alert("Passwords do not match, please try again");
      return;
    }

    const userData = {
      Email: email,
      Name: username,
      Pwd: pwd,
      Role: 1,
    };

    try {
      const response = await fetch("http://192.168.12.172:5185/api/Signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        setIsOpen(false);
        
        setUser(data);

        console.log("Successfully Signed Up", user);
      } else {
        console.error("Failed to sign up:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className=" overflow-y-auto flex-1 flex flex-col justify-around gap-y-4 px-4"
      >
        <input
          className="mx-2 p-1"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Email"
          required
        />
        <input
          className="mx-2 p-1"
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="Enter Username"
          required
        />
        <input
          className="mx-2 p-1"
          onChange={(e) => setPwd(e.target.value)}
          type="password"
          placeholder="Enter password"
          required
        />
        <input
          className="mx-2 p-1"
          onChange={(e) => setCpwd(e.target.value)}
          type="password"
          placeholder="Confirm Password"
          required
        />

        <button
          className=" p-2 mx-auto rounded hover:bg-green-800"
          type="submit"
        >
          {" "}
          Submit{" "}
        </button>
      </form>
    </>
  );
}
