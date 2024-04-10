// getData.ts
import { GpuCluster } from './types/GpuCluster';
import fetchGpuClusters from './api/GpuCluster';
import GpuDataProvider from './components/GpuDataProvider';

// This is a Server Component
export default async function getData() {
  try {
    const gpuClusters = await fetchGpuClusters();
    return <GpuDataProvider gpuClusters={gpuClusters} />;
  } catch (error) {
    console.error('Error fetching GPU clusters:', error);
    return <GpuDataProvider gpuClusters={[]} />;
  }
}