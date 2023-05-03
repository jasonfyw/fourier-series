import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button
} from '@chakra-ui/react';
import { useLocalStorage } from 'usehooks-ts';
import { SettingsIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';

interface TutorialModalProps {
    setDrawerIsOpen: (b: boolean) => void
}

const TutorialModal = (props: TutorialModalProps) => {
    const [tutorialShown, setTutorialShown] = useLocalStorage<boolean>('tutorialShown', false)

    const closeModal = () => {
        setTutorialShown(true)
        props.setDrawerIsOpen(false)
    }
    
    useEffect(() => {
        if (!tutorialShown) {
            props.setDrawerIsOpen(true)
        }
    })

    return (
        <Modal
            isOpen={!tutorialShown}
            onClose={() => closeModal()}
            size={'lg'}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Fourier Series Animation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Use your mouse (or finger) to draw a shape on the screen and press "Begin animating" to see the Fourier Series approximate your drawing!
                    <br /><br />
                    Open the preferences panel by clicking on <span><SettingsIcon fontSize={'0.7rem'} /></span> to adjust animation settings or to animate a mathematical function.
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={() => closeModal()}>
                        Get Started!
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default TutorialModal;