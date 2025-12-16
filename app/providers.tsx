'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactNode, useState} from 'react';

export default function Providers ({children}: {children: ReactNode}){
    // useState is used to ensure the QueryClient is only created once per session 
    const [queryClient]= useState (
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Keeps data "fresh" for 5 minutes to avoid redundant network requests 
                        staleTime: 5 * 60 * 1000,
                        // Prevent refetching on window focus during development
                    
                        // gcTime: How long unused data stays in memory (default 5 mins) 

                        // Disables automatic refetchhing on window focus to keep data stable
                        // while the user is analyzing the dashboard
                        refetchOnWindowFocus: false,
                    }
                }
            })
    );

    return (
        <QueryClientProvider client = {queryClient}>
            {children}
        </QueryClientProvider>
    );
}







