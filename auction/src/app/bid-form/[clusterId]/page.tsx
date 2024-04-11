'use client';

import React from 'react';
import BidFormWrapper from '../../components/BidFormWrapper';
import { fetchGpuClusterbyId } from '../../../../api/gpuClusters';

interface BidFormPageProps {
    params: { clusterId: string };
}

const BidFormPage: React.FC<BidFormPageProps> = async ({ params }) => {
    const { clusterId } = params; 
    const gpuCluster = await fetchGpuClusterbyId(clusterId);

    if(!gpuCluster){
        return <p>Cluster not found</p>;
    }

    return(
        <div>
            <div className="p-5 bg-blue-100 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-4">Bid Form</h1>
                <BidFormWrapper gpuCluster={gpuCluster} />
            </div>
        </div>
    );
};

export default BidFormPage;