'use client';

import { useRouter } from 'next/navigation';
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
            <h1>Bid Form</h1>
            <BidFormWrapper gpuCluster={gpuCluster} />
        </div>
    );
};

export default BidFormPage;