import { extendTheme } from '@chakra-ui/react'

const config = extendTheme({
    initialColorMode: 'system',
    useSystemColorMode: false,
})

const customTheme = extendTheme({
    semanticTokens: {
        colors: {
            bg: {
                default: '#eeeeee',
                _dark: '#111111'
            }
        }
    }
})

const theme = extendTheme(config, customTheme)

export default theme