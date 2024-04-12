export const insertBidQuery = `
  INSERT INTO bids (cluster_id, hour_index, bid_price, user_id)
  VALUES ($1, $2, $3, $4)
`;

export const getHighestBidQuery = `
  SELECT MAX(bid_price) AS highest_bid
  FROM bids
  WHERE cluster_id = $1 AND hour_index = $2
`;