import CloseIcon from '@mui/icons-material/Close';
import { tokens } from '../../theme/themeSettings';
import {
    Box,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    useTheme,
} from '@mui/material';
import { FIELD } from './const';

const FilterSection = ({
    search,
    setSearch,
    columnFilter,
    setColumnFilter,
    onClose,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                gap: '20px',
                backgroundColor: colors.primary[400],
                padding: '10px',
            }}
        >
            <IconButton size="small" onClick={onClose}>
                <CloseIcon fontSize="inherit" />
            </IconButton>
            <TextField
                id="outlined-basic"
                label="Value"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <FormControl>
                <InputLabel id="columns-label">Columns</InputLabel>
                <Select
                    labelId="columns-label"
                    id="columns-select"
                    value={columnFilter}
                    onChange={(e) => setColumnFilter(e.target.value)}
                    autoWidth
                    label="Columns"
                >
                    <MenuItem value={FIELD.NAME}>Name</MenuItem>
                    <MenuItem value={FIELD.AGE}>Age</MenuItem>
                    <MenuItem value={FIELD.CITY}>City</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default FilterSection;
