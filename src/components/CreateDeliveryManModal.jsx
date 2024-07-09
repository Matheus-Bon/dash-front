'use client'

import createUser from '@/services/users/createUser';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function CreatDeliveryManModal({ onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: 'Mudar@2024',
        role: 'delivery_man'
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

        const email = `${formData.phone}@email.com`;
        const phone = `55${formData.phone}`;

        formData.email = email;
        formData.phone = phone;

        const result = await createUser(formData);

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
            <div className="bg-white rounded-lg p-6 shadow-md max-w-3xl w-full">
                <h2 className="text-2xl font-bold mb-4">Criar Entregador</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nome</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Celular</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder='21999999999'
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="hidden"
                            name="role"
                            value={formData.role}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-4 py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                        >
                            Criar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
