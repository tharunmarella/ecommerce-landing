// @ts-nocheck
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const SupportBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! Welcome to LuxeStore. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    const query = input.toLowerCase();
    if (query.includes('shipping')) {
      return "We offer free shipping on orders over $50! Standard shipping takes 3-5 business days.";
    } else if (query.includes('return') || query.includes('refund')) {
      return "We have a hassle-free 30-day return policy. You can start a return from your account page.";
    } else if (query.includes('size') || query.includes('guide')) {
      return "You can find our size guide on every product page next to the size selection.";
    } else if (query.includes('contact') || query.includes('human')) {
      return "You can reach our human support team at support@luxestore.com or call 1-800-LUXE.";
    } else {
      return "Thanks for your message! I'm still learning, but I'll make sure a team member sees this if I can't help directly.";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <Card className="mb-4 w-[350px] sm:w-[400px] h-[500px] shadow-2xl flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          <CardHeader className="bg-primary text-primary-foreground py-4 px-6 flex flex-row items-center justify-between rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="bg-primary-foreground/20 p-1.5 rounded-full">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold">LuxeSupport</h3>
                <p className="text-xs opacity-80">Online | AI Assistant</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-foreground/10 text-primary-foreground -mr-2"
            >
              <X size={20} />
            </Button>
          </CardHeader>

          <CardContent className="flex-grow p-0">
            <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
              <div className="flex flex-col gap-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3 max-w-[85%]",
                      message.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                      message.sender === 'bot' ? "bg-muted" : "bg-primary text-primary-foreground"
                    )}>
                      {message.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    <div className={cn(
                      "p-3 rounded-2xl text-sm",
                      message.sender === 'bot' 
                        ? "bg-muted rounded-tl-none" 
                        : "bg-primary text-primary-foreground rounded-tr-none shadow-md"
                    )}>
                      {message.text}
                      <div className={cn(
                        "text-[10px] mt-1 opacity-50",
                        message.sender === 'user' ? "text-right" : ""
                      )}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-4 border-t">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex w-full gap-2"
            >
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                <Send size={18} />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      <Button
        size="lg"
        className={cn(
          "rounded-full w-14 h-14 shadow-2xl p-0",
          isOpen ? "bg-background text-foreground hover:bg-muted" : "bg-primary text-primary-foreground"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </Button>
    </div>
  );
};

export default SupportBot;
