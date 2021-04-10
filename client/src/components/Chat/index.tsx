import { useState, useEffect, FormEvent } from 'react'
import { Socket } from 'socket.io-client'
import { Input, Messages } from '@components'
import { MessageInterface } from '@interfaces'
import './Chat.css'

interface Props {
  socket: Socket,
  name: string
}

const Chat = ({ socket, name }: Props) => {
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<MessageInterface[]>([])

  useEffect(() => {
    socket.on('message', (message: MessageInterface) => {
      setMessages(prevState => [ ...prevState, message ])
    })
  }, [])

  const sendMessage = (e: FormEvent) => {
    e.preventDefault()

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  return (
    <>
      {messages && <Messages messages={messages} name={name} />}
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </>
  )
}

export default Chat
