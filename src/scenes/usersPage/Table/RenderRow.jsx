import { Box, useTheme, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { tokens } from '../../../theme/themeSettings';
import ActionIconButton from '../../components/buttons/ActionIconButton';
import { StyledBox } from './StyledTableElements';

const RenderRow = ({ index, style, data }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { openEditForm, users, handleDelete, isEditing } = data;
    const user = users[index];

    return (
        <TableRow
            sx={{
                ...style,
                display: 'flex',
            }}
        >
            <StyledBox colors={colors} hiddenOnMobile={true}>
                {user?.id}
            </StyledBox>
            <StyledBox colors={colors}>{user?.name}</StyledBox>
            <StyledBox colors={colors}>{user?.age}</StyledBox>
            <StyledBox colors={colors}>{user?.city}</StyledBox>
            <StyledBox colors={colors}>
                <Box display="flex">
                    <ActionIconButton
                        Icon={EditIcon}
                        onClick={() => openEditForm(user)}
                        disabled={isEditing}
                    />
                    <ActionIconButton
                        Icon={DeleteIcon}
                        onClick={() => handleDelete(user.id)}
                        disabled={isEditing}
                    />
                </Box>
            </StyledBox>
        </TableRow>
    );
};

export default RenderRow;
