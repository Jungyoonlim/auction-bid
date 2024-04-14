import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGpuClusterbyId } from './gpuClusters';
import { GpuCluster, AvailableHour } from '../src/app/types/GpuCluster';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { gpuClusterId } = req.query;
    if (!gpuClusterId || typeof gpuClusterId !== 'string') {
      return res.status(400).json({ message: 'Invalid GPU cluster ID' });
    }

    const gpuCluster = await fetchGpuClusterbyId(gpuClusterId);
    if (!gpuCluster) {
      return res.status(404).json({ message: 'GPU cluster not found' });
    }

    if (!gpuCluster.availableHour || !Array.isArray(gpuCluster.availableHour)) {
      console.error('Invalid availableHours property on GPU cluster:', gpuCluster);
      return res.status(500).json({ message: 'Invalid GPU cluster data' });
    }

    const liveBids: { [hour: number]: AvailableHour } = {};
    gpuCluster.availableHour.forEach((availableHour) => {
      liveBids[availableHour.hour] = availableHour;
    });

    return res.status(200).json({ liveBids });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}