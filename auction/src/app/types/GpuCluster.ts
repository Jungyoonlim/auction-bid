// Interface for GpuCluster type
export interface GpuCluster {
    id: string;
    name: string;
    gpuType: string;
    gpuCount: number;
    startTime: Date;
    endTime: Date;
    bidPrice: number;
    status: string;
    currentBid: number;
}

