import React, { useEffect, useState } from 'react';
import NavBar from "../components/navBar";

export default function forders() {
   
    const [orders, setOrders] = useState([]); // Initialize orders state as an empty array

    useEffect(() => {
        // Function to fetch orders data from Flask API
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/forders');
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
            <h1>F Orders</h1>
            <div>
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div key={index}>
                            {/* Display your order data here. This is just an example. */}
                            <p>Order ID: {order.id}</p>
                            {/* Add more order details as needed */}
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
}
