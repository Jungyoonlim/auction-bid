import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../database';

// Interface for PlaceBidRequestBody
interface PlaceBidRequestBody {
  gpuClusterId: number;
  bidPrice: number;
  selectedHours: number[];
}

// An API route for placing a bid on a GPU cluster.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { gpuClusterId, bidPrice, selectedHours } = req.body as PlaceBidRequestBody;

    try {
      // Check if the selected hours are available for bidding
      const availabilityQuery = `
        SELECT COUNT(*) AS count
        FROM bids
        WHERE gpu_cluster_id = $1
          AND selected_hours && $2
      `;
      const availabilityValues = [gpuClusterId, selectedHours];
      const availabilityResult = await pool.query(availabilityQuery, availabilityValues);

      if (availabilityResult.rows[0].count > 0) {
        return res.status(400).json({ message: 'Selected hours are not available for bidding' });
      }

      // Check if the bid price is higher than the current highest bid
      const highestBidQuery = `
        SELECT COALESCE(MAX(bid_price), 0) AS highest_bid
        FROM bids
        WHERE gpu_cluster_id = $1
          AND selected_hours && $2
      `;
      const highestBidValues = [gpuClusterId, selectedHours];
      const highestBidResult = await pool.query(highestBidQuery, highestBidValues);
      const highestBid = highestBidResult.rows[0].highest_bid;

      if (bidPrice <= highestBid) {
        return res.status(400).json({ message: 'Bid price must be higher than the current highest bid' });
      }

      // Check if the booking is within the allowed time range - 7 days in advance in this case
      const maxBookingRangeQuery = `
        SELECT MAX(end_time) AS max_end_time
        FROM blocks
        WHERE gpu_cluster_id = $1
          AND end_time <= NOW() + INTERVAL '7 days'
      `;
      const maxBookingRangeValues = [gpuClusterId];
      const maxBookingRangeResult = await pool.query(maxBookingRangeQuery, maxBookingRangeValues);
      const maxEndTime = maxBookingRangeResult.rows[0].max_end_time;

      const selectedEndTime = new Date();
      selectedEndTime.setHours(Math.max(...selectedHours) + 1); // Set the end time to the last selected hour + 1

      if (selectedEndTime > maxEndTime) {
        return res.status(400).json({ message: 'Booking is outside the allowed time range' });
      }

      // Insert the bid data into the database
      const insertBidQuery = `
        INSERT INTO bids (gpu_cluster_id, bid_price, selected_hours)
        VALUES ($1, $2, $3)
      `;
      const insertBidValues = [gpuClusterId, bidPrice, selectedHours];
      await pool.query(insertBidQuery, insertBidValues);

      // Return 200 status code and a success message
      return res.status(200).json({ message: 'Bid placed successfully' });
    } catch (error) {
      console.error('Error placing bid:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // If not POST, return 405
  return res.status(405).json({ message: 'Method not allowed' });
}