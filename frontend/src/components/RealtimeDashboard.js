// SmartAir City – IoT Platform for Urban Air Quality Monitoring
// based on NGSI-LD and FiWARE Standards

// SPDX-License-Identifier: MIT
// @version   0.1.x
// @author    SmartAir City Team <smartaircity@gmail.com>
// @copyright © 2025 SmartAir City Team. 
// @license   MIT License
// @see       https://github.com/lequang2009k4/SmartAir-City   SmartAir City Open Source Project

// This software is an open-source component of the SmartAir City initiative.
// It provides real-time environmental monitoring, NGSI-LD–compliant data
// models, MQTT-based data ingestion, and FiWARE Smart Data Models for
// open-data services and smart-city applications.

import React from 'react';
import { useAirQualityContext } from '../contexts/AirQualityContext';
import './RealtimeDashboard.css';

const RealtimeDashboard = () => {
  const { latestData, isConnected, isLoading } = useAirQualityContext();

  // Get the station with the most recent timestamp/dateObserved
  const station = React.useMemo(() => {
    if (!latestData || latestData.length === 0) return null;

    const getStationTime = (item) => {
      const ts = item?.timestamp;
      if (typeof ts === 'number') return ts;
      if (typeof ts === 'string') {
        const parsedTs = Date.parse(ts);
        if (!Number.isNaN(parsedTs)) return parsedTs;
      }

      const observed = item?.dateObserved;
      if (typeof observed === 'number') return observed;
      if (typeof observed === 'string') {
        const parsedObserved = Date.parse(observed);
        if (!Number.isNaN(parsedObserved)) return parsedObserved;
      }

      return 0;
    };

    return latestData.reduce((latest, current) => {
      if (!latest) return current;
      return getStationTime(current) > getStationTime(latest) ? current : latest;
    }, null);
  }, [latestData]);

  // Calculate 24h average AQI from all stations
  const calculate24hAverage = React.useMemo(() => {
    if (!latestData || latestData.length === 0) return 0;
    
    // Filter stations updated in last 24 hours
    const now = Date.now();
    const twentyFourHoursAgo = now - (24 * 60 * 60 * 1000);
    
    const recentStations = latestData.filter(s => {
      const stationTime = s.timestamp || new Date(s.dateObserved).getTime();
      return stationTime >= twentyFourHoursAgo;
    });
    
    if (recentStations.length === 0) return 0;
    
    const sum = recentStations.reduce((acc, s) => acc + (s.aqi || 0), 0);
    return (sum / recentStations.length).toFixed(1);
  }, [latestData]);

  // Determine AQI level and color
  const getAQILevel = (aqi) => {
    if (aqi <= 50) return { label: 'Tốt', color: '#10b981', class: 'good' };
    if (aqi <= 100) return { label: 'Trung bình', color: '#f59e0b', class: 'moderate' };
    if (aqi <= 150) return { label: 'Không tốt cho nhóm nhạy cảm', color: '#f97316', class: 'unhealthy-sensitive' };
    if (aqi <= 200) return { label: 'Không tốt', color: '#ef4444', class: 'unhealthy' };
    if (aqi <= 300) return { label: 'Rất không tốt', color: '#991b1b', class: 'very-unhealthy' };
    return { label: 'Nguy hại', color: '#7f1d1d', class: 'hazardous' };
  };

  const aqiLevel = station ? getAQILevel(station.aqi) : { label: '--', color: '#6b7280', class: 'unknown' };
  const avgAqiLevel = getAQILevel(parseFloat(calculate24hAverage));

  return (
    <div className="realtime-dashboard">
      {/* Connection Status */}
      <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
        {isConnected ? (
          <>
            <span className="status-icon">✅</span>
            <span>Kết nối WebSocket - Dữ liệu thời gian thực</span>
          </>
        ) : (
          <>
            <span className="status-icon">⏳</span>
            <span>Đang kết nối...</span>
          </>
        )}
      </div>

      {isLoading && !station ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : !station ? (
        <div className="no-data-state">
          <p>⚠️ Chưa có dữ liệu</p>
        </div>
      ) : (
        <div className="dashboard-grid">
          {/* Current AQI Card */}
          <div className="dashboard-card aqi-card">
            <h3>Chỉ số AQI hiện tại</h3>
            <div className={`aqi-value ${aqiLevel.class}`} style={{ color: aqiLevel.color }}>
              {Math.round(station.aqi)}
            </div>
            <div className="aqi-level" style={{ color: aqiLevel.color }}>
              {aqiLevel.label}
            </div>
            <div className="timestamp">
              {new Date(station.dateObserved || station.timestamp).toLocaleString('vi-VN')}
            </div>
          </div>

          {/* Pollutants Card */}
          <div className="dashboard-card pollutants-card">
            <h3>Các chất ô nhiễm</h3>
            <div className="metric">
              <span className="metric-label">PM2.5:</span>
              <span className="metric-value">{station.pm25?.toFixed(2)} µg/m³</span>
            </div>
            <div className="metric">
              <span className="metric-label">PM10:</span>
              <span className="metric-value">{station.pm10?.toFixed(2)} µg/m³</span>
            </div>
            <div className="metric">
              <span className="metric-label">O3:</span>
              <span className="metric-value">{station.o3?.toFixed(2)} µg/m³</span>
            </div>
            <div className="metric">
              <span className="metric-label">NO2:</span>
              <span className="metric-value">{station.no2?.toFixed(2)} µg/m³</span>
            </div>
            <div className="metric">
              <span className="metric-label">SO2:</span>
              <span className="metric-value">{station.so2?.toFixed(2)} µg/m³</span>
            </div>
            <div className="metric">
              <span className="metric-label">CO:</span>
              <span className="metric-value">{station.co?.toFixed(2)} µg/m³</span>
            </div>
          </div>

          {/* 24h Average AQI Card */}
          <div className="dashboard-card average-card">
            <h3>AQI trung bình 24h</h3>
            <div className={`aqi-value ${avgAqiLevel.class}`} style={{ color: avgAqiLevel.color }}>
              {calculate24hAverage}
            </div>
            <div className="aqi-level" style={{ color: avgAqiLevel.color }}>
              {avgAqiLevel.label}
            </div>
            {isConnected && (
              <div className="realtime-badge">
                🟢 Realtime
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RealtimeDashboard;
