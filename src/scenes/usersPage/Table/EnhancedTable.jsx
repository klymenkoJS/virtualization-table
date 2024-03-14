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
import { ORDER, FIELD } from '../const';

const EnhancedTable = ({
    filteredUsers,
    handleEditUser,
    handleDelete,
    onSort,
    sortField,
    sortOrder,
    isEditing,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { id: FIELD.ID, label: 'ID', sortable: true },
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
            <TableContainer>
                <Table stickyHeader aria-label="user table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    colors={colors}
                                    sortable={column.sortable}
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
                        height={350}
                        itemCount={filteredUsers.length}
                        itemSize={53}
                        width="100%"
                        itemData={{
                            handleEditUser,
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
