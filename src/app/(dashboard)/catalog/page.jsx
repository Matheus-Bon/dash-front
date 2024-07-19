'use client'

import React, { useState } from 'react';
import Accordion from '@/components/Accordion';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CategoryModal from '@/components/CategoryModal';
import FlavorModal from '@/components/FlavorModal';


export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState(false);

  const openCategoryModal = () => {
    setSelectedCategory(true);
  };

  const handleCloseModal = () => {
    setSelectedCategory(false);
  };

  const openFlavorModal = () => {
    setSelectedFlavor(true);
  };

  const handleCloseFlavorModal = () => {
    setSelectedFlavor(false);
  };

  return (
    <section>
      <div className='mb-10'>
        <h1 className='font-extrabold text-3xl'>
          Catálogo
        </h1>
      </div>
      <div className='mb-20 flex flex-row justify-between gap-20'>

        <div className='bg-white pt-5 pl-5 pb-8 w-7/12 shadow-lg flex flex-col'>
          <div className='mb-5'>
            <h1 className='font-medium text-xl'>
              Categorias
            </h1>
          </div>
          <div>
            <Button variant="contained" className='h-fit py-2' onClick={() => openCategoryModal()}>
              Criar Categoria
            </Button>
          </div>
        </div>

        <div className='bg-white pt-5 pl-5 w-7/12 shadow-lg flex flex-col'>
          <div className='mb-5'>
            <h1 className='font-medium text-xl'>
              Sabores
            </h1>
          </div>
          <div>
            <Button variant="contained" className='h-fit py-2' onClick={() => openFlavorModal()}>
              Configurar sabores
            </Button>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-5 items-center'>
        <Accordion />
      </div>

      {selectedCategory && (
        <CategoryModal onClose={handleCloseModal} />
      )}

      {selectedFlavor && (
        <FlavorModal onClose={handleCloseFlavorModal} />
      )}


    </section>
  )
}
