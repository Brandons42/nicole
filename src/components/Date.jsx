import React, {useEffect, useState} from 'react';
import {AdvancedMarker, Polyline} from '@vis.gl/react-google-maps';

import { Location } from './Location';
import faces from '../assets/faces.jpeg';

export const Date = ({ date, handleSelection, selected }) => {
  const [position, setPosition] = useState(() => ({
    lat: date.locations[0].lat,
    lng: date.locations[0].lng
  }));

  useEffect(() => {
    // Top-level guard condition inside the effect
    if (!selected || !date.locations || date.locations.length < 2) return;

    let segmentIndex = 0;
    let currentMarker = date.locations[0];
    let nextMarker = date.locations[1];

    const step = 0.0001;
    let theta = Math.atan2(
      nextMarker.lat - currentMarker.lat,
      nextMarker.lng - currentMarker.lng
    );
    let latStep = step * Math.sin(theta);
    let lngStep = step * Math.cos(theta);

    let currentLat = currentMarker.lat;
    let currentLng = currentMarker.lng;

    const interval = setInterval(() => {
      currentLat += latStep;
      currentLng += lngStep;

      // Grouped checks for segment completion
      const reachedLat = latStep >= 0 ? currentLat >= nextMarker.lat : currentLat <= nextMarker.lat;
      const reachedLng = lngStep >= 0 ? currentLng >= nextMarker.lng : currentLng <= nextMarker.lng;

      if (reachedLat && reachedLng) {
        currentLat = nextMarker.lat;
        currentLng = nextMarker.lng;
        setPosition({ lat: currentLat, lng: currentLng });

        segmentIndex++;
        // Advance to the next segment if available
        if (segmentIndex < date.locations.length - 1) {
          currentMarker = date.locations[segmentIndex];
          nextMarker = date.locations[segmentIndex + 1];
          theta = Math.atan2(
            nextMarker.lat - currentMarker.lat,
            nextMarker.lng - currentMarker.lng
          );
          latStep = step * Math.sin(theta);
          lngStep = step * Math.cos(theta);
        } else {
          clearInterval(interval);
        }
      } else {
        setPosition({ lat: currentLat, lng: currentLng });
      }
    }, 200);

    return () => clearInterval(interval);
  }, [date.locations, selected]);

  return (
		<>
			{date.locations.map((location, i) => ((!location.temporary || selected) && <Location handleSelection={handleSelection} key={i} location={location} selected={selected} />))}
      {selected && (
        <>
          <Polyline
            path={date.locations}
            strokeColor={'#ff0000'}
            strokeWeight={3}
          />
          <AdvancedMarker
          position={position}
          title={'N+B'}
          >
            <img
              src={faces.src}
              style={{
                width: 48,
                height: 48,
                position: 'absolute',
                top: 0,
                left: 0,
                background: '#1dbe80',
                border: '2px solid #0e6443',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)'
              }} />
          </AdvancedMarker>
        </>
      )}
		</>
	);
};
