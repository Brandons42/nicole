import React, { useState } from 'react';
import {
	AdvancedMarker,
	InfoWindow,
	useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

export const Location = ({ handleSelection, location, selected }) => {
	const [infowindowOpen, setInfowindowOpen] = useState(false);
	const [markerRef, marker] = useAdvancedMarkerRef();

	return (
		<>
			<AdvancedMarker
				ref={markerRef}
				onClick={() => {
					setInfowindowOpen(true);
					handleSelection();
				}}
				position={{ lat: location.lat, lng: location.lng }}
				title={location.title}
			/>
			{selected && infowindowOpen && (
				<InfoWindow
					anchor={marker}
					maxWidth={200}
					onCloseClick={() => setInfowindowOpen(false)}
				>
					{location.title}
				</InfoWindow>
			)}
		</>
	);
};
