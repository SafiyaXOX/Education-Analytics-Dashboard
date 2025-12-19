'use client';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useEducationData } from '../hooks/useEducationData';
import { useState } from 'react';

export const EducationTable = ({filters}: {filters: any}) => {
    // Local state to tract pagination - this drives the React Query Key
    const [currentPage, setCurrentPage] = useState (1);
    const pageSize = 20;

    // Fetch data based on the current UI state (filters + page)
    const {data, isLoading, isError} = useEducationData (filters, currentPage, pageSize);

    // Column definition based on metadata discovery 
    const columnDefs = [
        { field: 'school_name', headerName: 'School'},
        { field: 'urn', headerName: 'URN'},
        { field: 'attainment_score', headerName: 'Score'},
    ];

    return (
        <div className="ag-theme-alpine" style= {{height: 500, width: '100%'}}>
            <AgGridReact
                rowData = {data?.results || []} // Data from React Query
                columnDefs = {columnDefs}
                pagination = {true}
                paginationPageSize = {pageSize}
                // Tell AG Grid the server is handling pagination
                onPaginationChanged= {(event) =>{
                    const newPage = event.api.paginationGetCurrentPage () + 1;
                    if (newPage !== currentPage){
                        setCurrentPage (newPage); // Updates React Query Key, triggering fetch or cache hit
                    }
                }}
            />
        </div>
    );
}





