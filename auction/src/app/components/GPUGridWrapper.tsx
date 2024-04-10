'use client';

import React from 'react';
import { GpuCluster } from '../types/GpuCluster';
import GpuGrid from './GPUGrid';

interface Props {
  gpuClusters: GpuCluster[];
  onClusterClick: (cluster: GpuCluster) => void;
  children: React.ReactNode; // Add this line
}

const GPUGridWrapper: React.FC<Props> = ({ gpuClusters, onClusterClick, children }) => {
  return (
    <>
      <GpuGrid gpuClusters={gpuClusters} onClusterClick={onClusterClick} />
      {children}
    </>
  );
};

export default GPUGridWrapper;