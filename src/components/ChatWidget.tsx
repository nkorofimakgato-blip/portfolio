import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { streamChat, type ChatMessage } from '../api/chat'
import Companion, { type CompanionMood } from './Companion'
import Message from './Message'
import './ChatWidget.css'

const STARTER_PROMPTS = [
  { icon: '🎯', text: 'What projects has Nkorofi built?' },
  { icon: '⚡', text: 'What tech does he know?' },
  { icon: '🏆', text: 'Tell me about his CCNA' },
  { icon: '📩', text: 'Is he available for hire?' },
]

interface PetPosition {
  x: number
  y: number
}

function pickOpenPosition(
  current: PetPosition | null,
  size: number,
  recent: PetPosition[]
): PetPosition {
  const width = window.innerWidth
  const height = window.innerHeight
  const left = 14
  const right = Math.max(left, width - size - 14)
  const top = Math.min(Math.max(92, Math.round(height * 0.17)), Math.max(92, height - size - 14))
  const bottom = Math.max(top, height - size - 16)
  const rows = width < 620
    ? [height * 0.42, height * 0.68, bottom]
    : [height * 0.2, height * 0.43, height * 0.67, bottom]
  const candidates = rows.flatMap((row) => {
    const y = Math.round(Math.min(bottom, Math.max(top, row)))
    return [{ x: left, y }, { x: right, y }]
  })
  const unique = candidates.filter((spot, index) =>
    candidates.findIndex((other) => other.x === spot.x && other.y === spot.y) === index
  )
  const obstacles = Array.from(document.querySelectorAll<HTMLElement>(
    'main h1, main h2, main h3, main p, main a, main button, main input, main textarea, main img, main span, main .hero-meta, main .hero-bottom, main .visual-caption, main .portrait-frame, main .project-image, main .certificate-image, .site-header'
  )).filter((element) => !element.closest('[data-assistant-widget]'))

  const score = (spot: PetPosition) => {
    const box = { left: spot.x, right: spot.x + size, top: spot.y, bottom: spot.y + size }
    let value = Math.random() * 60

    for (const element of obstacles) {
      const style = window.getComputedStyle(element)
      if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) < 0.08) continue
      const rect = element.getBoundingClientRect()
      if (rect.bottom <= 0 || rect.top >= height || rect.right <= 0 || rect.left >= width) continue
      const overlapWidth = Math.max(0, Math.min(box.right, rect.right) - Math.max(box.left, rect.left))
      const overlapHeight = Math.max(0, Math.min(box.bottom, rect.bottom) - Math.max(box.top, rect.top))
      if (overlapWidth && overlapHeight) {
        const importance = element.matches('a, button, input, textarea') ? 5 : element.matches('h1, h2, h3') ? 3 : 1
        value += overlapWidth * overlapHeight * importance
      }
    }

    if (current && Math.hypot(spot.x - current.x, spot.y - current.y) < 240) value += 32000
    if (recent.some((previous) => Math.hypot(spot.x - previous.x, spot.y - previous.y) < 48)) value += 10000000
    return value
  }

  const ranked = unique.map((spot) => ({ spot, score: score(spot) })).sort((a, b) => a.score - b.score)
  return ranked[0]?.spot ?? { x: right, y: bottom }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [petMood, setPetMood] = useState<CompanionMood>('idle')
  const [petPosition, setPetPosition] = useState<PetPosition>({ x: 0, y: 0 })
  const [positionReady, setPositionReady] = useState(false)
  const [nudgeVisible, setNudgeVisible] = useState(true)
  const [travelDuration, setTravelDuration] = useState(2100)

  const bottomRef = useRef<HTMLDivElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const positionRef = useRef<PetPosition | null>(null)
  const recentPositionsRef = useRef<PetPosition[]>([])
  const pausedRef = useRef(false)
  const roamTimerRef = useRef<number | null>(null)
  const finishTimerRef = useRef<number | null>(null)
  const activityTimerRef = useRef<number | null>(null)
  const scrollTimerRef = useRef<number | null>(null)
  const movePetRef = useRef<() => void>(() => {})
  const schedulePetRef = useRef<(delay: number) => void>(() => {})

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  useLayoutEffect(() => {
    const size = launcherRef.current?.parentElement?.getBoundingClientRect().width ?? 96
    const initial = pickOpenPosition(null, size, [])
    positionRef.current = initial
    recentPositionsRef.current = [initial]
    setPetPosition(initial)
    setPositionReady(true)

    function keepPetInView() {
      const wrapperSize = launcherRef.current?.parentElement?.getBoundingClientRect().width ?? 96
      const next = pickOpenPosition(positionRef.current, wrapperSize, [])
      positionRef.current = next
      setPetPosition(next)
    }

    window.addEventListener('resize', keepPetInView, { passive: true })
    return () => window.removeEventListener('resize', keepPetInView)
  }, [])

  useEffect(() => {
    const nudgeTimer = window.setTimeout(() => setNudgeVisible(false), 7600)
    return () => window.clearTimeout(nudgeTimer)
  }, [])

  useEffect(() => {
    if (open || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let disposed = false

    function scheduleNext(delay = 7000 + Math.random() * 8000) {
      if (roamTimerRef.current !== null) window.clearTimeout(roamTimerRef.current)
      roamTimerRef.current = window.setTimeout(() => {
        if (disposed) return
        if (pausedRef.current || document.hidden) {
          scheduleNext(2400)
          return
        }
        movePet()
      }, delay)
    }

    function finishWalk() {
      if (disposed) return
      const dance = Math.random() < 0.32
      setPetMood(dance ? 'dancing' : 'idle')
      if (dance) {
        finishTimerRef.current = window.setTimeout(() => setPetMood('idle'), 1350)
      }
      scheduleNext()
    }

    function movePet() {
      if (disposed || pausedRef.current || document.hidden) {
        scheduleNext(2400)
        return
      }
      if (roamTimerRef.current !== null) window.clearTimeout(roamTimerRef.current)
      if (finishTimerRef.current !== null) window.clearTimeout(finishTimerRef.current)
      if (activityTimerRef.current !== null) window.clearTimeout(activityTimerRef.current)
      setNudgeVisible(false)

      const wrapper = launcherRef.current?.parentElement
      const size = wrapper?.getBoundingClientRect().width ?? 96
      const current = positionRef.current
      const next = pickOpenPosition(current, size, recentPositionsRef.current)
      const distance = current ? Math.hypot(next.x - current.x, next.y - current.y) : 480
      const duration = Math.min(2800, Math.max(1200, Math.round(distance * 2.2)))

      positionRef.current = next
      recentPositionsRef.current = [...recentPositionsRef.current, next].slice(-3)
      setTravelDuration(duration)
      setPetMood('walking')
      setPetPosition(next)
      finishTimerRef.current = window.setTimeout(finishWalk, duration)
    }

    function showMood(mood: CompanionMood) {
      setPetMood(mood)
      if (activityTimerRef.current !== null) window.clearTimeout(activityTimerRef.current)
      activityTimerRef.current = window.setTimeout(() => setPetMood('idle'), 1250)
    }

    function reactToPage(event: Event) {
      const target = event.target
      if (target instanceof Element && target.closest('[data-assistant-widget]')) return
      if (event.type === 'scroll') {
        showMood('curious')
        if (scrollTimerRef.current !== null) window.clearTimeout(scrollTimerRef.current)
        scrollTimerRef.current = window.setTimeout(() => movePet(), 950)
        return
      }
      if (!(target instanceof Element)) return
      const interactive = target.closest('a, button, input, textarea, select, [role="button"]')
      if (!interactive) return
      showMood(event.type === 'click' ? 'happy' : 'curious')
    }

    document.addEventListener('pointerover', reactToPage, true)
    document.addEventListener('click', reactToPage, true)
    document.addEventListener('focusin', reactToPage, true)
    window.addEventListener('scroll', reactToPage, { passive: true })
    movePetRef.current = movePet
    schedulePetRef.current = scheduleNext
    scheduleNext(4300 + Math.random() * 2200)

    return () => {
      disposed = true
      document.removeEventListener('pointerover', reactToPage, true)
      document.removeEventListener('click', reactToPage, true)
      document.removeEventListener('focusin', reactToPage, true)
      window.removeEventListener('scroll', reactToPage)
      for (const timer of [roamTimerRef.current, finishTimerRef.current, activityTimerRef.current, scrollTimerRef.current]) {
        if (timer !== null) window.clearTimeout(timer)
      }
      movePetRef.current = () => {}
      schedulePetRef.current = () => {}
    }
  }, [open])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || streaming) return

    setError(null)
    setInput('')

    const userMsg: ChatMessage = { role: 'user', content: trimmed }
    const history = [...messages, userMsg]
    setMessages([...history, { role: 'assistant', content: '' }])
    setStreaming(true)

    const controller = new AbortController()
    abortRef.current = controller

    let assistant = ''

    try {
      await streamChat(
        history,
        (token) => {
          assistant += token
          setMessages([...history, { role: 'assistant', content: assistant }])
        },
        controller.signal
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setMessages(history)
    } finally {
      setStreaming(false)
      abortRef.current = null
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    send(input)
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  function pausePet() {
    pausedRef.current = true
    setPetMood('curious')
    setNudgeVisible(false)
    if (roamTimerRef.current !== null) window.clearTimeout(roamTimerRef.current)
  }

  function resumePet() {
    pausedRef.current = false
    if (!open) schedulePetRef.current(3600)
  }

  function openChat() {
    setNudgeVisible(false)
    setPetMood('happy')
    setOpen(true)
  }

  const panelMood: CompanionMood = streaming ? 'thinking' : input.trim() ? 'curious' : 'idle'

  return (
    <div data-assistant-widget className="assistant-widget-root">
      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fadeIn"
        />
      )}

      <div
        className={`pet-launcher-wrap ${open ? 'pet-launcher-wrap--hidden' : ''}`}
        style={{
          transform: `translate3d(${petPosition.x}px, ${petPosition.y}px, 0)`,
          transitionDuration: `${travelDuration}ms`,
          visibility: positionReady ? 'visible' : 'hidden',
        }}
      >
        {petMood === 'walking' && (
          <div className="forest-trail" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}
        {nudgeVisible && !open && (
          <div className="forest-nudge" aria-hidden="true">
            <span className="forest-nudge__spark" />
            Your little portfolio guide
          </div>
        )}
        <button
          ref={launcherRef}
          onClick={openChat}
          onPointerEnter={pausePet}
          onPointerLeave={resumePet}
          onFocus={pausePet}
          onBlur={resumePet}
          aria-label="Open chat with Nkorofi AI"
          className="chat-launcher"
        >
          <Companion mood={petMood} size="launcher" />
          <span className="chat-launcher__online" aria-hidden="true" />
        </button>
      </div>

      {/* OPEN PANEL — a separate element that appears when needed */}
      <div
        className={`
          fixed bottom-6 right-6 z-50
          w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-4rem)]
          bg-gray-950 border border-gray-800/80 rounded-3xl
          shadow-2xl shadow-cyan-500/30
          flex flex-col overflow-hidden
          transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          origin-bottom-right
          ${open
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-75 pointer-events-none'
          }
        `}
      >
        {/* Header */}
        <div className="relative flex items-center gap-3 px-5 py-4 border-b border-gray-800/80 bg-gradient-to-r from-gray-900 to-gray-900/50 flex-shrink-0">
          <div className="chat-header-avatar">
            <Companion mood={panelMood} size="header" />
            <span className="chat-header-avatar__online" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-white">Nkorofi AI</p>
            <p className="text-xs text-green-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Online · replies instantly
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gray-950 chat-scroll">
          {messages.length === 0 && (
            <div className="space-y-6">
              <div className="flex gap-3">
                <Companion mood="happy" size="message" />
                <div className="max-w-[85%] rounded-2xl rounded-tl-md px-4 py-3 text-sm leading-relaxed bg-gray-800/80 border border-gray-700/50 text-gray-100">
                  <p className="mb-1">
                    👋 Hi! I&apos;m{' '}
                    <span className="text-cyan-400 font-semibold">
                      Nkorofi AI
                    </span>
                    .
                  </p>
                  <p className="text-gray-400">
                    Ask me anything about Nkorofi&apos;s work, skills, or
                    experience.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-xs uppercase tracking-widest text-gray-600 font-semibold pl-1">
                  Try asking
                </p>
                <div className="grid gap-2">
                  {STARTER_PROMPTS.map((p) => (
                    <button
                      key={p.text}
                      onClick={() => send(p.text)}
                      className="group flex items-center gap-3 text-left text-sm bg-gray-900/80 hover:bg-gray-800 border border-gray-800 hover:border-cyan-500/50 rounded-xl px-3.5 py-3 transition-all hover:translate-x-1"
                    >
                      <span className="text-lg">{p.icon}</span>
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {p.text}
                      </span>
                      <span className="ml-auto text-gray-600 group-hover:text-cyan-400 transition-colors">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <Message
              key={i}
              role={m.role}
              content={m.content}
              streaming={
                streaming &&
                i === messages.length - 1 &&
                m.role === 'assistant'
              }
            />
          ))}

          {error && (
            <div className="text-red-400 text-xs bg-red-950/40 border border-red-800/50 rounded-xl p-3 animate-fadeIn">
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-gray-800/80 p-3 bg-gray-900/50 backdrop-blur flex gap-2 items-end flex-shrink-0"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask anything…"
            rows={1}
            disabled={streaming}
            className="flex-1 bg-gray-950/80 border border-gray-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 resize-none disabled:opacity-60 transition-all"
          />
          <button
            type="submit"
            disabled={streaming || !input.trim()}
            className="bg-gradient-to-br from-cyan-400 to-cyan-600 hover:from-cyan-300 hover:to-cyan-500 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-600 text-black font-bold rounded-xl px-4 py-2.5 text-sm transition-all hover:scale-105 disabled:hover:scale-100 shadow-lg shadow-cyan-500/20 disabled:shadow-none"
          >
            {streaming ? '···' : '→'}
          </button>
        </form>
      </div>
    </div>
  )
}
