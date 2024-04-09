import { NextApiRequest, NextApiResponse } from 'next';
import { createReservation } from '../reservations/index'; 

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST"){
        const { name, gpuType, gpuCount, duration, bidPrice, startTime, endTime } = req.body;
        const reservation = await createReservation(req.body);
        res.status(201).json(reservation);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}; 

