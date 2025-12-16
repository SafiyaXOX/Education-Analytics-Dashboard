// Base URL for the UK Department for Education EES API
const BASE_URL = 'https://explore-education-statistics.service.gov.uk/api';


/**
 * Step 1: Fetch Metadata
 * Used to discover dimensions (years, regions) before we query the actual data
 */
export async function fetchMetadata (datasetId: string){
    const res = await fetch (`${BASE_URL}/data/v1/datasets/${datasetId}/metadata`);
    if (!res.ok) throw new Error('Failed to fetch metadata');
    return res.json();
}


/**
 * Step 2: Fetch Paged Data
 * Sends pagination and filter params to thee server
 */
export async function fetchTableData(datasetId: string, params: any){
    // This handles the server-driven pagination and filtering
    const queryParams = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/data/v1/datasets/${datasetId}/query?${queryParams}`);
    if (!res.ok) throw new Error ('Failed to fetch data');

    // The API returns a large JSON object containing the data rows and total count
    return res.json();
}






