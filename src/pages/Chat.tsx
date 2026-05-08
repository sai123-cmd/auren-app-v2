import type { FC } from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  PaperPlaneRight,
  Microphone,
} from 'phosphor-react';

/* ─── Types ─── */
interface ChatMessage {
  id: number;
  sender: 'ta' | 'user';
  text: string;
  timestamp: string;
}

/* ─── Mock conversation data ─── */
const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    sender: 'ta',
    text: '主人你看我今天追松鼠了吗？没追到呜呜',
    timestamp: '10:30',
  },
  {
    id: 2,
    sender: 'user',
    text: '没关系，下次一定能追到！',
    timestamp: '10:31',
  },
  {
    id: 3,
    sender: 'ta',
    text: '今天在公园遇到了金毛哥哥，我们玩了好久！',
    timestamp: '10:32',
  },
  {
    id: 4,
    sender: 'user',
    text: '哇！交到新朋友了呀，开心吗？',
    timestamp: '10:33',
  },
  {
    id: 5,
    sender: 'ta',
    text: '晚上回来好累呀，但是好开心',
    timestamp: '10:35',
  },
  {
    id: 6,
    sender: 'user',
    text: '累了就好好休息，明天再带你去玩~',
    timestamp: '10:36',
  },
  {
    id: 7,
    sender: 'ta',
    text: '好耶！主人最好了 🐾',
    timestamp: '10:36',
  },
  {
    id: 8,
    sender: 'ta',
    text: '我刚刚打了个盹，梦见好多好吃的零食',
    timestamp: '10:38',
  },
];

/* ─── Typing Indicator ─── */
const TypingIndicator: FC = () => (
  <motion.div
    className="flex items-center gap-1 px-3 py-2 bg-warmWhite rounded-2xl rounded-tl-[4px] border border-sand"
    style={{ width: 56 }}
    initial={{ opacity: 0, y: 8, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
  >
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-[6px] h-[6px] bg-sand rounded-full"
        animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          delay: i * 0.18,
          ease: 'easeInOut' as const,
        }}
      />
    ))}
  </motion.div>
);

/* ─── Message Bubble ─── */
const MessageBubble: FC<{ message: ChatMessage; index: number }> = ({ message, index }) => {
  const isTA = message.sender === 'ta';

  return (
    <motion.div
      className={`flex ${isTA ? 'justify-start' : 'justify-end'} mb-3`}
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: [0, 0, 0.2, 1] as [number, number, number, number],
      }}
    >
      <div className="flex items-end gap-2 max-w-[80%]">
        {/* TA avatar on left */}
        {isTA && (
          <img
            src="/ta-avatar-cute.png"
            alt="Bella"
            className="w-8 h-8 rounded-full object-cover shrink-0"
            draggable={false}
          />
        )}

        <div className="flex flex-col">
          <div
            className={`px-4 py-2.5 ${
              isTA
                ? 'bg-warmWhite rounded-2xl rounded-tl-[4px]'
                : 'bg-[rgba(240,168,84,0.22)] rounded-2xl rounded-tr-[4px]'
            }`}
            style={
              isTA
                ? { border: '1px solid #D4C4B0' }
                : undefined
            }
          >
            <p className="text-[15px] text-espresso leading-relaxed">{message.text}</p>
          </div>
          <span className={`text-[10px] text-sand mt-1 ${isTA ? 'ml-1' : 'mr-1 self-end'}`}>
            {message.timestamp}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Chat Page ─── */
const Chat: FC = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [showTyping, setShowTyping] = useState(false);
  const idRef = useRef(100);

  /* Auto-scroll to bottom on mount & new messages */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, showTyping]);

  /* Simulate typing indicator when adding a TA message */
  const simulateTAReply = useCallback((text: string) => {
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      idRef.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: idRef.current,
          sender: 'ta',
          text,
          timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  }, []);

  /* Send user message */
  const handleSend = useCallback(() => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    idRef.current += 1;
    const newMsg: ChatMessage = {
      id: idRef.current,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulate TA reply
    const replies = [
      '真的吗！那我等不及了 🐾',
      '嘻嘻，最喜欢主人了~',
      '我在晒太阳呢，好舒服~',
      '今晚能不能加个罐头呀？',
      '我刚刚在做梦，梦到和你一起去海边了！',
    ];
    simulateTAReply(replies[Math.floor(Math.random() * replies.length)]);
  }, [inputText, simulateTAReply]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const hasInput = inputText.trim().length > 0;

  return (
    <div className="min-h-[100dvh] bg-cream max-w-[430px] mx-auto flex flex-col">
      {/* ═══ Navbar ═══ */}
      <div className="h-[48px] bg-warmWhite/80 backdrop-blur-[12px] border-b border-sand flex items-center px-4 shrink-0 z-50">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blush transition-colors active:scale-95"
          aria-label="返回"
        >
          <ArrowLeft size={24} className="text-taupe" />
        </button>

        <div className="ml-3 flex items-center gap-2.5">
          <img
            src="/ta-avatar-cute.png"
            alt="Bella"
            className="w-8 h-8 rounded-full object-cover"
            draggable={false}
          />
          <span className="text-[16px] font-semibold text-espresso">和Bella聊天</span>
        </div>
      </div>

      {/* ═══ Message List ═══ */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 no-scrollbar"
      >
        {/* Date divider */}
        <div className="flex items-center justify-center mb-6">
          <div className="h-px bg-sand/50 flex-1" />
          <span className="text-[11px] text-sand px-3">今天</span>
          <div className="h-px bg-sand/50 flex-1" />
        </div>

        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <MessageBubble key={msg.id} message={msg} index={idx} />
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {showTyping && (
            <motion.div
              className="flex justify-start mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-end gap-2">
                <img
                  src="/ta-avatar-cute.png"
                  alt="Bella"
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                  draggable={false}
                />
                <TypingIndicator />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom spacer for scroll breathing room */}
        <div className="h-2" />
      </div>

      {/* ═══ Input Area (fixed bottom) ═══ */}
      <div className="shrink-0 bg-warmWhite border-t border-sand z-50">
        <div className="flex items-center gap-2 px-4 py-2.5">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-cream shrink-0 hover:bg-blush/50 transition-colors"
            aria-label="语音输入"
          >
            <Microphone size={20} className="text-taupe" weight="regular" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="跟 TA 说点什么..."
            className="flex-1 h-10 bg-cream rounded-full px-4 text-[14px] text-espresso placeholder:text-sand focus:outline-none focus:ring-2 focus:ring-amber transition-shadow"
          />

          <motion.button
            onClick={handleSend}
            disabled={!hasInput}
            className={`w-10 h-10 flex items-center justify-center rounded-full shrink-0 transition-colors ${
              hasInput ? 'bg-amber' : 'bg-sand'
            }`}
            whileTap={hasInput ? { scale: 0.88 } : undefined}
            aria-label="发送"
          >
            <PaperPlaneRight
              size={18}
              weight="fill"
              className={hasInput ? 'text-warmWhite' : 'text-warmWhite/70'}
            />
          </motion.button>
        </div>

        {/* Safe area for home indicator */}
        <div className="h-[34px]" />
      </div>
    </div>
  );
};

export default Chat;
