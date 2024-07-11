import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import getUsers from '@/services/users/getUsers';
import deleteUser from '@/services/users/deleteUser';
import { toast } from 'sonner';

const columns = [
    { id: 'name', label: 'Nome', minWidth: 170 },
    { id: 'phone', label: 'Contato', minWidth: 80 },
    { id: 'actions', label: 'Ações', minWidth: 50, align: 'center' },
];

export default function DefaultTable() {
    const [rows, setRows] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [search, setSearch] = React.useState('');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [total, setTotal] = React.useState(0);

    const fetchUsers = async (page, limit, search) => {
        const { data, statusCode } = await getUsers({ page, limit, search });

        if (statusCode !== 200) {
            toast.error('Erro ao buscar entregadores. Tente novamente.');
            return;
        }

        setRows(data.users);
        setTotal(data.total);
    };

    React.useEffect(() => {
        fetchUsers(page, rowsPerPage, searchQuery);
    }, [page, rowsPerPage, searchQuery]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSearchSubmit = () => {
        setSearchQuery(search);
        setPage(0);
    };

    const handleDelete = async (id) => {
        const { statusCode } = await deleteUser(id);

        if (statusCode !== 204) {
            toast.error('Erro ao excluir entregador. Tente novamente.');
            return;
        }

        toast.success('Entregador excluído com sucesso.');
        fetchUsers(page, rowsPerPage, searchQuery);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <div className='flex mt-2'>
                <TextField
                    label="Buscar"
                    variant="outlined"
                    value={search}
                    onChange={handleSearchChange}
                    sx={{ mb: 2, mr: 1 }}
                />
                <Button variant="contained" onClick={handleSearchSubmit} className='my-4'>
                    Enviar
                </Button>
            </div>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'actions' ? (
                                                        <IconButton onClick={() => handleDelete(row._id)} title='Excluir Entregador'>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    ) : (
                                                        value
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
