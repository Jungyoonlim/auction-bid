import { GpuCluster } from '../../src/app/types/GpuCluster'; 

// Example Array of GPU clusters
const gpuClusters: GpuCluster[] = [
    {
      "id": "1",
      "name": "Dolores Park",
      "gpuType": "H100",
      "gpuCount": 8,
      "nodes": 8,
      "currentBid": 2000,
      "startTime": new Date('June 16, 2024 01:00 AM'),
      "endTime": new Date('June 16, 2024 09:00 AM'),
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
      "name": "Alcatraz",
      "gpuType": "RTX 2080 Ti",
      "gpuCount": 8,
      "nodes": 4,
      "currentBid": 1500,
      "startTime": new Date('2024-06-29T03:00:00Z'),
      "endTime": new Date('2024-06-29T08:00:00Z'),
      "bidPrice": 1500,
      "status": "Unavailable",
      "availableHour": [
        { "hour": 1, "price": 1500 },
        { "hour": 2, "price": 3000 },
        { "hour": 3, "price": 4500 }
      ]
    },
    {
      "id": "3",
      "name": "Angel Island",
      "gpuType": "H100",
      "gpuCount": 16,
      "nodes": 8,
      "currentBid": 2500,
      "startTime": new Date('July 2, 2024 4:00 PM'),
      "endTime": new Date('June 2, 2024 10:00 PM'),
      "bidPrice": 2000,
      "status": "Available",
      "availableHour": [
        { "hour": 1, "price": 2000 },
        { "hour": 2, "price": 4000 },
        { "hour": 3, "price": 6000 }
      ]
    },
  ];

  // fetchGpuClusters function
  export async function fetchGpuClusters(): Promise<GpuCluster[]> {
    return gpuClusters;
  };


// fetchGpuClusterbyId function
  export async function fetchGpuClusterbyId(clusterId: string): Promise<GpuCluster | undefined>{
    return gpuClusters.find((cluster) => cluster.id === clusterId);
  }

  