import { useState, useEffect } from 'react'

const WORDS = ['AI Agents', 'Chatbots', 'AI Portals', 'Automations', 'Copilots']

export default function RotatingText() {
  const [text, setText] = useState('')
  const [wi, setWi] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = WORDS[wi]
    let delay = deleting ? 45 : 95
    if (!deleting && text === word) delay = 1500 // pause when fully typed
    if (deleting && text === '') delay = 350 // pause before next word

    const t = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setWi((p) => (p + 1) % WORDS.length)
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
      }
    }, delay)

    return () => clearTimeout(t)
  }, [text, deleting, wi])

  return (
    <span className="rotating">
      <span className="grad rotating-word">{text}</span>
      <span className="type-caret" />
    </span>
  )
}
