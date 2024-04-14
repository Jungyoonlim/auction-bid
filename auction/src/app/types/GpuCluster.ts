// Interface for GpuCluster type
export interface GpuCluster {
    id: string;
    name: string;
    gpuCount: number; 
    gpuType: string;
    nodes: number;
    startTime: Date;
    endTime: Date;
    bidPrice: number;
    status: string;
    currentBid: number;
    availableHour: AvailableHour[];
}

// Interface for Available Hour
export interface AvailableHour{
    hour: number;
    price: number;
}

