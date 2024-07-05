'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Alert from "@mui/material/Alert"
import Typography from "@mui/material/Typography"




export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simulação de login - substitua pelo seu serviço de autenticação
        if (email === 'user@example.com' && password === 'password') {
            router.push('/dashboard'); // Redirecionar para o dashboard ou outra página
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Entrar no Painel
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                    />
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
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Entrar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
