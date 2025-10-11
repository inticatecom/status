"use client";
// Resources
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// Definitions
import type {Children} from "@/lib/definitions"

// Variables
const queryClient = new QueryClient();

/**
 * The applications providers.
 */
export default function Providers(props: Children<true>) {
    return <QueryClientProvider client={queryClient}>
        {props.children}
    </QueryClientProvider>
}