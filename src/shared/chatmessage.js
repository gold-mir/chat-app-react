export function formatChatMessage(username, body){
    return {
        username: username,
        body: body,
        timestamp: Date.now()
    }
}