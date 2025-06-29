"use client";

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! How can I help you execute a rule today?' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.children[1].scrollTop = scrollAreaRef.current.children[1].scrollHeight;
    }
  }, [messages]);


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newMessages: Message[] = [...messages, { sender: 'user', text: inputValue }];
      setMessages(newMessages);
      setInputValue('');
      
      // In a real app, you would call your AI flow here.
      // For this prototype, we'll simulate a bot response.
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: `I received your message: "${inputValue}". My response logic is not yet implemented.` },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 sm:w-96 h-[500px] flex flex-col shadow-lg rounded-xl border">
          <CardHeader className="flex flex-row items-center justify-between p-3 border-b">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-accent" />
              <CardTitle className="text-lg font-headline">AI Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-2 sm:p-4 overflow-hidden">
            <ScrollArea className="h-full" ref={scrollAreaRef}>
              <div className="space-y-4 pr-2">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-end gap-2 text-sm',
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.sender === 'bot' && (
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-muted text-muted-foreground text-xs">AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        'rounded-lg px-3 py-2 max-w-[85%]',
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      )}
                    >
                      <p>{message.text}</p>
                    </div>
                     {message.sender === 'user' && (
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">U</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-2 sm:p-4 border-t">
            <form
              onSubmit={handleSendMessage}
              className="flex w-full items-center space-x-2"
            >
              <Input
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Ask about a scenario..."
                autoComplete="off"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 shadow-lg"
        >
          <Bot className="h-8 w-8" />
        </Button>
      )}
    </div>
  );
}
