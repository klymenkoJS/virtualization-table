import CloseIcon from '@mui/icons-material/Close';
import { tokens } from '../../theme/themeSettings';
import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    useTheme,
    Grid,
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
        <Grid
            container
            sx={{
                backgroundColor: colors.primary[400],
                alignItems: 'center',
                p: 2,
                gap: 2,
            }}
        >
            <Grid item>
                <IconButton size="small" onClick={onClose}>
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            </Grid>
            <Grid item xs={12} sm={true}>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Value"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Grid>
            <Grid item>
                <FormControl sx={{ minWidth: '200px' }}>
                    <InputLabel id="columns-label">Columns</InputLabel>
                    <Select
                        labelId="columns-label"
                        id="columns-select"
                        value={columnFilter}
                        onChange={(e) => setColumnFilter(e.target.value)}
                        label="Columns"
                    >
                        <MenuItem value={FIELD.NAME}>Name</MenuItem>
                        <MenuItem value={FIELD.AGE}>Age</MenuItem>
                        <MenuItem value={FIELD.CITY}>City</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default FilterSection;
