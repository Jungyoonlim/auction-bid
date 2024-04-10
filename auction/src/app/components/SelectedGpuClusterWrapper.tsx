'use client';

import React, { Suspense } from 'react';
import { GpuCluster } from '../types/GpuCluster';
import SelectedGpuCluster from './SelectedGpuCluster';

interface SelectedGpuClusterWrapperProps {
  selectedGpuCluster: GpuCluster | null;
}

const SelectedGpuClusterWrapper: React.FC<SelectedGpuClusterWrapperProps> = ({
  selectedGpuCluster,
}) => {
  return (
    <Suspense fallback={<p>Loading bid form...</p>}>
      <SelectedGpuCluster selectedGpuCluster={selectedGpuCluster} />
    </Suspense>
  );
};

export default SelectedGpuClusterWrapper;