'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { toast } from 'sonner'
import login from '@/services/auth/login'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.warning('Os campos não podem estar vazios');
            return;
        }

        setLoading(true);

        try {
            const body = { email, password };
            const { status, statusCode, message, data } = await login(body);

            if (statusCode !== 200) {
                toast.error(message);
                return;
            }

            toast.success('Login realizado com sucesso');

            router.push('/');

        } catch (error) {
            toast.error('Ocorreu um erro ao tentar fazer login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-slate-200">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <Typography variant="h4" component="h1" gutterBottom className="text-center">
                    Entrar no Painel
                </Typography>
                <form onSubmit={handleSubmit} noValidate className="mt-4">
                    <div className="mb-4">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="mb-6">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {loading ? 'Carregando...' : 'Entrar'}
                    </Button>
                </form>
            </div>
        </main>
    );
}
