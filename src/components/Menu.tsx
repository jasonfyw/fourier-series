import React, { FC, MouseEvent } from 'react';
import { Box, Stack, Button, IconButton, useDisclosure } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import DrawerMenu from './DrawerMenu';


type MenuProps = {
    mode: string,
    setMode: (mode: string) => void,
    setDrawerIsOpen: (isOpen: boolean) => void,
    n: number,
    setN: (n: number) => void,
    reset: () => void
    drawCircles: boolean,
    setDrawCircles: (b: boolean) => void
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
                    width='30px'
                    height='34px'
                    fontSize={'12px'}
                    _focus={{ outline: 0 }}
                    onClick={() => {
                        props.setDrawerIsOpen(true)
                        onOpen()
                    }}
                    icon={<SettingsIcon/>}
                />
                <Button 
                    colorScheme='teal' 
                    variant='solid'
                    borderRadius='0px'
                    width='125px'
                    height='34px' 
                    fontSize={'12px'}
                    _focus={{ outline: 0 }}
                    isLoading={props.mode === 'processing' ? true : false}
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        props.setMode('processing')
                    }}
                >
                    Begin animating
                </Button>
                <Button
                    colorScheme='red'
                    variant='solid'
                    borderRadius='0px'
                    width='65px'
                    height='34px'
                    fontSize={'12px'}
                    _focus={{ outline: 0 }}
                    onClick={props.reset}
                >
                    Reset
                </Button>

                <DrawerMenu 
                    onClose={() => {
                        props.setDrawerIsOpen(false)
                        onClose()
                    }} 
                    isOpen={isOpen}
                    n={props.n}
                    setN={props.setN}
                    drawCircles={props.drawCircles}
                    setDrawCircles={props.setDrawCircles}
                />
            </Stack>
        </Box>
    );
}

export default Menu;