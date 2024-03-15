import { useState } from 'react';
import { orderBy } from 'lodash';
import api from '../../api';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import Form from './Form/Form';
import FilterSection from './FilterSection';
import ToolbarFilterButton from '../components/buttons/ToolbarFilterButton';
import { useDispatch, useSelector } from 'react-redux';
import { usersAction } from '../../redux/actions/usersAction';
import EnhancedTable from './Table/EnhancedTable';
import { ORDER, FIELD, initialFormValues } from './const';

const TableSection = () => {
    const [sortOrder, setSortOrder] = useState(ORDER.ASC); // DESC
    const [sortField, setSortField] = useState(FIELD.ID); // NAME, AGE, CITY
    const [displayFilters, setDispayFilters] = useState(false);
    const [displayForm, setDisplayForm] = useState(false);
    const [editValue, setEditValue] = useState(null);
    const [search, setSearch] = useState('');
    const [columnFilter, setColumnFilter] = useState(FIELD.NAME);

    const users = useSelector((state) => state.users.users);
    const dispatch = useDispatch();

    const handleEditUser = async (user) => {
        setEditValue(user);
        setDisplayForm(true);
    };

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
            setEditValue(null);
            setDisplayForm(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleNewUserFormSubmit = async (user) => {
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
            setDisplayForm(false);
        } catch (err) {
            console.error(err);
        }
    };

    const onSort = (sortField) => {
        const clonedUsers = [...users];
        const sortType = sortOrder === ORDER.ASC ? ORDER.DESC : ORDER.ASC;
        const orderedUsers = orderBy(clonedUsers, sortField, sortType);
        dispatch(usersAction(orderedUsers));

        setSortOrder(sortType);
        setSortField(sortField);
    };

    const getFilteredUsers = () => {
        if (!search) {
            return users;
        }

        return users.filter((user) => {
            if (typeof user[columnFilter] === 'string') {
                return user[columnFilter]
                    .toLowerCase()
                    .includes(search.toLowerCase());
            } else {
                return String(user[columnFilter]) === search;
            }
        });
    };

    const resetFilters = () => {
        setSearch('');
        setColumnFilter(FIELD.NAME);
        setDispayFilters(false);
    };

    const filterDisplayHandler = () => {
        if (displayFilters) {
            resetFilters();
            return;
        }
        setDispayFilters(true);
    };

    const closeUserForm = () => {
        setDisplayForm(false);
        setEditValue(null);
    };

    const filteredUsers = getFilteredUsers();

    return (
        <>
            <ToolbarFilterButton
                onClick={filterDisplayHandler}
                name="FILTERS"
                icon={<FilterListIcon />}
            />
            <ToolbarFilterButton
                onClick={() => setDisplayForm(!displayForm)}
                icon={<AddIcon />}
                name="ADD NEW USER"
                disabled={Boolean(editValue)}
            />
            {displayForm && (
                <Form
                    initialValues={editValue ? editValue : initialFormValues}
                    onClose={closeUserForm}
                    onSubmit={
                        editValue
                            ? handleEditFormSubmit
                            : handleNewUserFormSubmit
                    }
                />
            )}
            {displayFilters && (
                <FilterSection
                    onClose={resetFilters}
                    setSearch={setSearch}
                    setColumnFilter={setColumnFilter}
                    search={search}
                    columnFilter={columnFilter}
                />
            )}
            <EnhancedTable
                filteredUsers={filteredUsers}
                handleEditUser={handleEditUser}
                handleDelete={handleDelete}
                onSort={onSort}
                sortField={sortField}
                sortOrder={sortOrder}
                isEditing={Boolean(editValue) || displayForm}
            />
        </>
    );
};

export default TableSection;
