import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../database';

// TODO: Fix the simultaneous message issue 

// Interface for PlaceBidRequestBody
interface PlaceBidRequestBody {
  gpuClusterId: string;
  bidPrice: number;
  selectedHours: number[];
}

// An API route for placing a bid on a GPU cluster.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { gpuClusterId, bidPrice, selectedHours } = req.body as PlaceBidRequestBody;

  const client = await pool.connect();

  try {
    // Start a transaction 
    await pool.query('BEGIN');

    // Check if the GPU cluster exists
    // Lock the row for update to prevent race conditions
    const gpuClusterQuery = 'SELECT * FROM gpu_clusters WHERE id = $1 FOR UPDATE';
    const gpuClusterValues = [gpuClusterId];
    const gpuClusterResult = await pool.query(gpuClusterQuery, gpuClusterValues);

    if (gpuClusterResult.rows.length === 0) {
      await pool.query('ROLLBACK');
      await client.release(); 
      return res.status(404).json({ message: 'GPU cluster not found' });
    }

    // Check if the bid price is higher than or equal to the current highest bid
    const highestBidQuery = `
      SELECT COALESCE(MAX(bid_price), 0) AS highest_bid 
      FROM bids 
      WHERE gpu_cluster_id = $1 AND selected_hours && $2
      FOR UPDATE 
    `;
    const highestBidValues = [gpuClusterId, selectedHours];
    const highestBidResult = await pool.query(highestBidQuery, highestBidValues);
    const highestBid = highestBidResult.rows[0].highest_bid;

    if (bidPrice <= highestBid) {
      await pool.query('ROLLBACK');
      await client.release(); 
      return res.status(400).json({ message: 'Bid price must be higher than the current highest bid' });
    }

    // Insert the bid data into the database
    const insertBidQuery = `
      INSERT INTO bids (gpu_cluster_id, bid_price, selected_hours)
      VALUES ($1, $2, $3)
    `;
    const insertBidValues = [gpuClusterId, bidPrice, selectedHours];
    await pool.query(insertBidQuery, insertBidValues);

    // Commit the transaction
    await pool.query('COMMIT');

    // Release the client back to the pool
    await client.release();

    // Return 200 status code and a success message
    return res.status(200).json({ message: 'Bid placed successfully' });
  } catch (error) {
    // Rollback the transaction
    await pool.query('ROLLBACK');
    console.error('Error placing bid:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}