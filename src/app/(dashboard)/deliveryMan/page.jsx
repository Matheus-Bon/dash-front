'use client'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CreatDeliveryManModal from '@/components/CreateDeliveryManModal';
import DefaultUserTable from '@/components/DefaultUserTable';
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import getUsers from '@/services/users/getUsers';
import deleteUser from '@/services/users/deleteUser';
import { toast } from 'sonner';

export default function DeliveryMan() {
  const [deliveryManModal, setdeliveryManModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [total, setTotal] = useState(0);
  const [deliveryMan, setDeliveryMan] = useState('');

  const handleCardClick = () => {
    setdeliveryManModal(true);
  };

  const handleCloseModal = () => {
    setdeliveryManModal(false);
  };

  const fetchUsers = async (page, limit, search) => {
    const { data, statusCode } = await getUsers({ page, limit, search });

    if (statusCode !== 200) {
      toast.error('Erro ao buscar entregadores. Tente novamente.');
      return;
    }

    setRows(data.users);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchUsers(page, rowsPerPage, searchQuery);
  }, [page, rowsPerPage, searchQuery]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchSubmit = () => {
    setSearchQuery(search);
    setPage(0);
  };

  const handleDelete = async (id) => {
    const { statusCode } = await deleteUser(id);

    if (statusCode !== 200) {
      toast.error('Erro ao excluir entregador. Tente novamente.');
      return;
    }

    toast.success('Entregador excluído com sucesso.');
    fetchUsers(page, rowsPerPage, searchQuery);
  };

  const handleDeliveryManChange = (event) => {
    const selectedName = event.target.options[event.target.selectedIndex].text;
    const id = event.target.options[event.target.selectedIndex].value;

    setDeliveryMan(id);
    localStorage.setItem('deliveryManOfTheDay', id);
  };

  useEffect(() => {
    const data = localStorage.getItem('deliveryManOfTheDay');
    setDeliveryMan(data);
  }, [deliveryMan])

  return (
    <section>
      <h1 className='font-semibold text-3xl mb-10'>
        Gerenciar Entregadores
      </h1>
      <div className='flex flex-col gap-5'>

        <div className='bg-white p-10 shadow-lg rounded-lg'>
          <h3 className='font-semibold text-lg mb-5'>
            Lista de Entregadores
          </h3>
          <span className='flex justify-end mb-5'>
            <Button variant="contained" onClick={handleCardClick}>
              Criar Entregador
            </Button>
          </span>
          <DefaultUserTable
            rows={rows}
            total={total}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleDelete={handleDelete}
            search={search}
            setSearch={setSearch}
            handleSearchSubmit={handleSearchSubmit}
          />
        </div>

        <div className='bg-white p-10 shadow-lg rounded-lg'>

          <h3 className='font-semibold text-lg mb-5'>
            Entregador do Dia
          </h3>

          <div className='flex justify-start'>
            <form className='w-40'>
              <select
                id="deliveryManSelect"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={deliveryMan}
                onChange={handleDeliveryManChange}
              >
                <option disabled>{rows.find(el => el._id === deliveryMan)?.name || "Selecione um entregador"}</option>
                {rows && rows.map(user => (
                  <option key={user._id} value={user._id}>{user.name}</option>
                ))}
              </select>
            </form>
          </div>
        </div>
      </div>

      {deliveryManModal && (
        <CreatDeliveryManModal onClose={handleCloseModal} />
      )}
    </section>
  );
}
