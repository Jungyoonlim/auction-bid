'use client';

import './pageContent.css'; 
import { GpuCluster } from './types/GpuCluster';
import { fetchGpuClusters } from '../../pages/api/gpuClusters';
import React, { useEffect, useState } from 'react';
import GPUGridWrapper from './components/GPUGridWrapper';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Main Page of the application.
// Displays all the available compute that will lead to bid forms. 
const PageContent = () => {
  const [gpuClusters, setGpuClusters] = useState<GpuCluster[]>([]);
  const router = useRouter();

  // handle the click on a cluster. 
  const handleClusterClick = (cluster: GpuCluster) => {
    router.push(`/bid-form/${cluster.id}`);
  };

  // Fetch the GPU clusters from the API.
  useEffect(() => {
    const fetchData = async () => {
      const fetchedGpuClusters = await fetchGpuClusters();
      setGpuClusters(fetchedGpuClusters);
    };
    fetchData();
  }, []);

  // jsx 
  return (
    <div className="py-12 px-6 max-w-screen-xl mx-auto bg-white rounded-xl shadow-xl">
      <h3 className="text-6xl font-bold text-center text-black mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>The San Francisco Compute Exchange</h3>
      <nav className="flex justify-center items-center space-x-4 mb-6">
        <Link href="/about">About</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/start-bidding">Start Bidding</Link>
      </nav>
      <div className="flex flex-col items-center bg-gray-100 p-10 rounded-xl shadow-2xl mt-8">
        <div className="w-full rounded-lg shadow-lg bg-white border-4 border-gold-500">
          <h6 className="text-3xl text-center space-x-4 text-black mb-4 ml-8">Available Compute</h6>
          <div className="search-bar-container ml-8 text-center flex flex-col items-center gap-2">
            <input
              type="text"
              placeholder="Search GPU Clusters"
              className="search-bar px-2 py-1 w-1/2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              onChange={(e) => setGpuClusters(gpuClusters.filter(cluster => cluster.name.toLowerCase().includes(e.target.value.toLowerCase())))}
            />
            <input
              type="number"
              placeholder="Number of Nodes"
              className="search-bar px-2 py-1 w-1/2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              onChange={(e) => setGpuClusters(gpuClusters.filter(cluster => cluster.nodes >= parseInt(e.target.value)))}
            />
            <input
              type="datetime-local"
              className="search-bar px-2 py-1 w-1/2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              onChange={(e) => setGpuClusters(gpuClusters.filter(cluster => new Date(cluster.startTime) <= new Date(e.target.value) && new Date(cluster.endTime) >= new Date(e.target.value)))}
            />
          </div>
          <GPUGridWrapper gpuClusters={gpuClusters} onClusterClick={handleClusterClick} />
        </div>
      </div>
    </div>
  );
};



export default PageContent;