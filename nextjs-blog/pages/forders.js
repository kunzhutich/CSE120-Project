import React, { useEffect, useState } from 'react';
import NavBar from "../components/navBar";
import FTable from "../components/fTable";

export default function forders() {
    const [orders, setOrders] = useState([]); // Initialize orders state as an empty array

    useEffect(() => {
        // Function to fetch orders data from Flask API
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/forders'); // for windows
                // const response = await fetch('http://127.0.0.1:5000/forders'); // for mac
                const data = await response.json();
                setOrders(data); // Update the orders state with the fetched data
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        };

        fetchOrders(); // Call the fetch function
    }, []); // The empty array ensures this effect runs only once after the initial render

    return (
        <div>
            <NavBar/>
            <FTable/>
            <div>
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div key={index}>
                            <p>Combo: {order.combo}</p>
                            <p>Lat: {order.lat}</p>
                            <p>SG: {order.sg}</p>
                            <p>Name: {order.name}</p>
                            <p>Flow: {order.flow}</p>
                            <p>Hours: {order.hours}</p>
                            <p>Acre: {order.acre}</p>
                            <p>Crop: {order.crop}</p>
                            <p>Type: {order.type}</p>
                            <p>Date: {order.date}</p>
                            <p>Trantime: {order.trantime}</p>
                            <p>EX: {order.ex}</p>
                            <p>Final: {order.final}</p>
                            <p>Comment: {order.comment}</p>
                            <p>SBXCFS: {order.sbxcfs}</p>
                            <p>Deleted: {order.deleted}</p>
                            <p>SA: {order.sa}</p>
                        </div>
                    ))
                    ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
}
