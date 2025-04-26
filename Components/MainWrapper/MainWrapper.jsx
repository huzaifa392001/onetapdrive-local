"use client"
import { RowProvider } from '@/contexts/RowContext';
import { persistor, store } from '@/Redux/Store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

function MainWrapper({ children }) {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <RowProvider>
                        {children}
                    </RowProvider>
                </PersistGate>
            </Provider>
            <ToastContainer />
        </QueryClientProvider>
    );
}

export default MainWrapper;
