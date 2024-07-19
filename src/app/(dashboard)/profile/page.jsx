'use client'

import React from 'react';

export default function Home() {
  const handleConnectUSB = () => {
    if (confirm("Você deseja conceder permissão para acessar o dispositivo USB?")) {
      let device;
      navigator.usb.requestDevice({ filters: [] })
        .then(function (selectedDevice) {
          device = selectedDevice;
          return device.open();
        })
        .then(() => device.selectConfiguration(1))
        .then(() => device.claimInterface(device.configuration.interfaces[1].interfaceNumber))
        .then(() => console.log(device))
        .catch(error => console.error(error));
    }
  };

  return (
    <section className='flex flex-col gap-5 overflow-y-auto'>
      <h1 className='font-semibold text-3xl mb-10'>
        Perfil
      </h1>
      <button
        className='mb-5 p-2 bg-blue-500 text-white rounded'
        onClick={handleConnectUSB}
      >
        Conectar Impresora
      </button>

    </section>
  );
}
