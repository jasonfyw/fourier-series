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
    Box,
    HStack,
    Text,
    Icon,
    IconButton
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { FaGithub } from 'react-icons/fa'
import { ColorModeSwitcher } from './ColorModeSwitcher';

type DrawerMenuProps = {
    onClose: () => void,
    isOpen: boolean,
    n: number,
    setN: (n: number) => void,
    drawCircles: boolean,
    setDrawCircles: (b: boolean) => void,
    showUserInput: boolean,
    setShowUserInput: (b: boolean) => void
}

const DrawerMenu: FC<DrawerMenuProps> = props => {

    const handleChangeN = (value: number | string) => {
        props.setN(Number(value) ? (Number(value) < 0 ? Math.abs(Number(value)) : Number(value)) : props.n)
    }

    return (
        <Drawer placement='left' onClose={props.onClose} isOpen={props.isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth={'1px'} marginBottom={'1rem'}>
                    <HStack>
                        <span>Options</span> 
                        <ColorModeSwitcher />
                    </HStack>
                </DrawerHeader>

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
                                    min={1}
                                    clampValueOnBlur={false}
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


                        <HStack>
                            <FormLabel htmlFor='drawCircles' mb='0'>
                                Draw circles around vectors
                            </FormLabel>
                            <Switch 
                                id='drawCircles' 
                                isChecked={props.drawCircles}
                                onChange={() => {props.setDrawCircles(!props.drawCircles)}}
                            />
                        </HStack>


                        <HStack>
                            <FormLabel htmlFor='drawCircles' mb='0'>
                                Show user's drawing when animating
                            </FormLabel>
                            <Switch
                                id='drawCircles'
                                isChecked={props.showUserInput}
                                onChange={() => { props.setShowUserInput(!props.showUserInput) }}
                            />
                        </HStack>
                    </Stack>


                </DrawerBody>

                <DrawerFooter paddingBottom='10px'>
                    <HStack>
                        <Text fontSize='0.75rem'>
                            Made with &nbsp;
                            <Icon viewBox="0 0 32 29.6" color='#bf616a' >
                                <path fill='currentColor' d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" />
                            </Icon>
                            &nbsp; by Jason Wang &nbsp;© {new Date().getFullYear()}
                        </Text>
                        <a href="https://github.com/jasonfyw/fourier-series" target="_blank" rel='noreferrer'>
                            <IconButton
                                aria-label={'Link to Github'}
                                variant="link"
                                color="current"
                                icon={<Icon as={FaGithub} />}
                            />
                        </a>
                    </HStack>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default DrawerMenu;