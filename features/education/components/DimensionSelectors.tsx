'use client';

import { metadata } from "@/app/layout";

interface Props{
    metadata: any;
    onFilterChange: (filters:any) => void;
}

/**
 * Separates UI state from  data access logic 
 * Populates dropdowns dyynamically using the metadata fetched 
 * in the discovery phase
 */
export const DimensionSelectors = ({ metadata, onFilterChange}: Props) => {
    // Extract specific dimenstions provided by the DfE API
    const timePeriods = metadata?.timePeriods || [];
    const geographicLevels = metadata?.geographicLevels || [];

    return (
        <div className = "flex gap-4 p-4 bg-gray-50 borrder-b">
            {/* Year Selector: Updates the parent state, triggering a React Query refetch */}
            <select 
                onChange={(e) => onFilterChange({year: e.target.value})}
                className= "p-2 border rounded"
            >
                <option value ="">Select Year</option>
                {timePeriods.map((tp: any) => (
                    <option key={tp.code} value={tp.code}>{tp.label}</option>
                ))}
            </select>

            {/* Region Selector: Allows switching dimensions without unnecessary refetching*/}
            <select
                onChange={(e) => onFilterChange({ region: e.target.value })}
                className="p-2 border rounded"
            >
                <option value="">Select Region</option>
                {geographicLevels.map((gl:any) => (
                    <option key ={gl.code} value={gl.code}>{gl.label}</option>
                ))}
            </select>
        </div>
    );
}







