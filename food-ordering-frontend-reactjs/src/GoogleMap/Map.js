// import React, { useState, useEffect, useRef } from 'react';
// import './Map.css';

// const Map = () => {
//     const [showMap, setShowMap] = useState(false);
//     const markerRef = useRef(null);
//     const mapRef = useRef(null);

//     useEffect(() => {
//         // Create a new map object
//         const map = new window.google.maps.Map(mapRef.current, {
//             center: { lat: 21.034557, lng: 105.827957 },
//             zoom: 8
//         });

//         // Add a click event listener to the map
//         map.addListener('click', event => {
//             // Remove the previous marker, if it exists
//             if (markerRef.current) {
//                 markerRef.current.setMap(null);
//             }

//             // Create a new marker at the clicked location
//             markerRef.current = new window.google.maps.Marker({
//                 position: event.latLng,
//                 map
//             });

//             // Save the latitude and longitude to local storage
//             localStorage.setItem('lat', event.latLng.lat());
//             localStorage.setItem('lng', event.latLng.lng());
//             // Hide the map
//             // setShowMap(false);
//         });

//         // Add a click event listener to the map
//         map.addListener('click', event => {
//             console.log(event.latLng.lat(), event.latLng.lng());
//         });
//     }, []);

//     const handleShowMapClick = () => {
//         setShowMap(prevState => !prevState);
//     };

//     return (

//         <div className='positionParent' style={{ position: 'relative' }}>
//             <input placeholder='Vị trí của bạn' className='positionBox' type="text" />
//             <div className="icon" onClick={handleShowMapClick} style={{ position: 'absolute', top: 2, right: -43 }}></div>
//             <div className="icon1" style={{ position: 'absolute', top: 5, left: 6 }}></div>

//             <div className='map' hidden={!showMap} style={{ width: '200%', height: '1000%', position: 'absolute' }}>
//                 <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
//             </div>
//         </div>

//     );
// };

// export default Map;


import React, { useState, useEffect, useRef } from 'react';
import './Map.css';
import axios from 'axios';


const Map = () => {
    const [showMap, setShowMap] = useState(false);
    const markerRef = useRef(null);
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [infoWindow, setInfoWindow] = useState(null);
    const [addressBox, setAddressBox] = useState("");

    useEffect(() => {
        // Create a new map object
        const newMap = new window.google.maps.Map(mapRef.current, {
            center: { lat: 21.034557, lng: 105.827957 },
            zoom: 8
        });

        const newInfoWindow = new window.google.maps.InfoWindow();

        const locationButton = document.createElement("button");

        locationButton.textContent = "Vị trí của bạn";
        locationButton.classList.add("custom-map-control-button");
        newMap.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);
        locationButton.addEventListener("click", () => {
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };

                        newInfoWindow.setPosition(pos);
                        newInfoWindow.setContent("Location found.");
                        newInfoWindow.open(newMap);
                        newMap.setCenter(pos);
                        newMap.setZoom(15);
                        localStorage.setItem('lat', pos.lat);
                        localStorage.setItem('lng', pos.lng);
                        // Remove the previous marker, if it exists
                        if (markerRef.current) {
                            markerRef.current.setMap(null);
                        }
                        // Create a new marker at the clicked location
                        markerRef.current = new window.google.maps.Marker({
                            position: pos,
                            map: newMap
                        });


                        //get address
                        getAddress();

                    },
                    () => {
                        handleLocationError(true, newInfoWindow, newMap.getCenter());
                    }
                );
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, newInfoWindow, newMap.getCenter());
            }
        });

        // Add a click event listener to the map
        newMap.addListener('click', event => {
            // Remove the previous marker, if it exists
            if (markerRef.current) {
                markerRef.current.setMap(null);
            }

            // Create a new marker at the clicked location
            markerRef.current = new window.google.maps.Marker({
                position: event.latLng,
                map: newMap
            });

            // Save the latitude and longitude to local storage
            localStorage.setItem('lat', event.latLng.lat());
            localStorage.setItem('lng', event.latLng.lng());
            // Hide the map
            // setShowMap(false);

            //get address
            getAddress();

        });


        setMap(newMap);
        setInfoWindow(newInfoWindow);
    }, []);



    const getAddress = () => {

        // Listen for changes in local storage
        const lat = localStorage.getItem('lat');
        const lng = localStorage.getItem('lng');
        console.log(lat);
        console.log(lng);
        if (lat && lng) {
            // Call the geocoding API to fetch the address
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC1QyAzxN2d5A-i0XscLboZjrW6p0EmmoE`;
            axios.get(url).then(response => {
                const address = response.data.results[0].formatted_address;
                setAddressBox(address);
                localStorage.setItem('address', address);
                console.log(address);
            }).catch(error => {
                console.log(error);
            });
        }
    }

    useEffect(()=>{

        localStorage.setItem("address",addressBox)
    },[addressBox])


    const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
    };

    const handleShowMapClick = () => {
        setShowMap(prevState => !prevState);
    };

    return (

        <div className='positionParent' style={{ position: 'relative' }}>
            <input value={addressBox} onChange={(event) => {setAddressBox(event.target.value)
            }} placeholder='Vị trí của bạn' className='positionBox' type="text" style={{ position: 'absolute' }} />
            <div className="locationIcon" onClick={handleShowMapClick} style={{ position: 'absolute', top: 0, right: -9 }}></div>
            <div className="locationIcon1" style={{ position: 'absolute', top: 5, left: 6 }}></div>

            <div className='map' hidden={!showMap} style={{ width: '200%', height: '1000%', position: 'absolute', top: 36 }}>
                <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
            </div>
        </div>

    );
};



export default Map;


