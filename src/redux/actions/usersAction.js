const usersAction = (users) => ({
    type: "LOADED_USERS",
    payload: users
});

export { usersAction };