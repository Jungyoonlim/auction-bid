// pages/api/placeBid.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGpuClusters } from './gpuClusters';

// An API route for placing a bid on a GPU cluster. 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Extracting gpuClusterId and bidPrice from the request body
    const { gpuClusterId, bidPrice } = req.body;

    // Fetching GPU clusters from the API
    const gpuClusters = await fetchGpuClusters();

    // Find the GPU cluster by ID
    const gpuClusterIndex = gpuClusters.findIndex((cluster) => cluster.id === gpuClusterId);

    // If the GPU cluster is not found, return a 404 error.
    if (gpuClusterIndex === -1) {
      return res.status(404).json({ message: 'GPU cluster not found' });
    }

    // Update the current bid of the GPU cluster
    gpuClusters[gpuClusterIndex].currentBid = bidPrice;

    // Return 200 status code and a success message
    return res.status(200).json({ message: 'Bid placed successfully' });
  }
  // Return 405 error if the request method is not POST
  return res.status(405).json({ message: 'Method not allowed' });
}

