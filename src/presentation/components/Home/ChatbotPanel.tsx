"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { messageGeneral, type AssistantStreamChunk } from "@/infrastructure/api/assistantService";
import { useAuth } from "@/presentation/hooks/AuthContext";

type Props = {
  botName?: string;
  className?: string;
};

export default function ChatbotPanel({ botName = "SuidBot", className = "" }: Props) {
  const { user } = useAuth();
  const [threadId, setThreadId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const assistantBufferRef = useRef<string>("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("chatbot:guest");
        if (user?.id) localStorage.removeItem(`chatbot:${user.id}`);
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    assistantBufferRef.current = "";
    setIsStreaming(true);
    try {
      await messageGeneral({ threadId, message: text }, (chunk: AssistantStreamChunk) => {
        if ("token" in chunk) {
          assistantBufferRef.current += chunk.token;
          setMessages((m) => {
            const last = m[m.length - 1];
            if (last?.role === "assistant") {
              const copy = m.slice(0, -1);
              return [...copy, { role: "assistant", content: assistantBufferRef.current }];
            }
            return [...m, { role: "assistant", content: assistantBufferRef.current }];
          });
        } else if ("done" in chunk) {
          setThreadId(chunk.threadId);
          setIsStreaming(false);
        } else if ("error" in chunk) {
          setMessages((m) => [...m, { role: "assistant", content: `Error: ${chunk.error}` }]);
          setIsStreaming(false);
        }
      });
    } catch (e) {
      const err = e as Error;
      setMessages((m) => [...m, { role: "assistant", content: `Error: ${err.message || "Fallo al conectar con el asistente."}` }]);
      setIsStreaming(false);
    }
  }, [input, threadId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  return (
    <div className={`bg-[#1A142B] rounded-lg p-4 flex flex-col h-[520px] ${className}`}>
      <div className="flex items-center mb-4">
        <img src="/bot.svg" alt="Bot Icon" className="w-6 h-6 mr-2" />
        <h2 className="text-lg font-bold text-white">{botName}</h2>
      </div>

      <div className="space-y-4 overflow-y-auto flex-1 pr-1 pb-2 scrollbar-purple">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && <img src="/bot.svg" alt="Bot" className="w-5 h-5 mr-2 mt-1" />}
            <div className={`max-w-[85%] rounded-md ${m.role === "user" ? "bg-[#1A0B2E]/70" : "bg-[#1A0B2E]/40"} px-3 py-2`}>
              <p className={`text-sm leading-relaxed ${m.role === "user" ? "text-gray-200" : "text-gray-300"}`}>
                {m.content}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {isStreaming && <p className="text-xs text-gray-400 mt-2">{botName} está escribiendo…</p>}

      <div className="flex items-end mt-3 ">
        <textarea
          placeholder="Escribe tu duda..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          rows={1}
          className="w-full p-2 rounded-xl bg-[#0F0B1A] text-white border border-[#6B64F2] focus:outline-none focus:ring-2 focus:ring-[#6B64F2] resize-none min-h-10 max-h-28"
        />
        <button
          aria-label="Enviar"
          onClick={send}
          className="ml-2 mb-2 bg-transparent p-1 hover:opacity-90"
        >
          <img src="/lupa.svg" alt="Enviar" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
