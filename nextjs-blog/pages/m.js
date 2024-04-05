import React, { useEffect, useState } from 'react';
import NavBar from "../components/navBar";
import MTable from "../components/mTable";

export default function m() {
    const [orders, setOrders] = useState([]); // Initialize orders state as an empty array

    useEffect(() => {
        // Function to fetch orders data from Flask API
        const fetchOrders = async () => {
            try {
                const sa = sessionStorage.getItem('sa'); // Retrieve the SA value from sessionStorage

                const response = await fetch('http://127.0.0.1:5000/morders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'SA': sa,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
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
            <MTable/>
        </div>
    );
}