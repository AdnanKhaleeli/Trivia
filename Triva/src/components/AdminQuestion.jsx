import {useState} from 'react';
export default function AdminQuestion( {hubConnection}){


    const [questionValue, setQuestionValue] = useState("");
    const [answerValue, setAnswerValue] = useState("");
    const [pointValue, setPointValue] = useState(0);


    function handleQuestionSubmit(e) {
        e.preventDefault(); 
        hubConnection.invoke('SendQuestionAsync', questionValue, answerValue, pointValue);

  }

    return <> 
    

        <form 
        onSubmit={(e) => handleQuestionSubmit(e)}
        className="m-5 bg-gray-900 text-yellow-400 rounded-xl flex flex-col space-y-2 items-center p-4"
        
        >
            <h1 className="text-2xl"> Please Enter Your Question To Send</h1>
            <input
            placeholder='Type your question'
            onChange={(e) => setQuestionValue(e.target.value)}
            className='flex-1 bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-yellow-400 transition duration-200 ' 
            /> 

            <input
            type="text"
            placeholder="Enter the Answer"
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-yellow-400 transition duration-200"
            onChange={(e) => setAnswerValue(e.target.value)}
            
            />

            <input
            id="points"
            type="number"
            placeholder="Enter Point Value"
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-yellow-400 transition duration-200 "
            onChange={(e) => setPointValue(Number(e.target.value))}
            />

        <button className='cursor-pointer hover:text-green-400 rounded-xl  '> Submit </button>
        


        </form>

    
    
    </>
}