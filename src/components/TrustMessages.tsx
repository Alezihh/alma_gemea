import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  text: string;
  timestamp: string;
  delay: number;
}

interface TrustMessagesProps {
  onComplete: () => void;
}

const TrustMessages = ({ onComplete }: TrustMessagesProps) => {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);
  const [imageError, setImageError] = useState(false);

  const messages: Message[] = [
    {
      id: 1,
      text: "E eu não estou exagerando quando digo que é um valor simbólico, porque é uma taxa só de R$19,90...",
      timestamp: "17:28",
      delay: 1000
    },
    {
      id: 2,
      text: "Só lembrando, essa taxa é por todo material que eu tenho que usar e ainda tem todo o meu esforço pra me conectar com vocês dois, você entende né?",
      timestamp: "17:28",
      delay: 3000
    },
    {
      id: 3,
      text: "Mas olha só, se você me disser que eu posso confiar em você, eu vou te mandar o desenho antes mesmo de você me pagar essa taxinha....",
      timestamp: "17:28",
      delay: 5000
    },
    {
      id: 4,
      text: "Porque eu ACABEI de terminar o retrato dele e eu já tô MAIS ANSIOSA do que você, eu aposto 😊",
      timestamp: "17:28",
      delay: 7000
    },
    {
      id: 5,
      text: "Então, eu posso confiar em você né?",
      timestamp: "17:28",
      delay: 9000
    }
  ];

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    messages.forEach((message) => {
      const timeout = setTimeout(() => {
        setVisibleMessages(prev => [...prev, message.id]);
      }, message.delay);
      timeouts.push(timeout);
    });

    // Show button after last message
    const buttonTimeout = setTimeout(() => {
      setShowButton(true);
    }, messages[messages.length - 1].delay + 1000);

    timeouts.push(buttonTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Mobile-like chat container */}
      <div className="w-full max-w-sm bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
        {/* Chat header */}
        <div className="bg-gray-800 px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
            {!imageError ? (
              <img 
                src="https://s3.typebot.io/public/workspaces/cmg79acju0018ih04cq2jphhg/typebots/nqgyvg2p0zkbin7xtj282pql/blocks/h2emtclv6zp4ecyzmajv70fu?v=1759704579742" 
                alt="Serena" 
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-white font-bold text-sm">S</span>
            )}
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Serena</h3>
            <p className="text-gray-400 text-xs">Online</p>
          </div>
        </div>

        {/* Messages container */}
        <div className="bg-gray-900 p-4 space-y-3 min-h-[400px] max-h-[500px] overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex justify-start ${
                visibleMessages.includes(message.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } transition-all duration-500 ease-out`}
            >
              <div className="max-w-[85%]">
                <div className="bg-gray-700 rounded-2xl rounded-tl-md px-4 py-3 shadow-lg">
                  <p className="text-white text-sm leading-relaxed">{message.text}</p>
                </div>
                <p className="text-gray-500 text-xs mt-1 ml-2">{message.timestamp}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {visibleMessages.length < messages.length && (
            <div className="flex justify-start">
              <div className="bg-gray-700 rounded-2xl rounded-tl-md px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Button */}
        {showButton && (
          <div className="p-4 bg-gray-800">
            <Button
              onClick={onComplete}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              SIM, PODE CONFIAR! →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrustMessages;
