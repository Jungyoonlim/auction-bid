import { GpuCluster } from '../types/GpuCluster';

const fetchGpuClusters = async (): Promise<GpuCluster[]> => {
  const response = await fetch('http://localhost:3000/api/gpuClusters');
  const data = await response.json();
  return data;
};

export default fetchGpuClusters;