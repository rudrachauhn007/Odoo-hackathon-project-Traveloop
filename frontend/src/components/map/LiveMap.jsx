import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in Vite/React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// Component to handle auto-fitting bounds based on markers
function MapBounds({ markers }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lon]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, markers]);
  return null;
}

const LiveMap = ({ locations }) => {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!locations || locations.length === 0) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      const newMarkers = [];
      
      for (const loc of locations) {
        try {
          // Add a delay to respect Nominatim API rate limits
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(loc)}`);
          const data = await response.json();
          
          if (data && data.length > 0) {
            newMarkers.push({
              name: loc,
              lat: parseFloat(data[0].lat),
              lon: parseFloat(data[0].lon),
            });
          }
        } catch (error) {
          console.error(`Error fetching coordinates for ${loc}:`, error);
        }
      }
      
      setMarkers(newMarkers);
      setLoading(false);
    };

    fetchCoordinates();
  }, [locations]);

  if (loading) {
    return (
      <div className="w-full h-full min-h-[500px] bg-slate-50 rounded-3xl flex items-center justify-center border border-slate-200">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">Mapping your journey...</p>
        </div>
      </div>
    );
  }

  if (markers.length === 0) {
    return (
      <div className="w-full h-full min-h-[500px] bg-slate-50 rounded-3xl flex items-center justify-center border border-slate-200">
        <p className="text-slate-500 font-medium">No locations found to display on the map.</p>
      </div>
    );
  }

  // Fallback center to the first marker or 0,0
  const center = markers.length > 0 ? [markers[0].lat, markers[0].lon] : [0, 0];
  const polylinePositions = markers.map(m => [m.lat, m.lon]);

  return (
    <div className="w-full h-full min-h-[500px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative z-0">
      <MapContainer center={center} zoom={6} scrollWheelZoom={true} className="w-full h-full absolute inset-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {markers.map((marker, idx) => (
          <Marker key={idx} position={[marker.lat, marker.lon]}>
            <Popup>
              <div className="font-semibold text-slate-800">{marker.name}</div>
              <div className="text-xs text-slate-500">Stop {idx + 1}</div>
            </Popup>
          </Marker>
        ))}
        {markers.length > 1 && (
          <Polyline 
            positions={polylinePositions} 
            color="#10b981" 
            weight={4} 
            dashArray="10, 10" 
          />
        )}
        <MapBounds markers={markers} />
      </MapContainer>
    </div>
  );
};

export default LiveMap;
