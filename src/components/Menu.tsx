import React, { FC, MouseEvent } from 'react';
import { Box, Stack, Button } from '@chakra-ui/react';

type MenuProps = {
    setMode: (mode: string) => void
}

const Menu: FC<MenuProps> = props => {
    return (
        <Box top={0} left={0} position={'absolute'} padding={'1rem'}>
            <Stack direction='row' align='center'>
                <Button 
                    colorScheme='teal' 
                    variant='outline' 
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        props.setMode('animate')
                    }}
                >
                    Begin animating
                </Button>
            </Stack>
        </Box>
    );
}

export default Menu;