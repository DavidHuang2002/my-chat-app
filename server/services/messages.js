export const timeStampMsg = (msg) => {
    const time = new Date().toLocaleTimeString()
    return {
        ...msg,
        time
    }
}

export const makeMessage = (name, text) => {
    let msg = {
        name,
        text
    }

    return timeStampMsg(msg)
}