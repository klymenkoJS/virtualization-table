import { SAVE_USERS } from "./const";

const usersAction = (users) => ({
    type: SAVE_USERS,
    payload: users
});

export { usersAction };