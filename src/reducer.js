
const reducer = (state, action) => {
    switch (action.type) {
        case 'JOINED':
            return {
                ...state,
                joined: true,
                userName: action.payload.name,
                roomId: action.payload.roomId
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            }
        case 'SET_MESSAGES':
            return {
                ...state,
                messages: action.payload
            }
        default:
            return state
    }
}

export default reducer;