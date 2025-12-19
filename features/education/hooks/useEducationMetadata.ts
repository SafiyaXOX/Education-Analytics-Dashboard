import { useQuery } from "@tanstack/react-query";
import { fetchMetadata } from "../api/client";

/**
 * Hook to discover dataset dimensions (years, religions, etc.)
 * as required by the 'Metadata First' constraint
 */
export function useEducationMetadata(datasetId: string){
    return useQuery({
        // Unique key for the metadata of a specific dataset
        queryKey: ['education-metadata', datasetId],

        // Data fetching function deined in API client
        queryFn: () => fetchMetadata (datasetId),

        /**
         * Since metadata (dimensions) rarely change, we set staleTime to Infinity.
         * This ensures that we only fetch discovery data once per session, 
         * avoiding redundant network requests.
         */
        staleTime: Infinity, // Metadata is the "source of truth" for the UI
    });
}