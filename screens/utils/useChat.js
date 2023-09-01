import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import baseUrl from "../../assets/common/baseUrl";

export const useChat = (onMessageReceived) => {
  const socketRef = useRef(null);

  useEffect(() => {
    try {
      socketRef.current = io(baseUrl);

      socketRef.current.on('connect', () => {
        console.log('Connected to the WebSocket server');
      });

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from the WebSocket server');
      });

      const handleIncomingMessage = (message) => {
        console.log('Received message:', message); // Log received messages
        onMessageReceived(message);
      };

      socketRef.current.on('chat message', handleIncomingMessage);

      return () => {
        socketRef.current.disconnect();
        socketRef.current.off('chat message', handleIncomingMessage);
      };
    } catch (error) {
      console.error('WebSocket initialization error:', error);
    }
  }, [onMessageReceived]);

  const sendMessage = (sender, receiver, content) => {
    const message = { sender, receiver, content };
    socketRef.current.emit('chat message', message);
    console.log('Sent message:', message); // Log sent messages
  };

  return { sendMessage };
};



// import { useEffect, useRef } from 'react';
// import io from 'socket.io-client';
// import baseUrl from "../../assets/common/baseUrl";

// export const useChat = (onMessageReceived) => {
//   const socketRef = useRef(null);

//   useEffect(() => {
//     socketRef.current = io(baseUrl);

//     socketRef.current.on('connect', () => {
//       console.log('Connected to the WebSocket server');
//     });

//     socketRef.current.on('disconnect', () => {
//       console.log('Disconnected from the WebSocket server');
//     });

//     const handleIncomingMessage = (message) => {
//       onMessageReceived(message);
//     };

//     socketRef.current.on('chat message', handleIncomingMessage);

//     return () => {
//       socketRef.current.disconnect();
//       socketRef.current.off('chat message', handleIncomingMessage);
//     };
//   }, [onMessageReceived]);

//   const sendMessage = (sender, receiver, content) => {
//     const message = { sender, receiver, content };
//     socketRef.current.emit('chat message', message);
//   };

//   return { sendMessage };
// };
