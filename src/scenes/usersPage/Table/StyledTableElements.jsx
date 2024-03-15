import { TableCell } from '@mui/material';
import { styled } from '@mui/system';

const StyledTableCell = styled(TableCell)(
    ({ theme, sortable, colors, hiddenOnMobile }) => ({
        backgroundColor: colors.blueAccent[700],
        width: '20%',
        cursor: sortable ? 'pointer' : 'default',
        '&:hover': {
            backgroundColor: sortable ? theme.palette.action.hover : 'inherit',
        },
        ...(hiddenOnMobile && {
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        }),
    })
);

const StyledBox = styled(TableCell)(({ colors, theme, hiddenOnMobile }) => ({
    backgroundColor: colors.primary[400],
    width: '25%',
    ...(hiddenOnMobile && {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    }),
}));

export { StyledTableCell, StyledBox };
