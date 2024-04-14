'use client';

import React from 'react';
import BidFormWrapper from '../../components/BidFormWrapper';
import { fetchGpuClusterbyId } from '../../../../pages/api/gpuClusters';

// Define the props for the BidFormPage component
interface BidFormPageProps {
    params: { clusterId: string }; // Contains the clusterId parameter from the route
}

// Main Component: fetches the GPU cluster details based on the clusterId and displays the bid form
const BidFormPage: React.FC<BidFormPageProps> = async ({ params }) => {
    const { clusterId } = params; // Destructure clusterId from params for gpuCluster 
    const gpuCluster = await fetchGpuClusterbyId(clusterId); // Fetch the GPU cluster details by ID

    // Check if the gpuCluster data is not found and return a message if true
    if(!gpuCluster){
        return <p>Cluster not found</p>; // Display message when cluster is not found
    }

    // jsx Form 
    return(
        <div>
            <div className="p-5 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-4">Bid Form</h1> 
                <BidFormWrapper gpuCluster={gpuCluster} /> 
            </div>
        </div>
    );
};

export default BidFormPage; 