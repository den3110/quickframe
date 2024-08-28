import React, { useEffect, useState } from 'react';
import settingsApi from 'api/settings/settingsApi';
import MaintenancePageView from 'page-sections/maintenance/MaintenancePageView';

const CheckMaintenance = ({ children }) => {
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMaintenanceStatus = async () => {
      try {
        const randomNum = Math.random(); // Tạo số ngẫu nhiên để tránh cache
        const response = await fetch(`../../../maintain.json?rnd=${randomNum}`);
        const data = await response.json();
        setIsMaintenance(data.isMaintenance);
      } catch (error) {
        console.error("Failed to fetch maintenance status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceStatus();
  }, []);

  if (isMaintenance) {
    return <MaintenancePageView />;
  }

  return children;
};

export default CheckMaintenance;
