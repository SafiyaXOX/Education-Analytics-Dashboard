'use client';

import { useState } from "react";
import { useEducationMetadata } from "@/features/education/hooks/useEducationMetadata";
import { DimensionSelectors } from "@/features/education/components/DimensionSelectors";
import { EducationTable } from "@/features/education/components/EducationTable";
import { EducationChart } from '@/features/education/components/EducationChart';

/**
 * Main dashboard container that ensures clear separation between 
 * data access, UI state, and visualization [cite: 54-59].
 */
export default  function DashboardPage(){
  const datasetId = "your-chosen-dataset-uuid"; // Get this from DfE API docs
  
  /**
   * Tracks the currently selected data slice (Year, Region) 
   * which will be used to construct the data query
   */
  const [filters, setFilters] = useState ({});

  // 1. Fetch metadata first
  const {data: metadata, isLoading, isError} = useEducationMetadata(datasetId);

  // Loading state for initial discovery phase
  if (isLoading) return <div>Loading Discovery Metadata...</div>;
  if (isError) return <div>Error loading data metadata.</div>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Education Performance Analysis</h1>

      {/* 2. Use metadata to drive filters
        Dimension selection drives the 'Server-Driven' data flow  
      */}
      <DimensionSelectors
        metadata={metadata}
        onFilterChange={(newFilters)=> setFilters(prev =>({...prev, ...newFilters}))}
      />

      {/* 3. Pass filters to the table which uses useEducationData
        The Table handles server-side pagination
        It will only fetch the specific slice defined by 'filters'. 
      */}
      {/* Visualization Logic: Clearly separated from the Table*/}
      <div className="grid grid-cols-1 gap-8 mt-8">
        <EducationChart filters={filters} />
        
        <section className="border rounded-lg overflow-hidden bg-white shadow-sm">
          <EducationTable filters={filters} />
        </section>
      </div>
    </main>
  );
}


