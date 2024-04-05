import NavBar from "../components/navBar";
import React, { useEffect, useState } from 'react';


export default function h1() {
    const [orders, setOrders] = useState([]); // Initialize orders state as an empty array

    useEffect(() => {
        // Function to fetch orders data from Flask API
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/h1'); // for windows
                // const response = await fetch('http://127.0.0.1:5000/h1'); // for mac
                const data = await response.json();
                setOrders(data); // Update the orders state with the fetched data
            } catch (error) {
                console.error("Failed to fetch headsheet:", error);
            }
        };

        fetchOrders(); // Call the fetch function
    }, []); // The empty array ensures this effect runs only once after the initial render
    return (
        <div>
            <NavBar/>
            <h1>H1</h1>
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
                            <p>Est_Start: {order.est_start} </p>
                            <p>Prime_Date: {order.prime_date}</p>
                            <p>Prime_Time: {order.prime_time}</p>
                            <p>Start_Date: {order.start_date}</p>
                            <p>Start_Time: {order.start_time}</p>
                            <p>Finish_Date: {order.finish_date}</p>
                            <p>Finish_Time: {order.finish_time}</p>
                            <p>Prime_Total: {order.prime_total}</p>
                            <p>Total_Hours: {order.total_hours}</p>
                            <p>Called: {order.called}</p>
                            <p>Notes: {order.wdo_notes}</p>
                            <p>Comment: {order.comment}</p>
                            <p>Abnormal: {order.abnormal}</p>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
}