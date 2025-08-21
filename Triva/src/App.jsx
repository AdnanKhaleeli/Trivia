
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Nav from "./components/Nav";
import UserContext from './components/UserContext';  
import { useState } from "react";
import Scores from "./pages/Scores";


function App() {
  const [user, setUser] = useState(null);

  return (


    <UserContext.Provider value={{user, setUser}}> 
    <BrowserRouter> 
    
      <Nav/>
      <Routes> 
        <Route path="/" element={<Home/>} /> 
        <Route path="/about" element={<About/>} />
        <Route path="/scores" element={<Scores/>} />
        <Route path="*" element={<NotFound />} /> 
   
      </Routes>
    </BrowserRouter>

    </UserContext.Provider>
  )
}

export default App