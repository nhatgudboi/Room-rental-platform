import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * RealMap — High-fidelity Interactive OpenStreetMap component using Leaflet.
 * Provides actual street tiles of Hanoi, university landmarks, and interactive price pins.
 */
export function RealMap({
  rooms = [],
  activePinId = null,
  onSelectPin = () => {},
  center = [21.0056, 105.8433], // Default: ĐH Bách Khoa Hà Nội
  zoom = 14,
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  // 1. Initialize Map Instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      // Standard OpenStreetMap Tiles
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Add University Landmark Marker
      const uniIcon = L.divIcon({
        className: 'uni-marker-container',
        html: `
          <div style="
            background: #dc2626;
            color: #ffffff;
            font-size: 11px;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 14px;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 8px rgba(220, 38, 38, 0.4);
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 4px;
            transform: translate(-50%, -50%);
          ">
            <span>🏛️ ĐH BÁCH KHOA HN</span>
          </div>
        `,
        iconSize: [0, 0],
      });

      L.marker([21.0056, 105.8433], { icon: uniIcon, zIndexOffset: 1000 }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Render or Update Room Price Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old room markers
    Object.values(markersRef.current).forEach((m) => map.removeLayer(m));
    markersRef.current = {};

    rooms.forEach((room) => {
      if (!room.lat || !room.lng) return;

      const isSelected = room.id === activePinId;
      const priceText = `${(room.monthlyRent / 1000000).toFixed(1)}Tr`;

      const icon = L.divIcon({
        className: 'custom-room-pin',
        html: `
          <div style="
            background-color: ${isSelected ? '#0194f3' : '#0f172a'};
            color: #ffffff;
            font-size: ${isSelected ? '12.5px' : '11.5px'};
            font-weight: 700;
            padding: ${isSelected ? '5px 12px' : '4px 9px'};
            border-radius: 16px;
            border: 2px solid #ffffff;
            box-shadow: ${isSelected ? '0 4px 12px rgba(1, 148, 243, 0.55)' : '0 2px 6px rgba(0,0,0,0.25)'};
            white-space: nowrap;
            cursor: pointer;
            transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
            transform: translate(-50%, -50%) ${isSelected ? 'scale(1.12)' : 'scale(1)'};
            display: inline-flex;
            align-items: center;
            gap: 3px;
          ">
            <span>${priceText}</span>
            ${isSelected ? '<span>★</span>' : ''}
          </div>
        `,
        iconSize: [0, 0],
      });

      const marker = L.marker([room.lat, room.lng], {
        icon: icon,
        zIndexOffset: isSelected ? 500 : 100,
      }).addTo(map);

      marker.on('click', () => {
        onSelectPin(room.id);
      });

      markersRef.current[room.id] = marker;
    });
  }, [rooms, activePinId]);

  // 3. Pan to Active Room when changed
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !activePinId) return;

    const activeRoom = rooms.find((r) => r.id === activePinId);
    if (activeRoom && activeRoom.lat && activeRoom.lng) {
      map.panTo([activeRoom.lat, activeRoom.lng], {
        animate: true,
        duration: 0.5,
      });
    }
  }, [activePinId, rooms]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        overflow: 'hidden',
        zIndex: 1,
      }}
    />
  );
}

