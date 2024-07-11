'use client'

import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from 'next/link'
import logout from '@/services/auth/logout';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
    const userRouter = useRouter();

    const handleLogout = async () => {
        await logout();
        userRouter.push('/login');
    };

    const menuItems = [
        { name: 'Pedidos', icon: <HomeIcon />, path: '/' },
        { name: 'Catálogo', icon: <InventoryIcon />, path: '/catalog' },
        { name: 'Entregadores', icon: <SportsMotorsportsIcon />, path: '/deliveryMan' },
        { name: 'Perfil', icon: <PersonIcon />, path: '/profile' },
    ];

    return (
        <section className="flex flex-col h-screen w-64 bg-gray-800 text-white">
            <div className="flex-grow">
                <nav className="mt-10">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.path}
                            className="flex items-center p-3 hover:bg-gray-700 w-full text-left"
                        >
                            {item.icon}
                            <span className="ml-4">{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="flex flex-col p-3 border-t border-gray-700">
                <button
                    onClick={handleLogout}
                    className="flex items-center p-3 hover:bg-gray-700 w-full text-left"
                >
                    <ExitToAppIcon />
                    <span className="ml-4">Sair</span>
                </button>
            </div>
        </section>
    );
}
