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

const DefaultAccordion = ({ items }) => {
    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    classes={{
                        content: 'accordion-summary-content',
                    }}
                    className='p-10 pt-2 align-top'
                >
                    <div className='w-10/12 flex justify-between align-top'>
                        <div>
                            <h3 className='font-bold text-2xl'>
                                Combos
                            </h3>
                        </div>
                        <div>
                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Adicionar Item
                            </button>

                            <span className='ml-5'>
                                <FormControlLabel
                                    value="top"
                                    control={<Switch color="primary" />}
                                    label="Top"
                                    labelPlacement="top"
                                />
                            </span>

                        </div>
                    </div>

                </AccordionSummary>
                <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default DefaultAccordion;
