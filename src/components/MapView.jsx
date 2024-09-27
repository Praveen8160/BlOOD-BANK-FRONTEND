import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
const MapView = (props) => {
  const handleGetDirections = (latitude, longitude) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(googleMapsUrl, "_blank");
  };
  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={12}
      style={{
        height: "400px",
        width: "100%",
        margin: "20px auto",
        borderRadius: "10px",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {props.data.map((val) => (
        <Marker
          key={val._id}
          position={[
            val.location.coordinates[1],
            val.location.coordinates[0],
          ]}
        >
          <Popup>
            <div
              onClick={() =>
                handleGetDirections(
                  val.location.coordinates[1],
                  val.location.coordinates[0]
                )
              }
              style={{ cursor: "pointer", color: "black" }}
            >
              <strong>{val?.fullname||val?.bloodBankName}</strong>
              {val.bloodGroup} <br />
              <span style={{ textDecoration: "underline" }}>
                Get Directions
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
