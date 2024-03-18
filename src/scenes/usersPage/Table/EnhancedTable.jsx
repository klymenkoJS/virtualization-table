import { FixedSizeList as List } from 'react-window';
import {
    Table,
    TableContainer,
    TableHead,
    TableRow,
    useTheme,
} from '@mui/material';
import { tokens } from '../../../theme/themeSettings';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import RenderRow from './RenderRow';
import { StyledTableCell } from './StyledTableElements';
import { ORDER, FIELD, topbarHeight, chartHeight } from './const';

const EnhancedTable = ({
    filteredUsers,
    openEditForm,
    handleDelete,
    onSort,
    sortField,
    sortOrder,
    isEditing,
    containerHeight,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const maxHeightContainer = containerHeight - topbarHeight - chartHeight;

    const columns = [
        { id: FIELD.ID, label: 'ID', sortable: true, hiddenOnMobile: true },
        { id: FIELD.NAME, label: 'Name', sortable: true },
        { id: FIELD.AGE, label: 'Age', sortable: true },
        { id: FIELD.CITY, label: 'City', sortable: true },
        { id: FIELD.ACTIONS, label: 'Actions', sortable: false },
    ];

    const createSortHandler = (column) =>
        column.sortable ? () => onSort(column.id) : null;

    const renderSortIcon = (column, sortField, sortOrder) => {
        if (column.sortable && sortField === column.id) {
            return sortOrder === ORDER.ASC ? (
                <ArrowUpwardIcon fontSize="small" />
            ) : (
                <ArrowDownwardIcon fontSize="small" />
            );
        }
        return null;
    };

    return (
        <>
            <TableContainer
                sx={{
                    backgroundColor: colors.primary[400],
                    maxHeight: maxHeightContainer,
                }}
            >
                <Table stickyHeader aria-label="user table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    colors={colors}
                                    sortable={column.sortable}
                                    hiddenOnMobile={column.hiddenOnMobile}
                                    onClick={createSortHandler(column)}
                                >
                                    {column.label}
                                    {renderSortIcon(
                                        column,
                                        sortField,
                                        sortOrder
                                    )}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                </Table>
                {filteredUsers.length > 0 && (
                    <List
                        height={maxHeightContainer - 60}
                        itemCount={filteredUsers.length}
                        itemSize={53}
                        itemData={{
                            openEditForm,
                            users: filteredUsers,
                            handleDelete,
                            isEditing,
                        }}
                    >
                        {RenderRow}
                    </List>
                )}
            </TableContainer>
        </>
    );
};

export default EnhancedTable;
