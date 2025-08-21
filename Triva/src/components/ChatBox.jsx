import { useState, useEffect, useRef, useContext } from 'react';
import UserContext from './UserContext';
import AdminQuestion from './AdminQuestion';
import Question from './Question';

export default function ChatBox({ hubConnection, messageComponents, question, setQuestion }) {
  const [value, setValue] = useState('');
  const messagesEndRef = useRef(null);
  const { user } = useContext(UserContext);

  function handleMessageSubmit() {
    hubConnection.invoke('SendMessageAsync', user.name, value, false, user.team);
    setValue('');
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageComponents]);

  return (
    <>
      {/* Admin ability to send Question */}
      {user.role === 0 && <AdminQuestion hubConnection={hubConnection} />}

      {/* If there is a Question here */}
      {question && <Question question={question} />}

      {/* Chat Box Itself */}
      <div className="my-20 mx-auto flex flex-col w-[85vw] sm:w-[80vw] max-w-3xl h-[60vh] bg-gray-900 text-white rounded-xl shadow-2xl p-6 sm:p-4 overflow-hidden">
        <h1 className="text-center text-2xl sm:text-xl font-bold mb-6 text-yellow-400">Trivia Chat</h1>
        <div
          id="messages"
          className="flex-1 overflow-y-auto mb-6 p-4 bg-gray-800 rounded-lg shadow-inner flex flex-col space-y-4 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-700"
        >
          {messageComponents.map((comp, idx) => (
            <div key={idx} className="max-w-[90%]">
              {comp}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex flex-row w-full bg-gray-800 rounded-lg shadow-md box-border">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 min-w-0 bg-gray-700 border border-r-0 border-gray-600 rounded-l-lg py-3 px-4 sm:px-3 sm:text-sm text-white focus:outline-none focus:border-yellow-400 transition duration-200"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleMessageSubmit();
              }
            }}
          />
          <button
            className="bg-yellow-400 text-black border border-l-0 border-gray-600 rounded-r-lg px-6 sm:px-3 py-3 sm:text-sm font-semibold hover:bg-yellow-500 active:bg-yellow-600 transition duration-200"
            onClick={handleMessageSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}