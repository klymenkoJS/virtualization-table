const initState = {
    users: [],
    isUserFormVisible: false
}

const usersReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOADED_USERS':
            return {
                ...state,
                users: action.payload
            };

        default:
            return state;
    }
}

export default usersReducer;