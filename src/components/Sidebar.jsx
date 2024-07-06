'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from 'next/link'

export default function Sidebar() {
    const router = useRouter();

    const handleLogout = () => {
        // Lógica para logout
        console.log('Logout');
    };

    const menuItems = [
        { name: 'Início', icon: <HomeIcon />, path: '/' },
        { name: 'Produtos', icon: <InventoryIcon />, path: '/products' },
        { name: 'Motoboys', icon: <SportsMotorsportsIcon />, path: '/motoboys' },
        { name: 'Perfil', icon: <PersonIcon />, path: '/profile' },
    ];

    return (
        <div className="flex flex-col h-screen w-64 bg-gray-800 text-white">
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
                    <span className="ml-4">Logout</span>
                </button>
            </div>
        </div>
    );
}
