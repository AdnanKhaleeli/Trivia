import UserContext from "@/components/UserContext";
import LoggedInUser from "@/components/LoggedInUser";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user ? (
        <LoggedInUser user={user}/> 
      ) : (
        <div className="bg-gray-900 text-white m-3 rounded-xl p-3 h-[75vh]"> 

        <div className="text-center text-xl">Welcome</div>
        <hr className="pb-2"/> 

        <img className="w-full max-w-xs mx-auto h-auto" src="https://graphicburger.com/wp-content/uploads/2013/01/Trivia-Text-Effect-Full.jpg" alt="Trivia Image" />
       
        <div className="text-center mt-5">
  <ol className="list-decimal list-inside space-y-2 text-lg font-semibold text-gray-800">
    <li>
      <span className="text-xl text-yellow-600">Select a Team After Logging in</span>
      <ul className="list-disc list-inside pl-6 mt-2 space-y-1 text-gray-300">
        <li><span className="font-medium">TeamId = 1:</span> <span className="italic">UN</span></li>
        <li><span className="font-medium">TeamId = 2:</span> <span className="italic">Schenagins</span></li>
        <li><span className="font-medium">TeamId = 3:</span> <span className="italic">Andy's Mustache</span></li>
        <li><span className="font-medium">TeamId = 4:</span> <span className="italic">Fruit Punch</span></li>
      </ul>
    </li>
  </ol>
</div>


        </div>
      )}
    </div>
  );
}
