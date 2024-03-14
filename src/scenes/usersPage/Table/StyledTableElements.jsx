import { TableCell } from '@mui/material';
import { styled } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme, sortable, colors }) => ({
    backgroundColor: colors.blueAccent[700],
    width: '20%',
    cursor: sortable ? 'pointer' : 'default',
    '&:hover': {
        backgroundColor: sortable ? theme.palette.action.hover : 'inherit',
    },
}));

const StyledBox = styled(TableCell)(({ colors }) => ({
    backgroundColor: colors.primary[400],
    width: '20%',
}));

export { StyledTableCell, StyledBox };
