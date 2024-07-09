'use client'

import CreatDeliveryManModal from '@/components/CreateDeliveryManModal';
import DefaultUserTable from '@/components/DefaultUserTable';
import React, { useState } from 'react'
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
        Gerenciar Motoboys
      </h1>
      <div className='flex flex-col'>
        <div className='bg-white p-10 shadow-lg rounded-lg'>
          <span className='flex justify-end'>
            <Button variant="contained" onClick={() => handleCardClick()} >
              Criar Motoboy
            </Button>
          </span>
          <DefaultUserTable
            rows={[{ name: 'Matheus', phone: '21', email: 'la' }]}
          />
        </div>
      </div>

      {deliveryManModal && (
        <CreatDeliveryManModal onClose={handleCloseModal} />
      )}
    </section>
  )
}
