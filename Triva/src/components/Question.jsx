export default function Question({question}) {

    return <> 
    
    <div
        className="flex flex-col bg-gray-900 text-yellow-400 m-2 rounded items-center rounded-xl"
    > 

        <h1 className="text-2xl"> The Current Question</h1>


        <div 
            className="flex-1 bg-gray-600 p-2 m-2 rounded-xl ring ring-white-500  ring-offset-2 "
        > 
            {question.question} 
        </div>

        <div
            className="bg-green-600 text-white rounded-xl m-2 p-2"
        >
            
            
            Points: <span className=""> {question.points} </span> </div>

      

    </div>
    </>
}