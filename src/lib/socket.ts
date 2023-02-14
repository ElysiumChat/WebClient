import io from 'socket.io-client'
import { EventEmitter } from 'events'
import type { Message } from '../global'

const ws = io('http://localhost:3030')

export const login = (token: string) => {
    ws.emit('login', {
        token: token
    })
}

export class Channel extends EventEmitter {
    constructor(id: string) {
        super()
        ws.on('message', value => {
            const message = <Message>value
            if(message.channel != id)return
            this.emit('message', message)
        })
    }
}