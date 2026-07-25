"use client";

import { useEffect, useState } from "react";
import { ChoroplethChart, ChoroplethFeatureComponent, ChoroplethGraticule, ChoroplethTooltip } from "@/components/charts/choropleth/";
import * as topojson from "topojson-client";

export default function WorldMap() {
    const [geojsonData, setGeojsonData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch map data");
                }
                return response.json();
            })
            .then((topology: any) => {
                const convertedData = topojson.feature(topology, topology.objects.countries);
                setGeojsonData(convertedData);
            })
            .catch((err) => {
                console.error("Error loading map:", err);
                setError(err.message);
            });
    }, []);

    if (error) {
        return <div className="text-custom-text p-4">Error loading map: {error}</div>;
    }

    if (!geojsonData) {
        return <div className="p-4 text-muted-foreground animate-pulse">Loading World Map...</div>;
    }

    return (
        <ChoroplethChart data={geojsonData} aspectRatio="16 / 9">
            <ChoroplethGraticule />
            <ChoroplethFeatureComponent />
            <ChoroplethTooltip />
        </ChoroplethChart>
    );
}