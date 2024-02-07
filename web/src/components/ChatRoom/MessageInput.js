// Input box for chat messages

import React, { useState } from 'react'
import { Button, Input, Select, Space } from 'antd';

const MessageInput = ({ sendMessage }) => {

    const [message, setMessage] = useState('')
    

    const handleSend = () => {
        sendMessage(message)
        setMessage('')
    }
    

    return (
        <Space.Compact style={{ width: '100%' }}>
            <Input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                defaultValue="Combine input and button" 
                onPressEnter={handleSend}
            />
            <Button type="primary" onClick={handleSend}>
                Send
            </Button>
        </Space.Compact>
    )
}

export default MessageInput;