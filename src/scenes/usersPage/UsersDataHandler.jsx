import { orderBy } from 'lodash';
import api from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import UsersControlPanel from './UsersControlPanel';
import { usersAction } from '../../redux/actions/usersAction';

const UsersDataHandler = ({ containerHeight }) => {
    const users = useSelector((state) => state.users.users);
    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        try {
            await api.delete(`/users/${id}`);
            const filteredUsers = users.filter((user) => user.id !== id);
            dispatch(usersAction(filteredUsers));
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditFormSubmit = async (user) => {
        const { id } = user;
        try {
            await api.put(`/users/${id}`, user);
            const updatedUsers = users.map((currentUsers) =>
                currentUsers.id === id ? user : currentUsers
            );
            dispatch(usersAction(updatedUsers));
            return true;
        } catch (err) {
            console.error(err);
        }
    };

    const handleNewUserFormSubmit = async (user, sortField, sortOrder) => {
        const id = Date.now();
        try {
            const { data } = await api.post(`/users`, {
                ...user,
                id: String(id),
                sortId: id,
            });
            const updatedUsers = [...users, data];

            const orderedUsers = orderBy(updatedUsers, sortField, sortOrder);
            dispatch(usersAction(orderedUsers));
            return true;
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <UsersControlPanel
                handleDelete={handleDelete}
                handleNewUserFormSubmit={handleNewUserFormSubmit}
                handleEditFormSubmit={handleEditFormSubmit}
                containerHeight={containerHeight}
            />
        </>
    );
};

export default UsersDataHandler;
