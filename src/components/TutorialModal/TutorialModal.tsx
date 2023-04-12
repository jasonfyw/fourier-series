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

const TutorialModal = () => {
    const [tutorialShown, setTutorialShown] = useLocalStorage<boolean>('tutorialShown', false)

    return (
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
                    <br /><br />
                    Open the preferences panel by clicking on <span><SettingsIcon fontSize={'0.7rem'} /></span> to adjust animation settings.
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={() => setTutorialShown(true)}>
                        Get Started!
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default TutorialModal;