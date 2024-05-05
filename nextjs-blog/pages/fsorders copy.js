import React, { useState, useEffect, useContext } from 'react';
import { AppStateContext } from '../context/AppStateContext';
import NavBar from "../components/navBar";
import FSTable from "../components/fsOrderTables";
import HFSTable from "../components/hFSTables";

const fsorders = () => {
    const { state, dispatch } = useContext(AppStateContext);
    const [heads, setHeads] = useState({ h1: [], h2: [], h3: [], h4: [], h5: [], un: [] }); 

    // useEffect(() => {
    //     const fetchOrders = async () => {
    //         try {
    //             const sa = sessionStorage.getItem('sa');
    //             const response = await fetch('http://127.0.0.1:5000/forders', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'SA': sa,
    //                 },
    //             });
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok: ' + response.statusText);
    //             }
    //             const data = await response.json();
    //             console.log("Fetched Orders:", data);
    //             console.log("Dispatching with payload:", data);
    //             dispatch({ type: 'SET_FS_ORDERS', payload: data.map(item => ({ ...item, id: item.combo })) });
    //             console.log("State after dispatching:", state.fsOrders);
    //         } catch (error) {
    //             console.error("Failed to fetch orders:", error);
    //         }
    //     };

    //     fetchOrders();
    // }, [dispatch]);

    const fetchOrders = async () => {
        try {
            const sa = sessionStorage.getItem('sa');
            const response = await fetch('http://127.0.0.1:5000/forders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'SA': sa,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            const data = await response.json();
            console.log("Fetched Orders:", data);
            console.log("Dispatching with payload:", data);
            dispatch({ type: 'SET_FS_ORDERS', payload: data.map(item => ({ ...item, id: item.combo })) });
            console.log("State after dispatching:", state.fsOrders);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    console.log("State after dispatching:", state.fsOrders);


    useEffect(() => {
        console.log("Updated fsOrders state:", state.fsOrders);
    }, [state.fsOrders]);

    const handleCellEditCommit = async (params) => {
        const { id, field, value } = params;
        const currentOrder = state.fsOrders.find(order => order.id === id);
        let updatedOrder = { ...currentOrder, [field]: value };

        try {
            const encodedId = encodeURIComponent(id);
            const response = await fetch(`http://127.0.0.1:5000/updateFsOrder/${encodedId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'SA': sessionStorage.getItem('sa'),
                },
                body: JSON.stringify(updatedOrder),
            });
            if (!response.ok) {
                throw new Error('Failed to update order');
            }
            dispatch({ type: 'UPDATE_FS_ORDERS', payload: updatedOrder });
        } catch (error) {
            console.error('Failed to update order:', error);
        }
    };

    const handleFinishCalculation = (estStart, hours) => {
        if (!estStart || isNaN(new Date(estStart).getTime())) {
            return null;
        }
        const estStartDate = new Date(estStart + 'Z');
        estStartDate.setUTCHours(estStartDate.getUTCHours() + hours);
        return estStartDate.toISOString().slice(0, 19).replace('T', ' ');
    };

    // const handleHeadChange = async (orderId, newHeadValue) => {
    //     // const updatedOrders = orders.map(order =>
    //     //     order.id === orderId ? { ...order, head: newHeadValue } : order 
    //     // );
    //     // setOrders(updatedOrders);

    //     const updatedOrders = state.fsOrders.map(order =>
    //         order.id === orderId ? { ...order, head: newHeadValue } : order 
    //     );
    //     dispatch({ type: 'UPDATE_FS_ORDERS', payload: updatedOrders });

    //     updateHeads(updatedOrders);

    //     const orderToUpdate = updatedOrders.find(order => order.id === orderId);
    //     if (orderToUpdate) {
    //         try {
    //             const response = await fetch(`http://127.0.0.1:5000/updateOrder/${encodeURIComponent(orderId)}`, {
    //                 method: 'PUT',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'SA': sessionStorage.getItem('sa'),
    //                 },
    //                 body: JSON.stringify(orderToUpdate)
    //             });
    //             if (!response.ok) {
    //                 throw new Error('Failed to update order');
    //             }
    //             console.log("Head updated successfully:", await response.json());

    //             if (orderToUpdate.head !== newHeadValue) {
    //                 orderToUpdate.est_start = null;
    //                 orderToUpdate.est_finish = null;

    //                 const newHeadOrders = updatedOrders.filter(order => order.head === newHeadValue);
    //                 const currentIndex = newHeadOrders.findIndex(order => order.id === orderId);
    //                 if (currentIndex > 0) {
    //                     const previousOrder = newHeadOrders[currentIndex - 1];
    //                     orderToUpdate.est_start = previousOrder.est_finish;
    //                     orderToUpdate.est_finish = orderToUpdate.est_start && orderToUpdate.hours ? handleFinishCalculation(orderToUpdate.est_start, orderToUpdate.hours) : null;
    //                 }
    //             } else {
    //                 const headOrders = updatedOrders.filter(order => order.head === newHeadValue);
    //                 const currentIndex = headOrders.findIndex(order => order.id === orderId);
    //                 if (currentIndex > 0) {
    //                     const previousOrder = headOrders[currentIndex - 1];
    //                     orderToUpdate.est_start = previousOrder.est_finish;
    //                 } else {
    //                     orderToUpdate.est_start = null;
    //                 }
    //                 orderToUpdate.est_finish = orderToUpdate.est_start && orderToUpdate.hours ? handleFinishCalculation(orderToUpdate.est_start, orderToUpdate.hours) : null;
    //             }

    //             setOrders(updatedOrders); // This will re-render the component with new est_finish values
    //         } catch (error) {
    //             console.error('Failed to update head:', error);
    //         }
    //     }
    // };    

    // const handleHeadChange = async (orderId, newHeadValue) => {
    //     // Create a new array of orders with the updated head value
    //     const updatedOrders = state.fsOrders.map(order =>
    //         order.id === orderId ? { ...order, head: newHeadValue } : order 
    //     );
    
    //     // Update the global state with the new orders array
    //     dispatch({ type: 'UPDATE_FS_ORDERS', payload: updatedOrders });
    
    //     // Find the updated order to handle additional logic
    //     const orderToUpdate = updatedOrders.find(order => order.id === orderId);
    //     if (orderToUpdate) {
    //         try {
    //             // Update the order in the backend
    //             const response = await fetch(`http://127.0.0.1:5000/updateOrder/${encodeURIComponent(orderId)}`, {
    //                 method: 'PUT',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'SA': sessionStorage.getItem('sa'),
    //                 },
    //                 body: JSON.stringify(orderToUpdate)
    //             });
    //             if (!response.ok) {
    //                 throw new Error('Failed to update order');
    //             }
    //             console.log("Head updated successfully:", await response.json());
    
    //             // Check if the head has been changed and adjust start/finish times accordingly
    //             if (orderToUpdate.head !== newHeadValue) {
    //                 orderToUpdate.est_start = null;
    //                 orderToUpdate.est_finish = null;
    
    //                 const newHeadOrders = updatedOrders.filter(order => order.head === newHeadValue);
    //                 const currentIndex = newHeadOrders.findIndex(order => order.id === orderId);
    //                 if (currentIndex > 0) {
    //                     const previousOrder = newHeadOrders[currentIndex - 1];
    //                     orderToUpdate.est_start = previousOrder.est_finish;
    //                     orderToUpdate.est_finish = orderToUpdate.est_start && orderToUpdate.hours ? handleFinishCalculation(orderToUpdate.est_start, orderToUpdate.hours) : null;
    //                 }
    //             } else {
    //                 const headOrders = updatedOrders.filter(order => order.head === newHeadValue);
    //                 const currentIndex = headOrders.findIndex(order => order.id === orderId);
    //                 if (currentIndex > 0) {
    //                     const previousOrder = headOrders[currentIndex - 1];
    //                     orderToUpdate.est_start = previousOrder.est_finish;
    //                 } else {
    //                     orderToUpdate.est_start = null;
    //                 }
    //                 orderToUpdate.est_finish = orderToUpdate.est_start && orderToUpdate.hours ? handleFinishCalculation(orderToUpdate.est_start, orderToUpdate.hours) : null;
    //             }
    
    //             // Dispatch the updated order to the global state to ensure all components reflect the change
    //             dispatch({ type: 'UPDATE_FS_ORDERS', payload: updatedOrders });
    
    //         } catch (error) {
    //             console.error('Failed to update head:', error);
    //         }
    //     }
    // };

    // const updateHeads = (updatedOrders) => {
    //     const newHeads = { h1: [], h2: [], h3: [], h4: [], h5: [], un: [] };
    //     updatedOrders.forEach(order => {
    //         if (order.head && newHeads.hasOwnProperty(order.head)) {
    //             newHeads[order.head].push(order);
    //         } else {
    //             // Only log if it's truly an error, not just a null or empty string
    //             if (order.head !== null && order.head !== '') {
    //                 console.error('Invalid head value:', order.head);
    //             }
    //         }
    //     });
    //     setHeads(newHeads);
    // };

    const handleHeadChange = async (orderId, newHeadValue) => {
        const orderToUpdateIndex = state.fsOrders.findIndex(order => order.id === orderId);
        if (orderToUpdateIndex === -1) return; // If order not found, exit the function
    
        // Prepare the updated order
        const updatedOrder = { ...state.fsOrders[orderToUpdateIndex], head: newHeadValue };
    
        try {
            const response = await fetch(`http://127.0.0.1:5000/updateOrder/${encodeURIComponent(orderId)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'SA': sessionStorage.getItem('sa'),
                },
                body: JSON.stringify(updatedOrder)
            });
            if (!response.ok) throw new Error('Failed to update order');
            console.log("Head updated successfully:", await response.json());
    
            // After a successful update, adjust the orders in the state
            const newOrders = [...state.fsOrders];
            newOrders[orderToUpdateIndex] = updatedOrder; // Replace the order with the updated one
    
            // Reset start and finish if the head was changed
            if (newHeadValue !== state.fsOrders[orderToUpdateIndex].head) {
                updatedOrder.est_start = null;
                updatedOrder.est_finish = null;
            }
    
            // Update orders based on head sorting
            const headOrders = newOrders.filter(order => order.head === newHeadValue);
            const currentIndex = headOrders.findIndex(order => order.id === orderId);
            if (currentIndex > 0) {
                const previousOrder = headOrders[currentIndex - 1];
                updatedOrder.est_start = previousOrder.est_finish;
                updatedOrder.est_finish = updatedOrder.est_start && updatedOrder.hours ? handleFinishCalculation(updatedOrder.est_start, updatedOrder.hours) : null;
            } else {
                updatedOrder.est_start = null;
                updatedOrder.est_finish = null;
            }
    
            dispatch({ type: 'UPDATE_FS_ORDERS', payload: newOrders });

            useEffect(() => {
                console.log("Updated fsOrders state:", state.fsOrders);
            }, [state.fsOrders]);

            console.log("State after dispatching:", state.fsOrders);
    
        } catch (error) {
            console.error('Failed to update head:', error);
        }
    };
    

    // Update local state for heads filtering, but it seems redundant if you use global state to filter directly in components
    const updateHeads = (orders) => {
        const newHeads = { h1: [], h2: [], h3: [], h4: [], h5: [], un: [] };
        orders.forEach(order => {
            if (order.head && newHeads.hasOwnProperty(order.head)) {
                newHeads[order.head].push(order);
            }
        });
        setHeads(newHeads); // This seems redundant if you are filtering directly from global state
    };
    

    return (
        <div>
            <NavBar />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ position: 'sticky', top: 65 }}>
                    <FSTable orders={state.fsOrders} onHeadChange={handleHeadChange} />
                </div>
                <div>
                    <HFSTable 
                        // orders={heads.h1} 
                        // setOrders={setOrders}
                        // key={JSON.stringify(state.fsOrders.filter(order => order.head === 'H1'))}
                        orders={state.fsOrders.filter(order => order.head === 'H1')}
                        headerColor='rgba(108, 193, 101)' 
                        requiredString={'H1'} 
                    />
                    <HFSTable 
                        // orders={heads.h2} 
                        // setOrders={setOrders}
                        orders={state.fsOrders.filter(order => order.head === 'H2')}
                        headerColor='rgba(135, 206, 250, 1)' 
                        requiredString={'H2'} 
                    />
                    <HFSTable 
                        // orders={heads.h3} 
                        // setOrders={setOrders}
                        orders={state.fsOrders.filter(order => order.head === 'H3')}
                        headerColor='rgba(255, 182, 193, 1)' 
                        requiredString={'H3'} 
                    />
                    <HFSTable 
                        // orders={heads.h4} 
                        // setOrders={setOrders}
                        orders={state.fsOrders.filter(order => order.head === 'H4')}
                        headerColor='rgba(220, 200, 255, 1)' 
                        requiredString={'H4'} 
                    />
                    <HFSTable 
                        // orders={heads.h5} 
                        // setOrders={setOrders}
                        orders={state.fsOrders.filter(order => order.head === 'H5')}
                        headerColor='rgba(210, 180, 140, 1)' 
                        requiredString={'H5'} 
                    />
                    <HFSTable 
                        // orders={heads.un} 
                        // setOrders={setOrders}
                        orders={state.fsOrders.filter(order => order.head === 'UN')}
                        headerColor='rgba(101, 176, 193, 0.5)' 
                        requiredString={'UN'}
                    />
                </div>
            </div>
        </div>
    );
};

export default fsorders;