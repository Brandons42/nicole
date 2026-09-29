import React, {useState} from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

import { Date } from './Date';
import dates from '../dates';

export const InteractiveMap = () => {
	const [selectedDate, setSelectedDate] = useState(-1);

	return (
		<div>
			<APIProvider apiKey={import.meta.env.PUBLIC_MAPS_API_KEY} libraries={['marker']}>
				<Map
					style={{width: '100vw', height: '100vh'}}
					mapId='DEMO_MAP_ID'
					defaultCenter={{lat: 37.794756521840924, lng: -122.40697801684117}}
					defaultZoom={10}
					gestureHandling='greedy'
					disableDefaultUI
				>
					{dates.map((date, i) => <Date date={date} handleSelection={() => setSelectedDate(i)} key={i} selected={selectedDate == i} />)}
				</Map>
			</APIProvider>
			{selectedDate >= 0 && <div style={{
				backgroundColor: 'white',
				position: 'fixed',
				right: 10,
				top: 10,
			}}>
				<h1>{dates[selectedDate].title}</h1>
				<p>{dates[selectedDate].date}</p>
			</div>}
		</div>
	);
};
