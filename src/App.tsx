import React, { useState } from 'react';
import Canvas from './components/Canvas';
import './App.css';
import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useColorModeValue
} from '@chakra-ui/react';
import Menu from './components/Menu';
import { useLocalStorage } from 'usehooks-ts';
import { SettingsIcon } from '@chakra-ui/icons';

function App() {
    const [n, setN] = useState<number>(25)
    const [mode, setMode] = useState<string>('input')
    const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false)
    const [drawCircles, setDrawCircles] = useState<boolean>(true)
    const [showUserInput, setShowUserInput] = useState<boolean>(true)
    const [image, setImage] = useState<string>('')

    const [tutorialShown, setTutorialShown] = useLocalStorage<boolean>('tutorialShown', false)

    const colorMode = useColorModeValue("dark", "light")

    const reset = () => {
        setImage('')
        setMode('reset')
    }

    return (
        <Box className="App" background='bg' h={'100vh'} >
            <Canvas
                n={n} 
                mode={mode}
                setMode={setMode}
                lineColor={colorMode === 'light' ? '#eeeeee': '#111111'}
                drawCircles={drawCircles}
                drawerIsOpen={drawerIsOpen}
                showUserInput={showUserInput}
                image={image}
            />
            <Menu 
                mode={mode}
                setMode={setMode}
                setDrawerIsOpen={setDrawerIsOpen}
                n={n}
                setN={setN}
                reset={reset}
                drawCircles={drawCircles}
                setDrawCircles={setDrawCircles}
                showUserInput={showUserInput}
                setShowUserInput={setShowUserInput}
                setImage={setImage}
            />

            <Modal
                isOpen={!tutorialShown}
                onClose={() => setTutorialShown(true)}
                size={'lg'}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Fourier Series Animation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Use your mouse (or finger) to draw a shape on the screen and press "Begin animating" to see the Fourier Series approximate your drawing!
                        <br/><br/>
                        Open the preferences panel by clicking on <span><SettingsIcon fontSize={'0.7rem'}/></span> to adjust animation settings.
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={() => setTutorialShown(true)}>
                            Get Started!
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default App;
