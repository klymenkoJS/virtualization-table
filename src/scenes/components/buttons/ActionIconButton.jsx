import React from 'react';
import { IconButton } from '@mui/material';

const ActionIconButton = ({
    Icon,
    onClick,
    disabled = false,
    size = 'small',
    fontSize = 'inherit',
}) => {
    return (
        <IconButton size={size} onClick={onClick} disabled={disabled}>
            <Icon fontSize={fontSize} />
        </IconButton>
    );
};

export default ActionIconButton;
