'use client'

import { useState } from 'react'
import { Send, Sparkles, ChevronRight, X } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Buenos días, María. He detectado una oportunidad de optimización fiscal en su cartera de acciones. ¿Le gustaría revisarla?',
  },
]

const suggestions = [
  'Analizar mi exposición al riesgo',
  'Optimizar mi cartera',
  'Revisar flujo de caja',
]

export function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isExpanded, setIsExpanded] = useState(true)

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Entendido. Estoy analizando sus datos financieros para proporcionarle una recomendación personalizada. Un momento, por favor.',
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion)
  }

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      >
        <Sparkles className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div className="w-80 bg-card rounded-2xl border border-border shadow-lg flex flex-col h-[500px]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Asesor IA</p>
            <p className="text-xs text-success">En línea</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-md'
                  : 'bg-secondary text-secondary-foreground rounded-bl-md'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2">Sugerencias</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestion(suggestion)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                {suggestion}
                <ChevronRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu pregunta..."
            className="flex-1 px-4 py-2.5 rounded-full bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
