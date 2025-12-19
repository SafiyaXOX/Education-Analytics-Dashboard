'use client';

import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";

interface PlotFigureProps {
    options: Plot.PlotOptions;
}

/**
 * A wrapper component for Observable Plot
 * This handles the direct DOM manipulation required by the library. 
 */
export default function PlotFigure({options}: PlotFigureProps){
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(()=> {
        
        const currentContainer = containerRef.current;
        
        if (!options || currentContainer) return;

        // Generate the chart using the Observable Plot API
        const plot = Plot.plot(options);

        // Clear the container and append the new plot
        currentContainer.innerHTML = "";
        currentContainer.append(plot);

        // Cleanup function to prevent memory leaks and duplocate chats
        return () => plot.remove();
    }, [options]);

    return <div ref={containerRef} className="w-full overflow-x-auto" />
}











