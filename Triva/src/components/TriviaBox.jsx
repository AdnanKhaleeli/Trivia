import * as signalR from "@microsoft/signalr";
import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import Message from "./Message";


export default function TriviaBox() {
  const [connection, setConnection] = useState(null);
  const [question, setQuestion] = useState(null);
  const [messageComponents, setMessageComponents] = useState([]);
  

  useEffect(() => {
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://192.168.12.172:5185/triviahub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

      hubConnection.on('ReceiveMessage', (name, message, isSystem, teamName ) => {
        const messageContent = { name, message, isSystem };

        setMessageComponents(prev => [...prev, <Message messageContent={messageContent} />]);
      
        if(isSystem) {
      
          setQuestion(null)
        }
      });

      hubConnection.on('ReceiveQuestion', (question, answer, points) => {
        setQuestion({question, answer, points});
        console.log(question);
        
      })
      

    async function startConnection() {
      try {
        await hubConnection.start();
        setConnection(hubConnection);

       

      } catch (err) {
        console.error('SignalR Connection Error: ', err);
      }
    }

    startConnection();
    setConnection(hubConnection);

    return () => {
      if (hubConnection) {
        hubConnection.stop();
      }
    };
  }, []);

  return <>

   
    <ChatBox hubConnection={connection} messageComponents={messageComponents} question={question} setQuestion={setQuestion}/> 
  
  
        
  
  
  </>;
}
