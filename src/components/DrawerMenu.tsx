import React, { FC } from 'react';
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, DrawerCloseButton } from '@chakra-ui/react';

type DrawerMenuProps = {
    onClose: () => void,
    isOpen: boolean
}

const DrawerMenu: FC<DrawerMenuProps> = props => {
    return (
        <Drawer placement='left' onClose={props.onClose} isOpen={props.isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth={'1px'}>Options</DrawerHeader>
                <DrawerBody>

                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}

export default DrawerMenu;