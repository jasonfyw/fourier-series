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
    SliderThumb
} from '@chakra-ui/react';

type DrawerMenuProps = {
    onClose: () => void,
    isOpen: boolean,
    n: number,
    setN: (n: number) => void
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

                    <NumberInput
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
                        <SliderThumb fontSize='sm' boxSize='32px' children={props.n} />
                    </Slider>

                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}

export default DrawerMenu;