import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../database';

// is this right 
interface PlaceBidRequestBody {
  gpuClusterId: number;
  bidPrice: number;
  selectedHours: number;
}
// An API route for placing a bid on a GPU cluster.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { gpuClusterId, bidPrice, selectedHours } = req.body as PlaceBidRequestBody;

    try {
      // Insert the bid data into the database
      const query = 'INSERT INTO bids (gpu_cluster_id, bid_price, selected_hours) VALUES ($1, $2, $3)';
      const values = [gpuClusterId, bidPrice, selectedHours];
      await pool.query(query, values);

      // Return 200 status code and a success message
      return res.status(200).json({ message: 'Bid placed successfully' });
    } catch (error) {
      console.error('Error placing bid:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Return 405 error if the request method is not POST
  return res.status(405).json({ message: 'Method not allowed' });
}