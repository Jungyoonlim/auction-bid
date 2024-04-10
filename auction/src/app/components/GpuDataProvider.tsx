import React from 'react';
import { GpuCluster } from '../types/GpuCluster';

interface GpuDataProviderProps {
  gpuClusters: GpuCluster[];
}

const GpuDataProvider: React.FC<GpuDataProviderProps> = ({ gpuClusters }) => {
  return <Home gpuClusters={gpuClusters} />;
};

export default GpuDataProvider;