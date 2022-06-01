import React, { FC, MouseEvent } from 'react';
import { Box, Stack, Button, IconButton, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import DrawerMenu from './DrawerMenu';


type MenuProps = {
    mode: string,
    setMode: (mode: string) => void,
    setDrawerIsOpen: (isOpen: boolean) => void
}

const Menu: FC<MenuProps> = props => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box top={0} left={0} position={'absolute'}>
            <Stack direction='row' align='center' spacing={0}>
                <IconButton
                    aria-label='Open options menu'
                    colorScheme='teal'
                    variant='solid'
                    borderRadius='0px'
                    marginRight='0px'
                    width='40px'
                    height='40px'
                    onClick={() => {
                        props.setDrawerIsOpen(true)
                        onOpen()
                    }}
                    icon={<HamburgerIcon/>}
                />
                <Button 
                    colorScheme='teal' 
                    variant='solid'
                    borderRadius='0px'
                    width='160px'
                    height='40px' 
                    isLoading={props.mode === 'processing' ? true : false}
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        props.setMode('processing')
                    }}
                >
                    Begin animating
                </Button>

                <DrawerMenu 
                    onClose={() => {
                        props.setDrawerIsOpen(false)
                        onClose()
                    }} 
                    isOpen={isOpen}
                />
            </Stack>
        </Box>
    );
}

export default Menu;