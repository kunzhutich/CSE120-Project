import React, { useState, useEffect } from 'react';
import NavBar from "../components/navBar";
import FSTable from "../components/fsOrderTables";
import HFSTable from "../components/hFSTables";

const fsorders = () => {
    const [orders, setOrders] = useState([]); 
    const [heads, setHeads] = useState({ h1: [], h2: [], h3: [], h4: [], h5: [], un: [] }); 

    const fetchOrdersData = async () => {
        const sa = sessionStorage.getItem('sa');
        const response = await fetch('http://127.0.0.1:5000/forders', {
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
        console.log("Fetched Orders:", data);

        // Map the fetched data to include a unique 'id' for each row using 'combo'
        const formattedData = data.map((item) => ({
            ...item,
            id: item.combo, // Use `combo` as the `id`
        }));

        setOrders(formattedData);
        updateHeads(formattedData);
    };

    useEffect(() => {
        fetchOrdersData();
    }, []);

    const handleFinishCalculation = (estStart, hours) => {
        const estStartDate = new Date(estStart + 'Z'); // Append 'Z' to specify UTC time
        estStartDate.setUTCHours(estStartDate.getUTCHours() + hours);
        return estStartDate.toISOString().slice(0, 19).replace('T', ' ');
    };

    const handleHeadChange = async (orderId, newHeadValue) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, head: newHeadValue } : order 
        );
        setOrders(updatedOrders);
        updateHeads(updatedOrders);

        const orderToUpdate = updatedOrders.find(order => order.id === orderId);
        if (orderToUpdate) {
            try {
                const response = await fetch(`http://127.0.0.1:5000/updateOrder/${encodeURIComponent(orderId)}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'SA': sessionStorage.getItem('sa'),
                    },
                    body: JSON.stringify(orderToUpdate)
                });
                if (!response.ok) {
                    throw new Error('Failed to update order');
                }
                console.log("Head updated successfully:", await response.json());

                if (orderToUpdate.head !== newHeadValue) {
                    orderToUpdate.est_start = null;
                    orderToUpdate.est_finish = null;

                    const newHeadOrders = updatedOrders.filter(order => order.head === newHeadValue);
                    const currentIndex = newHeadOrders.findIndex(order => order.id === orderId);
                    if (currentIndex > 0) {
                        const previousOrder = newHeadOrders[currentIndex - 1];
                        orderToUpdate.est_start = previousOrder.est_finish;
                        orderToUpdate.est_finish = orderToUpdate.est_start && orderToUpdate.hours ? handleFinishCalculation(orderToUpdate.est_start, orderToUpdate.hours) : null;
                    }
                } else {
                    const headOrders = updatedOrders.filter(order => order.head === newHeadValue);
                    const currentIndex = headOrders.findIndex(order => order.id === orderId);
                    if (currentIndex > 0) {
                        const previousOrder = headOrders[currentIndex - 1];
                        orderToUpdate.est_start = previousOrder.est_finish;
                    } else {
                        orderToUpdate.est_start = null;
                    }
                    orderToUpdate.est_finish = orderToUpdate.est_start && orderToUpdate.hours ? handleFinishCalculation(orderToUpdate.est_start, orderToUpdate.hours) : null;
                }

                setOrders(updatedOrders); // This will re-render the component with new est_finish values
            } catch (error) {
                console.error('Failed to update head:', error);
            }
        }
    };    

    const updateHeads = (updatedOrders) => {
        const newHeads = { h1: [], h2: [], h3: [], h4: [], h5: [], un: [] };
        updatedOrders.forEach(order => {
            if (order.head && newHeads.hasOwnProperty(order.head)) {
                newHeads[order.head].push(order);
            } else {
                // Only log if it's truly an error, not just a null or empty string
                if (order.head !== null && order.head !== '') {
                    console.error('Invalid head value:', order.head);
                }
            }
        });
        setHeads(newHeads);
    };

    return (
        <div>
            <NavBar />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ position: 'sticky', top: 65 }}>
                    <FSTable orders={orders} onHeadChange={handleHeadChange} />
                </div>
                <div>
                    <HFSTable 
                        orders={heads.h1} 
                        setOrders={setOrders}
                        headerColor='rgba(108, 193, 101)' 
                        requiredString={'H1'} 
                    />
                    <HFSTable 
                        orders={heads.h2} 
                        setOrders={setOrders}
                        headerColor='rgba(135, 206, 250, 1)' 
                        requiredString={'H2'} 
                    />
                    <HFSTable 
                        orders={heads.h3} 
                        setOrders={setOrders}
                        headerColor='rgba(255, 182, 193, 1)' 
                        requiredString={'H3'} 
                    />
                    <HFSTable 
                        orders={heads.h4} 
                        setOrders={setOrders}
                        headerColor='rgba(220, 200, 255, 1)' 
                        requiredString={'H4'} 
                    />
                    <HFSTable 
                        orders={heads.h5} 
                        setOrders={setOrders}
                        headerColor='rgba(210, 180, 140, 1)' 
                        requiredString={'H5'} 
                    />
                    <HFSTable 
                        orders={heads.un} 
                        setOrders={setOrders}
                        headerColor='rgba(101, 176, 193, 0.5)' 
                        requiredString={'UN'}
                    />
                </div>
            </div>
        </div>
    );
};

export default fsorders;