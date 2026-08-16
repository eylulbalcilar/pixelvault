import { useEffect } from 'react'

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000)
      return () => clearTimeout(timer)
    }
  }, [message, onClose])

  if (!message) return null

  return (
    <div className={`notification ${type}`}>
      {message}
      <button className="notification-close" onClick={onClose}>×</button>
    </div>
  )
}

export default Notification
