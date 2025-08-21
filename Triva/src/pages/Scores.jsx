import LeaderBoard from '@/components/LeaderBoard';
import {useState, useEffect } from 'react'; 

export default function Scores()
{

    const [teams, setTeams] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {


        async function getTeams() { 
        const reponse = await fetch("http://192.168.12.172:5185/api/teams");
        const data = await reponse.json(); 
        console.log(data);

        setTeams(data);
        setIsLoading(false)

     }

        getTeams();
    }, [])
    return <div> 
  
        {isLoading? 
        

        ""
        
        :
        
            <LeaderBoard teams={teams}/>
        
        }
    </div>
}