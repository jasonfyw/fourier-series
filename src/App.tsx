import React from 'react';
import Canvas from './components/Canvas';
import './App.css';
import { Box } from '@chakra-ui/react';

function App() {
    return (
        <Box className="App" background={'#000000'} h={'100vh'} >
            <Canvas mode={'input'} lineColor={'#eeeeee'} />
        </Box>
    );
}

export default App;
