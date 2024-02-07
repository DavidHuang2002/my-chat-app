// Input box for chat messages

import React, { useState } from 'react'
import { Button, Input, Space } from 'antd';

const MessageInput = ({ sendMessage, onChange }) => {

    const [message, setMessage] = useState('')
    const handleChange = (e) => {
        onChange()
        setMessage(e.target.value)
    }
    

    const handleSend = () => {
        sendMessage(message)
        setMessage('')
    }
    

    return (
        <Space.Compact style={{ width: '100%' }}>
            <Input 
                value={message}
                onChange={handleChange}
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