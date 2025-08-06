// // // ✅ src/pages/message/Messages.jsx
// // import React, { useEffect, useState } from "react";
// // import ChatBox from "../../components/ChatBox";
// // import { useAuth } from "../../contexts/AuthContext";
// // import { io } from "socket.io-client";

// // const socket = io(import.meta.env.VITE_SOCKET_URL, {
// //   transports: ["websocket"],
// // });

// // function Messages() {
// //   const { user } = useAuth();
// //   const [conversations, setConversations] = useState([]);
// //   const [selected, setSelected] = useState(null);

// //   const fetchConversations = async () => {
// //     if (!user?.email) return;
// //     try {
// //       const res = await fetch(`${import.meta.env.VITE_API_URL}/chat/conversations/${user.email}`);
// //       if (!res.ok) throw new Error("응답 실패");
// //       const data = await res.json();
// //       if (!Array.isArray(data)) throw new Error("잘못된 데이터 형식");
// //       setConversations(data);
// //     } catch (err) {
// //       console.error("❌ 대화 불러오기 실패:", err.message);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchConversations();
// //   }, [user]);

// //   // ✅ 메시지 수신시 목록 실시간 갱신
// //   useEffect(() => {
// //     const handleReceive = () => fetchConversations();
// //     socket.on("receiveMessage", handleReceive);
// //     return () => socket.off("receiveMessage", handleReceive);
// //   }, []);

// //   const otherNickname = (convo) => {
// //     return convo.buyer === user.email ? convo.sellerNickname : convo.buyerNickname;
// //   };

// //   return (
// //     <div className="flex h-[calc(100vh-80px)]">
// //       {/* 왼쪽 목록 */}
// //       <div className="w-80 border-r p-4">
// //         <h2 className="text-lg font-bold mb-4">💬 Messages</h2>
// //         <div className="space-y-2">
// //           {conversations.length === 0 && <p className="text-sm text-gray-500">진행 중인 채팅이 없습니다.</p>}
// //           {conversations.map((c) => (
// //             <div
// //               key={c._id}
// //               onClick={() => setSelected(c)}
// //               className={`cursor-pointer p-3 rounded-lg ${
// //                 selected?._id === c._id ? "bg-blue-100" : "hover:bg-gray-100"
// //               }`}
// //             >
// //               <p className="font-medium">{otherNickname(c)}</p>
// //               <p className="text-sm text-gray-500 truncate">{c.lastMessage || "(메시지 없음)"}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* 오른쪽 채팅창 */}
// //       <div className="flex-1 p-4">
// //         {selected ? (
// //           <ChatBox
// //             conversationId={selected._id}
// //             userEmail={user.email}
// //             fullSize
// //             otherNickname={otherNickname(selected)}
// //           />
// //         ) : (
// //           <div className="text-center text-gray-400 mt-20">
// //             🧭 왼쪽에서 채팅을 선택하세요.
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Messages;


// // ✅ src/pages/message/Messages.jsx
// import React, { useEffect, useState } from "react";
// import ChatBox from "../../components/ChatBox";
// import { useAuth } from "../../contexts/AuthContext";
// import { io } from "socket.io-client";

// const socket = io(import.meta.env.VITE_SOCKET_URL, {
//   transports: ["websocket"],
// });

// function Messages() {
//   const { user } = useAuth();
//   const [conversations, setConversations] = useState([]);
//   const [selected, setSelected] = useState(null);

//   const fetchConversations = async () => {
//     if (!user?.email) return;
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/chat/conversations/${user.email}`);
//       if (!res.ok) throw new Error("응답 실패");
//       const data = await res.json();
//       if (!Array.isArray(data)) throw new Error("잘못된 데이터 형식");
//       setConversations(data);
//     } catch (err) {
//       console.error("❌ 대화 불러오기 실패:", err.message);
//     }
//   };

//   useEffect(() => {
//     fetchConversations();
//   }, [user]);

//   // ✅ 메시지 수신시 목록 실시간 갱신
//   useEffect(() => {
//     const handleReceive = () => fetchConversations();
//     const handleUpdate = ({ conversationId, lastMessage, updatedAt }) => {
//       setConversations((prev) =>
//         prev.map((c) =>
//           c._id === conversationId ? { ...c, lastMessage, updatedAt } : c
//         )
//       );
//     };

//     socket.on("receiveMessage", handleReceive);
//     socket.on("conversationUpdated", handleUpdate);

//     return () => {
//       socket.off("receiveMessage", handleReceive);
//       socket.off("conversationUpdated", handleUpdate);
//     };
//   }, []);

//   const otherNickname = (convo) => {
//     return convo.buyer === user.email ? convo.sellerNickname : convo.buyerNickname;
//   };

//   return (
//     <div className="flex h-[calc(100vh-80px)]">
//       {/* 왼쪽 목록 */}
//       <div className="w-80 border-r p-4">
//         <h2 className="text-lg font-bold mb-4">💬 Messages</h2>
//         <div className="space-y-2">
//           {conversations.length === 0 && <p className="text-sm text-gray-500">진행 중인 채팅이 없습니다.</p>}
//           {conversations.map((c) => (
//             <div
//               key={c._id}
//               onClick={() => setSelected(c)}
//               className={`cursor-pointer p-3 rounded-lg ${
//                 selected?._id === c._id ? "bg-blue-100" : "hover:bg-gray-100"
//               }`}
//             >
//               <p className="font-medium">{otherNickname(c)}</p>
//               <p className="text-sm text-gray-500 truncate">{c.lastMessage || "(메시지 없음)"}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 오른쪽 채팅창 */}
//       <div className="flex-1 p-4">
//         {selected ? (
//           <ChatBox
//             conversationId={selected._id}
//             userEmail={user.email}
//             fullSize
//             otherNickname={otherNickname(selected)}
//           />
//         ) : (
//           <div className="text-center text-gray-400 mt-20">
//             🧭 왼쪽에서 채팅을 선택하세요.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Messages;






// ✅ src/pages/message/Messages.jsx
import React, { useEffect, useState } from "react";
import ChatBox from "../../components/Chatbox";
import { useAuth } from "../../contexts/AuthContext";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ["websocket"],
});

function Messages() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchConversations = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/chat/conversations/${user.email}`);
      if (!res.ok) throw new Error("응답 실패");
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("잘못된 데이터 형식");
      setConversations(data);
    } catch (err) {
      console.error("❌ 대화 불러오기 실패:", err.message);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [user]);

  useEffect(() => {
    const handleReceive = () => fetchConversations();
    const handleUpdate = ({ conversationId, lastMessage, updatedAt }) => {
      setConversations((prev) =>
        prev.map((c) =>
          c._id === conversationId ? { ...c, lastMessage, updatedAt } : c
        )
      );
    };

    socket.on("receiveMessage", handleReceive);
    socket.on("conversationUpdated", handleUpdate);

    return () => {
      socket.off("receiveMessage", handleReceive);
      socket.off("conversationUpdated", handleUpdate);
    };
  }, []);

  const otherNickname = (convo) =>
    convo.buyer === user.email ? convo.sellerNickname : convo.buyerNickname;

  const otherEmail = (convo) =>
    convo.buyer === user.email ? convo.seller : convo.buyer;

  const unreadCount = (convo) =>
    convo.messages?.filter(
      (msg) => msg.sender !== user.email && !msg.readBy?.includes(user.email)
    ).length || 0;

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* 왼쪽 목록 */}
      <div className="w-80 border-r p-4">
        <h2 className="text-lg font-bold mb-4">💬 Messages</h2>
        <div className="space-y-2">
          {conversations.length === 0 && (
            <p className="text-sm text-gray-500">
              진행 중인 채팅이 없습니다.
            </p>
          )}
          {conversations.map((c) => (
            <div
              key={c._id}
              onClick={() => setSelected(c)}
              className={`cursor-pointer p-3 rounded-lg relative ${
                selected?._id === c._id ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              <p className="font-medium">{otherNickname(c)}</p>
              <p className="text-sm text-gray-500 truncate">
                {c.lastMessage || "(메시지 없음)"}
              </p>
              {unreadCount(c) > 0 && (
                <span className="absolute top-2 right-2 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                  {unreadCount(c)}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 오른쪽 채팅창 */}
      <div className="flex-1 p-4">
        {selected ? (
          <ChatBox
            conversationId={selected._id}
            userEmail={user.email}
            otherEmail={otherEmail(selected)}               // ✅ 체크표시 작동 위한 key point
            fullSize
            otherNickname={otherNickname(selected)}
          />
        ) : (
          <div className="text-center text-gray-400 mt-20">
            🧭 왼쪽에서 채팅을 선택하세요.
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
