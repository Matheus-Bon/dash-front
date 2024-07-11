'use client'

import CreatDeliveryManModal from '@/components/CreateDeliveryManModal';
import DefaultUserTable from '@/components/DefaultUserTable';
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';

export default function DeliveryMan() {
  const [deliveryManModal, setdeliveryManModal] = useState(false);

  const handleCardClick = () => {
    setdeliveryManModal(true);
  };

  const handleCloseModal = () => {
    setdeliveryManModal(false);
  };

  return (
    <section>
      <h1 className='font-semibold text-3xl mb-10'>
        Gerenciar Entregadores
      </h1>
      <div className='flex flex-col'>
        <div className='bg-white p-10 shadow-lg rounded-lg'>
          <span className='flex justify-end mb-5'>
            <Button variant="contained" onClick={() => handleCardClick()} >
              Criar Entregador
            </Button>
          </span>
          <DefaultUserTable />
        </div>
      </div>

      {deliveryManModal && (
        <CreatDeliveryManModal onClose={handleCloseModal} />
      )}
    </section>
  )
}
