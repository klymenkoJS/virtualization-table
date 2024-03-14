import { Box, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { tokens } from '../../../theme/themeSettings';
import ActionIconButton from '../../components/buttons/ActionIconButton';
import { StyledBox } from './StyledTableElements';

const RenderRow = ({ index, style, data }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { handleEditUser, users, handleDelete, isEditing } = data;
    const user = users[index];

    return (
        <Box
            sx={{
                ...style,
                display: 'flex',
                boxSizing: 'border-box',
            }}
        >
            <StyledBox colors={colors}>{user?.id}</StyledBox>
            <StyledBox colors={colors}>{user?.name}</StyledBox>
            <StyledBox colors={colors}>{user?.age}</StyledBox>
            <StyledBox colors={colors}>{user?.city}</StyledBox>
            <StyledBox colors={colors}>
                <ActionIconButton
                    Icon={EditIcon}
                    onClick={() => handleEditUser(user)}
                    disabled={isEditing}
                />
                <ActionIconButton
                    Icon={DeleteIcon}
                    onClick={() => handleDelete(user.id)}
                    disabled={isEditing}
                />
            </StyledBox>
        </Box>
    );
};

export default RenderRow;
