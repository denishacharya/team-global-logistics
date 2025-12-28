import { useEffect, useRef, useState } from "react";

export const useWebSocketChat = (url) => {
  const wsRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // <-- track connection

  useEffect(() => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => setIsConnected(true);  // <-- connected
    wsRef.current.onclose = () => setIsConnected(false); // <-- disconnected
    wsRef.current.onerror = () => setIsConnected(false);

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Typing indicator
      if (data.typing === true) return setTyping(true);
      if (data.typing === false) return setTyping(false);

      // Streaming messages
      if (data.stream === true) {
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && last.stream) {
            last.content += data.content;
            return [...prev.slice(0, -1), last];
          }
          return [...prev, { role: "assistant", content: data.content, stream: true }];
        });
        return;
      }

      // Stream end
      if (data.stream === false) {
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (!last || !last.stream) return prev;
          last.stream = false;
          return [...prev.slice(0, -1), last];
        });
        return;
      }
    };

    return () => wsRef.current.close();
  }, [url]);

  const sendMessage = (message) => {
    if (wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ message }));
      setMessages(prev => [...prev, { role: "user", content: message }]);
    }
  };

  return { messages, sendMessage, typing, isConnected }; // <-- return connection state
};
