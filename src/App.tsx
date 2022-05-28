import React from 'react';
import Canvas from './components/Canvas';
import './App.css';
import { Box } from '@chakra-ui/react';

function App() {
    return (
        <Box className="App" h={'100vh'} >
            <Canvas mode={'input'} />
        </Box>
    );
}

export default App;
