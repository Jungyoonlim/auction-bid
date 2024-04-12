import { GpuCluster } from '../src/app/types/GpuCluster'; 

// Example Array of GPU clusters
const gpuClusters: GpuCluster[] = [
    {
      "id": "1",
      "name": "Dolores Park",
      "gpuType": "H100",
      "gpuCount": 8,
      "nodes": 8,
      "currentBid": 2000,
      "startTime": new Date('June 16, 2024 12:59 AM'),
      "endTime": new Date('June 16, 2024 8:59 AM'),
      "bidPrice": 2000,
      "status": "Available",
      "availableHour": [
        { "hour": 1, "price": 2000 },
        { "hour": 2, "price": 4000 },
        { "hour": 3, "price": 6000 }
      ]
    },
    {
      "id": "2",
      "name": "Chrissy Field",
      "gpuType": "RTX 2080 Ti",
      "gpuCount": 8,
      "nodes": 4,
      "currentBid": 1500,
      "startTime": new Date('2024-06-29T03:00:00Z'),
      "endTime": new Date('2024-06-296T08:00:00Z'),
      "bidPrice": 1500,
      "status": "Unavailable",
      "availableHour": [
        { "hour": 1, "price": 1500 },
        { "hour": 2, "price": 3000 },
        { "hour": 3, "price": 4500 }
      ]
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