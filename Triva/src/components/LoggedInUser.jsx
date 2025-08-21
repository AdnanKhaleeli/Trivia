
import TriviaBox from './TriviaBox';
export default function LoggedInUser({user}) {

    return (
        <> 
        <h6 className="py-5 text-center text-4xl"> Welcome {user.name} </h6>
        

        
        <TriviaBox/>

        </>
    )
}