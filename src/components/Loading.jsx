import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
    return (
        <div className='flex items-center justify-center'>
            <CircularProgress />
        </div>
    );
}
