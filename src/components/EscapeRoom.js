import React, { useState } from 'react';

const EscapeRoom = () => {
  const [currentRoom, setCurrentRoom] = useState('intro');
  const [hints, setHints] = useState(3);
  const [time, setTime] = useState(4500); // 75 minutes in seconds
  const [completed, setCompleted] = useState({
    intro: false,
    room1: false,
    room2: false,
    final: false
  });
  const [showHint, setShowHint] = useState(false);

  // Timer logic
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) return 0;
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getHint = (room) => {
    if (hints > 0) {
      setHints(hints - 1);
      setShowHint(true);
    }
  };

  const roomContent = {
    intro: {
      title: "Welcome to 'The Missing IEP Files'",
      content: "Your team must recover critical IEP documents before the parent meeting! Complete each challenge to unlock the digital filing cabinet.",
      hint: "Start by watching the welcome video and forming your team of 3-4 members."
    },
    room1: {
      title: "Components Check",
      content: "Unscramble these letters to identify the essential components of IEP goals: FICEPIS BLESURMAE VEHABIELCA STLICIREA DTIME-DUNBO",
      hint: "Think about the SMART criteria - each word relates to one letter in SMART"
    },
    room2: {
      title: "Measurement Mystery",
      content: "Match the correct measurement method to each baseline data scenario provided.",
      hint: "Consider frequency, duration, and accuracy as your main measurement types"
    },
    final: {
      title: "Final Challenge",
      content: "Write a SMART goal for this student scenario and submit it for peer review.",
      hint: "Remember to include all components: condition, behavior, criterion, and timeline"
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {/* Timer and Hints Display */}
      <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-xl">⏱️ {formatTime(time)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>💡 Hints remaining: {hints}</span>
        </div>
      </div>

      {/* Current Room Display */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{roomContent[currentRoom].title}</h2>
          {completed[currentRoom] && (
            <span className="text-green-500">✓</span>
          )}
        </div>
        
        <div className="space-y-4">
          <p className="text-lg">{roomContent[currentRoom].content}</p>
          
          {/* Hint Section */}
          {showHint && (
            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <p className="text-blue-800">{roomContent[currentRoom].hint}</p>
            </div>
          )}

          {/* Room Navigation */}
          <div className="flex justify-between mt-6">
            <button 
              className={`px-4 py-2 rounded ${
                hints > 0 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              onClick={() => getHint(currentRoom)}
              disabled={hints === 0}
            >
              Get Hint
            </button>
            
            <div className="space-x-2">
              {currentRoom !== 'intro' && (
                <button 
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => {
                    const rooms = ['intro', 'room1', 'room2', 'final'];
                    const currentIndex = rooms.indexOf(currentRoom);
                    setCurrentRoom(rooms[currentIndex - 1]);
                  }}
                >
                  Previous Room
                </button>
              )}
              {currentRoom !== 'final' && (
                <button 
                  className={`px-4 py-2 rounded ${
                    completed[currentRoom]
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  onClick={() => {
                    const rooms = ['intro', 'room1', 'room2', 'final'];
                    const currentIndex = rooms.indexOf(currentRoom);
                    setCurrentRoom(rooms[currentIndex + 1]);
                  }}
                  disabled={!completed[currentRoom]}
                >
                  Next Room 🔒
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscapeRoom;
