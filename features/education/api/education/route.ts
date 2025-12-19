import { createServerSearchParamsForMetadata } from "next/dist/server/request/search-params";
import { NextResponse } from "next/server";

/**
 * This handler runs on the server to bypass browser CORS policies
 * It forwards requests from your frontend to the DfE EES API
 */
export async function GET(request: Request){
    const {searchParams} = new URL(request.url);
    const endpoint = searchParams.get('endpoint');
    const datasetId = searchParams.get ('datasetId');

    if (!endpoint || !datasetId){
        return NextResponse.json ({error: 'Missing parameters'}, {status: 400});
    }

    // Construct the external DfE API URL
    const baseUrl = 'https://explore-education-statistics.service.gov.uk/api/data/v1/datasets';
    const externalUrl = `${baseUrl}/${datasetId}/${endpoint}`;

    try{
        const response = await fetch(externalUrl);
    
        if (!response.ok) {
            // Forward the specific error status from the DfE API (e.g., 404)
            return NextResponse.json(
                { error: `DfE API error: ${response.statusText}` }, 
                { status: response.status }
            );
            }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error){
        return NextResponse.json({error: 'Failed to fetch from DfE'}, {status: 500});
    }
}














