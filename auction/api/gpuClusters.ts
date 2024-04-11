import { GpuCluster } from '../src/app/types/GpuCluster'; 

const gpuClusters: GpuCluster[] = [
    {
      "id": "1",
      "name": "Cluster A",
      "gpuType": "RTX 3090",
      "gpuCount": 8,
      "currentBid": 2000,
      "startTime": new Date(),
      "endTime": new Date(),
      "bidPrice": 2000,
      "status": "Available"
    },
    {
      "id": "2",
      "name": "Cluster B",
      "gpuType": "RTX 2080 Ti",
      "gpuCount": 4,
      "currentBid": 1500,
      "startTime": new Date(),
      "endTime": new Date(),
      "bidPrice": 1500,
      "status": "Unavailable"
    }
  ];

  // fetchGpuClusters function
  export async function fetchGpuClusters(): Promise<GpuCluster[]> {
    return gpuClusters;
  };


// fetchGpuClusterbyId function
  export async function fetchGpuClusterbyId(clusterId: string): Promise<GpuCluster | undefined>{
    return gpuClusters.find((cluster) => cluster.id === clusterId);
  }