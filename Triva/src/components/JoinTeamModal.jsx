import {useState, useContext} from 'react';
import UserContext from './UserContext';

export default function JoinTeamModal({ setIsJoinTeamOpen }) {
    const [teamId, setTeamId] = useState("");
    const {user, setUser} = useContext(UserContext);
   
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const id = parseInt(teamId, 10);
      if (!isNaN(id)) {
        console.log("Joining team with ID:", id);



        const response = await fetch("http://192.168.12.172:5185/api/jointeam", 
        { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( 
            {
                "userId" : user.userId, 
                "teamId" : teamId

            }
        )
        });

        if (response.ok) {

            const data = await response.json();

            setUser(data)
            setIsJoinTeamOpen(false); 
            console.log(user);
            alert(`Sucessfully Joined Team ${data.team.teamName}`)
        }




       
      } else {
        alert("Please enter a valid integer Team ID");
      }




    };
  
    return (
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={() => setIsJoinTeamOpen(false)} 
      >
        <div
          className="bg-gray-900 text-white rounded-xl shadow-2xl p-6 w-[90vw] max-w-md min-h-[20vh] relative border border-gray-700"
          onClick={(e) => e.stopPropagation()} 
        >
          <h2 className="text-2xl mb-4">Join a Team</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              placeholder="Enter Team ID"
              className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsJoinTeamOpen(false)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
              >
                Join
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }