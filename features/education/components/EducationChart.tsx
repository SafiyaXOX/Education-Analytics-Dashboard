'use client';

import * as Plot from "@observablehq/plot";
import PlotFigure from "./PlotFigure";
import { useEducationData } from "../hooks/useEducationData";

/**
 * Visualizes the trends or distribution of schoool performance
 * Derived from the same data slice as the table to ensure consistency.
 */
export const EducationChart = ({filters}:{filters: any}) => {
    /**
     * We use the same hook as the table. 
     * If the table has already fetchs the data slice, React Query
     * will serve it from the cache instantly, satisfying requirement.
     */
    const {data, isLoading} = useEducationData(filters,1,100); // Fetching a lrge slice for the chart

    if (isLoading) return <div className="h-64 flex items-center jsutify-center">Loading Chart...</div>;
    if (!data?.results || data.results.length === 0) return null;

    return (
        <div className="p-4 bg-white rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Attainment Distribution</h3>

            <PlotFigure
                options= {{
                    // Use a histogram to show the distribution of performance scores
                    marks: [
                        Plot.rectY(
                            data.results,
                            Plot.binX({ y: "count"}, {x: "attainment_score", fill: "steelblue", tip: true})
                            ),
                            Plot.ruleY([0])
                    ],
                    x: {label: "Performance Score"},
                    y: {label: "Number of Schools", grid: true},
                    width: 800,
                    height: 300,
                    marginLeft: 50
                }}
            />
        </div>
    )
} 








