import {useQuery, keepPreviousData} from '@tanstack/react-query';
import { fetchTableData } from '../api/client';


/**
 * Hook to manage school-level performance data with cached pagination.
 * @param filters - The user-selected dimension (year, region, etc.)
 * @param page - Current server-side page index
 */
export function useEducationData (filters: any, page: number, pageSize: number){
    return useQuery({

        
        /**
         * The query key refelects all dimensions and pagination state
         * Including filters and page ensures that: 
         * 1. If 'Year' changes, the cache invalidates and fetches new data
         * 2. If the user goes from Page 2 -> Page 1, Page 1 is served instantly from cache
         */
        queryKey: ['education-data',filters, page, pageSize],
        
        // The actual fetcher function
        queryFn: () => fetchTableData ('your-dataset-id', {...filters, page, pageSize}),
        /**
         * This prevents the UI from flickering while fetching the next page
         * So while fetching Page 2, the UI continues to show Page 1's data (often done using a loading overlay)
         * rather than a blank "loading" scree, creating a smoother dashboard experience
         */
        placeholderData: keepPreviousData,
    })
}