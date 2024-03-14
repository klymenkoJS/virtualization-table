import { Box, IconButton } from '@mui/material';

const ToolbarFilterButton = ({ onClick, icon, name, disabled }) => {
    return (
        <IconButton
            onClick={onClick}
            sx={{
                '&:hover': {
                    backgroundColor: 'transparent',
                },
            }}
            disabled={disabled}
        >
            {icon}
            <Box sx={{ fontSize: '10px', ml: 1 }}> {name}</Box>
        </IconButton>
    );
};

export default ToolbarFilterButton;
