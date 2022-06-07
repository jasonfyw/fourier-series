import React, { FC } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    DrawerCloseButton,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    InputGroup,
    FormLabel,
    Tooltip,
    DrawerFooter,
    Switch,
    Stack,
    Box
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from './ColorModeSwitcher';

type DrawerMenuProps = {
    onClose: () => void,
    isOpen: boolean,
    n: number,
    setN: (n: number) => void,
    drawCircles: boolean,
    setDrawCircles: (b: boolean) => void
}

const DrawerMenu: FC<DrawerMenuProps> = props => {

    const handleChangeN = (value: number | string) => {
        props.setN(Number(value) ? Number(value) : props.n)
    }

    return (
        <Drawer placement='left' onClose={props.onClose} isOpen={props.isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth={'1px'}>Options</DrawerHeader>

                <DrawerBody>
                    <Stack spacing='24px'>

                        <Box>
                            <FormLabel htmlFor='n'>
                                Number of vectors 
                                <Tooltip 
                                    hasArrow 
                                    placement='auto-start' 
                                    label='The number of vectors used to approximate your drawing (the more vectors, the more accurate)'
                                >
                                    <InfoOutlineIcon w={3} h={3} marginLeft='10px' />
                                </Tooltip>
                            </FormLabel>
                            <InputGroup>
                                <NumberInput
                                    id='n'
                                    maxW='100px'
                                    mr='2rem'
                                    value={props.n}
                                    onChange={handleChangeN}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <Slider
                                    flex='1'
                                    focusThumbOnChange={false}
                                    value={props.n}
                                    onChange={handleChangeN}
                                >
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb fontSize='sm' boxSize='32px' />
                                </Slider>
                            </InputGroup>
                        </Box>


                        <Box display='flex'>
                            <FormLabel htmlFor='drawCircles' mb='0'>
                                Draw circles around vectors
                            </FormLabel>
                            <Switch 
                                id='drawCircles' 
                                isChecked={props.drawCircles}
                                onChange={() => {props.setDrawCircles(!props.drawCircles)}}
                            />
                        </Box>
                    </Stack>


                </DrawerBody>

                <DrawerFooter>
                    <ColorModeSwitcher />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default DrawerMenu;