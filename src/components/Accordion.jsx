'use client'

import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ProductTable from './ProductTable';


const DefaultAccordion = ({ items }) => {
    return (
        <div className='drop-shadow-lg w-full'>
            <section className='bg-white w-full px-5 pb-5 pt-8 rounded-t-md flex flex-row justify-between'>
                <div>
                    <h3 className='font-semibold font-mono text-3xl'>
                        Combos
                    </h3>
                </div>

                <div className='flex flex-row gap-2 items-center'>
                    <Button variant="contained" className='h-fit py-2'>
                        <AddIcon className='mr-2' />Adicionar Produto
                    </Button>
                    <FormControlLabel
                        value="top"
                        control={<Switch color="primary" />}
                        label="Pausar"
                        labelPlacement="top"
                    />
                    <Button variant="text" className='h-fit py-2 text-center' title='Editar Categoria'>
                        <MoreVertIcon />
                    </Button>
                </div>

            </section>
            <section>
                <Accordion
                    sx={{
                        borderTopLeftRadius: '0px !important',
                        borderTopRightRadius: '0px !important',
                    }}
                    className='shadow-none'
                >
                    <AccordionSummary
                        // expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <VisibilityIcon className='text-gray-500' />
                        <span className='ml-2 font-semibold'>
                            Ver produtos
                        </span>
                    </AccordionSummary>
                    <AccordionDetails>

                        <ProductTable
                            rows={[{ name: '100 salgados', price: 55, status: true }]}
                        />


                    </AccordionDetails>
                </Accordion>
            </section>
        </div >
    );
};

export default DefaultAccordion;
