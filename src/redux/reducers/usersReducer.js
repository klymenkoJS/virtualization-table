import { SAVE_USERS } from "../actions/const";

const initState = {
    users: [],
}

const usersReducer = (state = initState, action) => {
    switch (action.type) {
        case SAVE_USERS:
            return {
                ...state,
                users: action.payload
            };

        default:
            return state;
    }
}

export default usersReducer;