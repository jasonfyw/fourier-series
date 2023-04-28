import { Box, Text } from '@chakra-ui/react';
import React from 'react';

interface OverlayProps {
    n: number,
    t: number,
    mode: string
}

const Overlay = (props: OverlayProps) => {
    return (
        <Box
            position={'fixed'}
            left={0}
            bottom={0}
            textAlign={'left'}
            pl={5}
            pb={2}
        >
            <Text>mode = {props.mode}</Text>
            <Text>n = {props.n}</Text>
            <Text>t = {Math.round(props.t * 1000) / 1000}</Text>
        </Box>
    );
}

export default Overlay;