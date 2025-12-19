/**
 * Instead of hitting the DfE API directly, we hit our local Next.js route.
 */

export async function fetchMetadata(datasetId: string) {
    const res = await fetch(`/api/education?datasetId=${datasetId}&endpoint=metadata`);
    if (!res.ok) throw new Error('Failed to fetch metadata via proxy');
    return res.json();
  }
  
  export async function fetchTableData(datasetId: string, params: Record<string, any>) {
    // Construct the query string for proxy
    const queryParams = new URLSearchParams({
      datasetId,
      endpoint: 'query',
      ...params // Pass through pagination/filters
    });
  
    const res = await fetch(`/api/education?${queryParams.toString()}`);
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to fetch data via proxy');
    }
    
    return res.json();
  }