'use client';

import React from 'react';
import { GpuCluster } from '../types/GpuCluster';
import GpuGrid from './GPUGrid';

// Defines the properties expected by the GPUGridWrapper component.
interface Props {
  gpuClusters: GpuCluster[]; 
  onClusterClick: (cluster: GpuCluster) => void;
  children?: React.ReactNode; 
}

// A wrapper around the GpuGrid component, passing in gpuClusters and onClusterClick props,
// Rendering any children components passed to it.
const GPUGridWrapper: React.FC<Props> = ({ gpuClusters, onClusterClick, children }) => {
  return (
    <>
      <GpuGrid gpuClusters={gpuClusters} onClusterClick={onClusterClick} />
      {children}
    </>
  );
};

export default GPUGridWrapper;