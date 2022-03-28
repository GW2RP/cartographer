import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap, useMapEvents } from 'react-leaflet'
import { MenuIcon, XIcon} from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {LatLngBounds} from "leaflet/dist/leaflet-src.esm";

const eventIcon = leaflet.icon({
  iconUrl: './icons/WaypointIcon.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
});

const mapDimensions = [81920, 114688];

function Map() {
  const map = useMap();
  const [bounds, setBounds] = useState(null)

  useEffect(() => {
    function unproject(coord) {
      return map.unproject(coord, map.getMaxZoom());
    }

    setBounds(new LatLngBounds(unproject([0, 0]), unproject(mapDimensions)));
  }, [map]);

  useMapEvents({
    click(e) {
      console.log(e);
    },
  });

  return (
    <>
      <TileLayer
        attribution='Map data and imagery &copy; <a href="https://www.arena.net/fr">ArenaNet</a> | Additional imagery <a href="https://blog.thatshaman.com/">that_shaman</a> | Data from GW2RP FR community'
        url="https://gw2rp-hekataios-tiles.netlify.app/1/1/{z}/{x}/{y}.jpg"
        maxZoom={7}
        noWrap={true}
        tileSize={256}
        bounds={bounds}
      />
      <ZoomControl position="bottomright" />
      <Marker position={[-300.065, 340.401]} icon={eventIcon}>
        <Popup>
          Some location
        </Popup>
      </Marker>
      <Marker position={[-250.065, 330]} icon={eventIcon}>
        <Popup>
          Some location
        </Popup>
      </Marker>
    </>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <main>
      <div className="fixed z-[800] bg-white m-2 p-3 rounded-lg">
        <button type="button" onClick={() => setSidebarOpen(true)}>
          <span className="sr-only">Open sidebar</span>
          <MenuIcon className="h-6 w-6"/>
        </button>
      </div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-[810]" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white rounded-r-lg p-3">
              <div className="flex justify-between m-2">
                <h1>Cartographe</h1>
                <button type="button">
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-5 w-5" onClick={() => setSidebarOpen(false)} />
                </button>
              </div>
              <hr />
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
      <MapContainer
        center={[-293.065, 362.401]}
        zoom={2}
        minZoom={2}
        maxZoom={7}
        zoomControl={false}
        crs={leaflet.CRS.Simple}
        style={{ width: '100%', height: '100vh' }}>
        <Map />
      </MapContainer>
    </main>
  );
}

export default App;
