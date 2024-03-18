import { useEffect } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { usersAction } from '../../redux/actions/usersAction';
import { orderBy } from 'lodash';
import { ORDER, FIELD } from './Table/const';
import { Box, useTheme } from '@mui/material';
import ChartSection from './Chart/ChartSection';
import { tokens } from '../../theme/themeSettings';
import { useMeasure } from 'react-use';
import UsersDataHandler from './UsersDataHandler';

const UsersPage = () => {
    const { data, fetchError, isLoading } = useAxiosFetch('/users');
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [ref, { height: containerHeight }] = useMeasure();

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
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="80vh"
                >
                    <CircularProgress sx={{ color: colors.primary[100] }} />
                </Box>
            ) : (
                <Box ref={ref} style={{ width: '100%', height: '90vh' }}>
                    <ChartSection />
                    <br />
                    <UsersDataHandler containerHeight={containerHeight} />
                </Box>
            )}
        </>
    );
};

export default UsersPage;
