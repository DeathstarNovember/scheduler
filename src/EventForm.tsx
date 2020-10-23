import React, { useState } from 'react'
import { Modal } from './Modal'
import { Event } from './useEvents'

type EventFormProps = {
  event: Event
  hideForm: () => void
  visible: boolean
}

export const EventForm: React.FC<EventFormProps> = ({
  event,
  hideForm,
  visible,
}) => {
  const [title, setTitle] = useState(event.title)

  const handleSubmit = (e: React.FormEvent) => {
    hideForm()
  }

  if (!visible) return null
  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            style={{ display: 'flex' }}
            name="eventTitle"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </div>
        <div>
          <button style={{ width: '100%' }} type="submit">
            save
          </button>
        </div>
        <div>
          <button style={{ width: '100%' }} onClick={hideForm}>
            cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}
