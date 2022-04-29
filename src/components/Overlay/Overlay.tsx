import { Box, Text } from '@chakra-ui/react';
import React from 'react';

interface OverlayProps {
    n: number,
    t: number,
    mode: string,
    showOverlay: boolean,
    vectorSum: [number, number]
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
            display={props.showOverlay ? '?' : 'none'}
        >
            <Text>mode = {props.mode}</Text>
            <Text>n = {props.n}</Text>
            <Text>t = {Math.round(props.t * 1000) / 1000}</Text>
            <Text>value = {Math.round(props.vectorSum[0])} + {Math.round(props.vectorSum[1])}<i>i</i></Text>
        </Box>
    );
}

export default Overlay;