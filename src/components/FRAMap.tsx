import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Layers, MapPin, Settings } from 'lucide-react';
import { mapLayers } from '@/data/mockData';

const FRAMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showLayers, setShowLayers] = useState({ CR: true, CFR: true, IFR: true, waterBodies: true });
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map only if token is provided
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [81.0, 21.0], // Central India
      zoom: 6,
      pitch: 0,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for different layer types
    map.current.on('load', () => {
      addLayerMarkers();
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  const addLayerMarkers = () => {
    if (!map.current) return;

    // Add CR markers
    mapLayers.CR.forEach((point) => {
      const el = document.createElement('div');
      el.className = 'cr-marker';
      el.style.cssText = `
        background-color: #10B981;
        width: 12px;
        height: 12px;
        border: 2px solid white;
        border-radius: 50%;
        cursor: pointer;
      `;

      const marker = new mapboxgl.Marker(el)
        .setLngLat(point.coordinates as [number, number])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-semibold">${point.name}</h3>
                <p class="text-sm">Type: Community Rights</p>
                <p class="text-sm">Area: ${point.area}</p>
                <p class="text-sm">Status: ${point.status}</p>
              </div>
            `)
        )
        .addTo(map.current!);
    });

    // Add CFR markers  
    mapLayers.CFR.forEach((point) => {
      const el = document.createElement('div');
      el.className = 'cfr-marker';
      el.style.cssText = `
        background-color: #3B82F6;
        width: 12px;
        height: 12px;
        border: 2px solid white;
        border-radius: 50%;
        cursor: pointer;
      `;

      new mapboxgl.Marker(el)
        .setLngLat(point.coordinates as [number, number])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-semibold">${point.name}</h3>
                <p class="text-sm">Type: Community Forest Resources</p>
                <p class="text-sm">Area: ${point.area}</p>
                <p class="text-sm">Status: ${point.status}</p>
              </div>
            `)
        )
        .addTo(map.current!);
    });

    // Add IFR markers
    mapLayers.IFR.forEach((point) => {
      const el = document.createElement('div');
      el.className = 'ifr-marker';
      el.style.cssText = `
        background-color: #F59E0B;
        width: 12px;
        height: 12px;
        border: 2px solid white;
        border-radius: 50%;
        cursor: pointer;
      `;

      new mapboxgl.Marker(el)
        .setLngLat(point.coordinates as [number, number])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-semibold">${point.name}</h3>
                <p class="text-sm">Type: Individual Forest Rights</p>
                <p class="text-sm">Area: ${point.area}</p>
                <p class="text-sm">Status: ${point.status}</p>
              </div>
            `)
        )
        .addTo(map.current!);
    });
  };

  if (!mapboxToken) {
    return (
      <div className="h-full flex items-center justify-center bg-muted">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Map Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please enter your Mapbox public token to display the FRA Atlas map.
            </p>
            <Input
              placeholder="Mapbox Public Token (pk.eyJ1...)"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Get your token from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Map Legend */}
      <Card className="absolute top-4 left-4 w-64 bg-card/95 backdrop-blur">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Layers className="w-4 h-4" />
            <span>FRA Atlas Layers</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
              <span className="text-xs">Community Rights (CR)</span>
            </div>
            <Badge variant="outline" className="text-xs">{mapLayers.CR.length}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white"></div>
              <span className="text-xs">Community Forest Resources (CFR)</span>
            </div>
            <Badge variant="outline" className="text-xs">{mapLayers.CFR.length}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-amber-500 border-2 border-white"></div>
              <span className="text-xs">Individual Forest Rights (IFR)</span>
            </div>
            <Badge variant="outline" className="text-xs">{mapLayers.IFR.length}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-3 h-3 text-blue-600" />
              <span className="text-xs">Water Bodies</span>
            </div>
            <Badge variant="outline" className="text-xs">{mapLayers.waterBodies.length}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FRAMap;