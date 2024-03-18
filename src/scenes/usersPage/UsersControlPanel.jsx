import { useState, useMemo } from 'react';
import { orderBy } from 'lodash';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import Form from './Form/Form';
import FilterSection from './Filter/FilterSection';
import ToolbarFilterButton from '../components/buttons/ToolbarFilterButton';
import { useSelector } from 'react-redux';
import EnhancedTable from './Table/EnhancedTable';
import { ORDER, FIELD, initialFormValues } from './Table/const';

const UsersControlPanel = ({
    containerHeight,
    handleDelete,
    handleNewUserFormSubmit,
    handleEditFormSubmit,
}) => {
    const [sortOrder, setSortOrder] = useState(ORDER.ASC); // DESC
    const [sortField, setSortField] = useState(FIELD.ID); // NAME, AGE, CITY
    const [displayFilters, setDisplayFilters] = useState(false);
    const [displayForm, setDisplayForm] = useState(false);
    const [editValue, setEditValue] = useState(null);
    const [search, setSearch] = useState('');
    const [columnFilter, setColumnFilter] = useState(FIELD.NAME);
    const users = useSelector((state) => state.users.users);

    const openEditForm = async (user) => {
        setEditValue(user);
        setDisplayForm(true);
    };

    const onEditUser = async (user) => {
        const isUpdated = await handleEditFormSubmit(user);
        if (isUpdated) {
            setEditValue(null);
            setDisplayForm(false);
        }
    };

    const onCreateUser = async (user) => {
        const isCreated = await handleNewUserFormSubmit(
            user,
            sortField,
            sortOrder
        );
        if (isCreated) setDisplayForm(false);
    };

    const handleSortChange = (field) => {
        setSortField(field);
        setSortOrder(sortOrder === ORDER.ASC ? ORDER.DESC : ORDER.ASC);
    };

    const resetFilters = () => {
        setSearch('');
        setColumnFilter(FIELD.NAME);
        setDisplayFilters(false);
    };

    const filterDisplayHandler = () => {
        if (displayFilters) {
            resetFilters();
            return;
        }
        setDisplayFilters(true);
    };

    const closeUserForm = () => {
        setDisplayForm(false);
        setEditValue(null);
    };

    const getFilteredUsers = (users) =>
        users.filter((user) => {
            if (typeof user[columnFilter] === 'string') {
                return user[columnFilter]
                    .toLowerCase()
                    .includes(search.toLowerCase());
            } else {
                return String(user[columnFilter]) === search;
            }
        });

    const filteredUsers = useMemo(() => {
        if (!search) return users;
        return getFilteredUsers(users);
        // eslint-disable-next-line
    }, [users, search, columnFilter]);

    const sortedUsers = useMemo(() => {
        return orderBy(filteredUsers, sortField, sortOrder);
    }, [filteredUsers, sortField, sortOrder]);

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
                    onSubmit={editValue ? onEditUser : onCreateUser}
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
                filteredUsers={sortedUsers}
                openEditForm={openEditForm}
                handleDelete={handleDelete}
                onSort={handleSortChange}
                sortField={sortField}
                sortOrder={sortOrder}
                isEditing={Boolean(editValue) || displayForm}
                containerHeight={containerHeight}
            />
        </>
    );
};

export default UsersControlPanel;
