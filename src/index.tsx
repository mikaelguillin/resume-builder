import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import './i18n/i18n';
import store from './store/store';
import {
    ChakraBaseProvider,
    extendBaseTheme,
    theme as chakraTheme,
} from '@chakra-ui/react';

const {
    Button,
    Accordion,
    Modal,
    Input,
    Textarea,
    Select,
    FormLabel,
    Heading,
    FormError,
} = chakraTheme.components;

const theme = extendBaseTheme({
    styles: {
        global: {
            'html, body': {
                bg: 'gray.100',
            },
        },
    },
    components: {
        Button,
        Accordion,
        Modal,
        Input,
        Textarea,
        Select,
        FormLabel,
        Heading,
        FormError,
    },
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <ChakraBaseProvider theme={theme}>
            <Provider store={store}>
                <App />
            </Provider>
        </ChakraBaseProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
