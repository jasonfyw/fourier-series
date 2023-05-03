import {
    FC,
    useEffect,
    useState
} from 'react';
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
    IconButton,
    VStack,
    Kbd,
    Divider,
    Select,
    // Button,
    // useColorModeValue
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { FaGithub } from 'react-icons/fa';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { ComplexFunction } from '../../types';
import { presetFunctions } from '../../helpers/presetFunctions.helpers';
// const FilePicker = require('react-file-picker');

type DrawerMenuProps = {
    onClose: () => void,
    isOpen: boolean,
    n: number,
    setN: (n: number) => void,
    drawCircles: boolean,
    setDrawCircles: (b: boolean) => void,
    showUserInput: boolean,
    setShowUserInput: (b: boolean) => void,
    setImage: (image: string) => void,
    showOverlay: boolean,
    setShowOverlay: (b: boolean) => void,
    mathFunction: ComplexFunction | undefined,
    setMathFunction: (f: ComplexFunction | undefined) => void,
}

const DrawerMenu: FC<DrawerMenuProps> = props => {
    const [mathFunctionValue, setMathFunctionValue] = useState<string>('')

    // const [imageErr, setImageErr] = useState<string>('')
    // const [imageSuccess, setImageSuccess] = useState<string>('')

    const handleChangeN = (value: number | string) => {
        props.setN(Number(value) ? (Number(value) < 0 ? Math.abs(Number(value)) : Number(value)) : props.n)
    }

    const handleSelectMathFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMathFunctionValue(e.target.value)
        if (e.target.value === ''){
            props.setMathFunction(undefined)
        } else {
            // @ts-ignore
            props.setMathFunction(() => presetFunctions[e.target.value].function)
        }
    }

    useEffect(() => {
        if (props.mathFunction === undefined) {
            setMathFunctionValue('')
        }
    }, [props.mathFunction])

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
                                Number of epicycles
                                <Tooltip
                                    hasArrow
                                    placement='auto-start'
                                    label='The number of epicycles used to approximate your drawing (the more epicycles, the more accurate)'
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
                                onChange={() => { props.setDrawCircles(!props.drawCircles) }}
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


                        <HStack>
                            <FormLabel htmlFor='showOverlay' mb='0'>
                                Show overlay with variables
                            </FormLabel>
                            <Switch
                                id='showOverlay'
                                isChecked={props.showOverlay}
                                onChange={() => { props.setShowOverlay(!props.showOverlay) }}
                            />
                        </HStack>

                        <Divider />

                        <Box>
                            <FormLabel htmlFor='selectMathFunction' mb='0'>
                                Animate math function
                                <Tooltip
                                    hasArrow
                                    placement='auto-start'
                                    label='Animate the selected math function instead of a user-drawn shape'
                                >
                                    <InfoOutlineIcon w={3} h={3} marginLeft='10px' />
                                </Tooltip>
                            </FormLabel>
                            <Select
                                placeholder={'Select function'}
                                variant={'filled'}
                                mt={2}
                                value={mathFunctionValue}
                                onChange={handleSelectMathFunction}
                            >
                                {
                                    Object.keys(presetFunctions).map((k: string, i: number) => {
                                        return <option value={k} key={i}>{presetFunctions[k].displayName}</option>
                                    })
                                }
                            </Select>
                        </Box>


                        {/* <VStack alignItems={'left'}>
                            <Divider />
                            <Text fontWeight={600} pt={5}>Experimental: Animate custom image<Tooltip
                                hasArrow
                                placement='auto-start'
                                label="Upload an image, then the Fourier series will attempt to be applied to the edges detected in the image (may be buggy and/or take a while depending on the image size and your device's computing power)"
                            >
                                <InfoOutlineIcon w={3} h={3} marginLeft='10px' />
                            </Tooltip></Text>
                            <FilePicker.ImagePicker
                                extensions={['jpg', 'jpeg', 'png']}
                                dims={{ minWidth: 10, maxWidth: 2000, minHeight: 10, maxHeight: 2000 }}
                                onChange={(base64: string) => {
                                    props.setImage(base64)
                                    setImageSuccess('Image upload successful. Click "Begin animating" to start')
                                    setImageErr('')
                                }}
                                onError={(errMsg: string) => {
                                    setImageErr(errMsg)
                                    setImageSuccess('')
                                }}
                            >
                                <Button colorScheme={'blue'} size={'sm'} variant={'outline'}>
                                    Click to upload image
                                </Button>
                            </FilePicker.ImagePicker>
                            <Text color={useColorModeValue('red.500', 'red.200')} fontSize={'sm'}>{imageErr}</Text>
                            <Text color={useColorModeValue('green.500', 'green.200')} fontSize={'sm'}>{imageSuccess}</Text>
                        </VStack> */}


                        <VStack alignItems={'left'}>
                            <Divider />
                            <Text fontWeight={600} pt={5}>Controls</Text>
                            <span>
                                Pause animation: <Kbd>space</Kbd>
                            </span>
                            <span>
                                Zoom in/out: <Kbd>+</Kbd>/<Kbd>-</Kbd>
                            </span>
                        </VStack>

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