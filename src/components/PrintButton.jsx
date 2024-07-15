'use client'

import { useState } from 'react';

export default function PrintButton() {
    const [loading, setLoading] = useState(false);

    const handlePrint = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/print', {
                method: 'POST',
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert(`Erro: ${data.message}`);
            }
        } catch (error) {
            console.error('Erro ao imprimir:', error);
            alert('Erro ao imprimir');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handlePrint} disabled={loading}>
            {loading ? 'Imprimindo...' : 'Imprimir Tabela'}
        </button>
    );
}
