import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ResponsiveContainer } from 'recharts';
import ReactTooltip from 'react-tooltip';

// Load react-simple-maps dynamically to prevent SSR issues
const ComposableMap = dynamic(
  () => import('react-simple-maps').then((mod) => mod.ComposableMap),
  { ssr: false }
);
const Geographies = dynamic(
  () => import('react-simple-maps').then((mod) => mod.Geographies),
  { ssr: false }
);
const Geography = dynamic(
  () => import('react-simple-maps').then((mod) => mod.Geography),
  { ssr: false }
);

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

// Sample user data by country
const userData = {
  USA: 1200,
  Nigeria: 800,
  Germany: 500,
  India: 1000,
  Brazil: 700,
};

const MapChart = () => {
  const [tooltipContent, setTooltipContent] = useState('');

  return (
    <div className='rounded-md'>
      <h3 className='text-lg font-semibold'>Users by Country</h3>
      <div className='mt-10 relative'>
        <ResponsiveContainer width='100%' height='100%'>
          <ComposableMap projection='geoMercator' data-tip=''>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name;
                  const users = (userData as any)[countryName] || 0;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={users > 0 ? '#4F46E5' : '#D1D5DB'}
                      stroke='#E5E7EB'
                      onMouseEnter={() => {
                        setTooltipContent(`${countryName}: ${users} users`);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent('');
                      }}
                      style={{
                        default: { outline: 'none' },
                        hover: { fill: '#6366F1' },
                        pressed: { fill: '#4338CA' },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </ResponsiveContainer>
        {/* <ReactTooltip>{tooltipContent}</ReactTooltip> */}
      </div>
    </div>
  );
};

export default MapChart;
