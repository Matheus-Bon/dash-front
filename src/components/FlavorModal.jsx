'use client'

import React, { useState } from 'react';
import { toast } from 'sonner';
import FlavorTable from './FlavorTable';

export default function FlavorModal({ onClose }) {
    const [formData, setFormData] = useState({
        name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.phone || !formData.name) {
            toast.warning('Os campos devem ser preenchidos')
        }

        const result = await createFlavor();

        if (result.statusCode === 201) {
            toast.success('Entregador criado com sucesso');
            onClose();
            return;
        }

        const msgError = result.message.split(' - ').join(' & ');
        toast.error(msgError);
        return;

    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 shadow-md max-w-3xl w-full flex flex-col">
                <section className='mb-5'>
                    <h2 className="text-2xl font-bold mb-4">Lidar com Sabores</h2>
                    <form onSubmit={handleSubmit} className='flex flex-row gap-5 justify-between items-center'>
                        <div className="mb-4">
                            <label className="block text-gray-700">Nome</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 p-2 w-[550px] border rounded-md"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="py-2 px-10 mt-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md h-fit"
                            >
                                Criar
                            </button>
                        </div>
                    </form>
                </section>

                <section className='mb-5'>
                    <FlavorTable rows={[{name: 'Coxinha'}]}/>
                </section>

                <button
                    type="button"
                    onClick={onClose}
                    className="mr-4 py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}
