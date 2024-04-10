import { GpuCluster } from '../types/GpuCluster';

// Takes in GPUCluster[] as a parameter, calls fetch() to make a GET request to the API endpoint,
// And returns the response as a Promise. 
const fetchGpuClusters = async (): Promise<GpuCluster[]> => {
  const response = await fetch('http://localhost:3000/api/gpuClusters');
  const data = await response.json();
  return data;
};

export default fetchGpuClusters;