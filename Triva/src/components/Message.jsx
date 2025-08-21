import { useContext } from 'react';
import UserContext from './UserContext';

export default function Message({ messageContent }) {
  const { user } = useContext(UserContext);
  console.log(messageContent);
  console.log(user);
  const isCurrentUser = user.name === messageContent.name && !messageContent.isSystem;

  return (
    <div
      className={`flex ${
        messageContent.isSystem ? 'justify-center' : isCurrentUser ? 'justify-end' : 'justify-start'
      } m-2 max-w-[90%] ${isCurrentUser && !messageContent.isSystem ? 'mr-2' : 'ml-2'}`}
    >
      <div
        className={`p-3 rounded-lg shadow-md transition duration-200 ${
          messageContent.isSystem
            ? 'bg-green-500 text-white'
            : isCurrentUser
            ? 'bg-yellow-400 text-black'
            : 'bg-gray-700 text-white'
        } hover:shadow-lg`}
      >
        <p className="text-sm font-medium">{messageContent.message}</p>
        <p
          className={`text-xs mt-1 ${
            messageContent.isSystem ? 'text-gray-100' : isCurrentUser ? 'text-gray-800' : 'text-gray-300'
          }`}
        >
          ~ {messageContent.name}
        </p>
      </div>
    </div>
  );
}