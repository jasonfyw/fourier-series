import React, { FC, MouseEvent } from 'react';
import { Box, Stack, Button } from '@chakra-ui/react';

type MenuProps = {
    mode: string,
    setMode: (mode: string) => void,
    removeLastPoint: () => void
}

const Menu: FC<MenuProps> = props => {
    return (
        <Box top={0} left={0} position={'absolute'} padding={'1rem'}>
            <Stack direction='row' align='center'>
                <Button 
                    colorScheme='teal' 
                    variant='solid' 
                    isLoading={props.mode === 'processing' ? true : false}
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        props.removeLastPoint()
                        props.setMode('processing')
                    }}
                >
                    Begin animating
                </Button>
            </Stack>
        </Box>
    );
}

export default Menu;