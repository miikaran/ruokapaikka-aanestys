import { useState } from 'react';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import burgerit from '../Ruokapaikka-JSONIT/BURGERIMESTAT.json'
import grillit from '../Ruokapaikka-JSONIT/GRILLIT.json'


export default function Map(props){

    let pollResult = []

    //TARKISTETAAN VOITTAJA ÄÄNI, KOSKA PROPS = READONLY//
    if(props.pollWinner == "burgerit"){
        pollResult = burgerit

    }
    else if(props.pollWinner == "grillit"){
        pollResult = grillit
    }


    //LEAFLETJS PARAMETRIT//
    const startingPos = [60.4861, 22.1694]
    const zoom = 15
    const scrollWheelZoom = true
              
    return(

        <div className="mx-auto bg-white flex items-center">

            <MapContainer center={startingPos} zoom={zoom} scrollWheelZoom={scrollWheelZoom}>

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {pollResult.map((ruokapaikat, key ) => (

                    <Marker
                    position={[ruokapaikat.lat, ruokapaikat.lng]}  
                    key = {key}
                    >
                    <Popup>{[ruokapaikat.paikka]}</Popup>
                    </Marker>

                ))}

            </MapContainer>

        </div>
  
)}



