
// store id of users who are 
const currentUsers = []

export const activateUser = (id, name, room ) => {
    const user = {
        id: id,
        name: name,
        room: room
    }
    currentUsers.push(user)
    return user
}


export const deactivateUser = (id) => {
    const index = currentUsers.findIndex(user => user.id === id)
    if (index !== -1) {
        return currentUsers.splice(index, 1)[0]
    }
}

export const getUser = (id) => {
    return currentUsers.find(user => user.id === id)
}

export default currentUsers