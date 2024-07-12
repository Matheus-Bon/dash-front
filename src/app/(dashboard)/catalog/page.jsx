
import Accordion from '@/components/Accordion'
import React from 'react'

const items = [
  {
    title: "Combo 25 salgados + 10 mini churros",
    price: "R$ 31,90",
    // image: "path/to/image1.jpg",
    status: "Pausado",
  },
  {
    title: "Combo 50 salgados + 20 mini churros",
    price: "R$ 51,00",
    // image: "path/to/image2.jpg",
    status: "Pausado",
  },
];

export default function Products() {
  return (
    <section>
      <div className='mb-10'>
        <h1 className='font-extrabold text-3xl'>
          Catálogo
        </h1>
      </div>
      <div className='flex flex-col gap-5 items-center'>
        <Accordion />
      </div>
    </section>
  )
}
