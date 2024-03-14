import { useEffect } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { useDispatch } from 'react-redux';
import { usersAction } from '../../redux/actions/usersAction';
import TableSection from './TableSection';
import { orderBy } from 'lodash';
import { ORDER, FIELD } from './const';
import { Box } from '@mui/material';
import ChartSection from './ChartSection';

const UsersPage = () => {
    const { data, fetchError, isLoading } = useAxiosFetch('/users');
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoading && !fetchError) {
            const usersSorteredById = orderBy(data, FIELD.ID, ORDER.ASC);
            dispatch(usersAction(usersSorteredById));
        }
        // eslint-disable-next-line
    }, [data]);

    return (
        <>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                    Loading...
                </Box>
            ) : (
                <>
                    <ChartSection />
                    <br />
                    <TableSection />
                </>
            )}
        </>
    );
};

export default UsersPage;
