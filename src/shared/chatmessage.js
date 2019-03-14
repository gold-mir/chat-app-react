export function formatChatMessage(username, body, room) {
    return {
        username: username,
        body: body,
        timestamp: Date.now(),
        room: room
    }
}