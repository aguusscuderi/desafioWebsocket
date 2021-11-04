const socket = io()

const saveNote = (title, price) => {
    socket.emit('client:newnote', {
        title,
        price
    })
}

socket.on('server:newnote', addNote)

socket.on('server:loadnotes', loadNotes)

const saveMessage = (email, message) => {
    socket.emit('client:newmessage', {
        email,
        message
    })
}

socket.on('server:newmessage', addMessage)

socket.on('server:loadmessages', loadMessage)