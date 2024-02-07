// Input box for chat messages

import React, { useState } from 'react'
import { Button, Input, Select, Space } from 'antd';

const MessageInput = ({ sendMessage: onSendMessage }) => {

    const [message, setMessage] = useState('')
    

    const handleSend = () => {
        onSendMessage(message)
        setMessage('')
    }

    return (
        <Space.Compact style={{ width: '100%' }}>
            <Input defaultValue="Combine input and button" />
            <Button type="primary">Submit</Button>
        </Space.Compact>
    )
}

export default MessageInput;