import React, { createContext, useContext, useReducer } from 'react';

// export const AppStateContext = createContext();  
export const AppStateContext = React.createContext(null);

const initialState = {
    mTable: [],
    mHeadTable: [],
    fTable: [],
    fHeadTable: [],
    fsOrders: [],
    hFSOrders: [],
    orders: [],
    heads: {}
};

// Reducer function to handle state transitions
function appStateReducer(state, action) {
    switch (action.type) {
        case 'SET_M_TABLE':  // Handling orders from /morders endpoint
            return { ...state, mTable: action.payload };
            
        case 'SET_M_HEAD_TABLE':  // Handling orders from /M endpoint
            return { ...state, mHeadTable: action.payload };

        case 'SET_F_TABLE':  // Handling orders from /forders endpoint
            return { ...state, fTable: action.payload };

        case 'SET_F_HEAD_TABLE':
            return { ...state, fHeadTable: action.payload };

        // case 'SET_FS_ORDERS':
        //     return { ...state, fsOrders: action.payload };
        
        case 'SET_H_FS_ORDERS':
            return { ...state, hFSOrders: action.payload };

        case 'UPDATE_M_TABLE':
            const updatedMTable = state.mTable.map(order =>
                order.id === action.payload.id ? { ...order, ...action.payload } : order
            );
            return { ...state, mTable: updatedMTable };

        case 'UPDATE_M_HEAD_TABLE':
            const updatedMHeadTable = state.mHeadTable.map(head =>
                head.id === action.payload.id ? { ...head, ...action.payload } : head
            );
            return { ...state, mHeadTable: updatedMHeadTable };

        case 'UPDATE_F_TABLE':
            const updatedFTable = state.fTable.map(order =>
                order.id === action.payload.id ? { ...order, ...action.payload } : order
            );
            return { ...state, fTable: updatedFTable };

        case 'UPDATE_F_HEAD_TABLE':
            const updatedFHeadTable = state.fHeadTable.map(head =>
                head.id === action.payload.id ? { ...head, ...action.payload } : head
            );
            return { ...state, fHeadTable: updatedFHeadTable };

        // case 'UPDATE_FS_ORDERS':
        //     return { ...state, fsOrders: state.fsOrders.map(order =>
        //         order.id === action.payload.id ? { ...order, ...action.payload } : order
        //     )};
        // case 'UPDATE_FS_ORDERS':
        //     return {
        //         ...state,
        //         fsOrders: action.payload.map(order => {
        //             const existingOrder = state.fsOrders.find(o => o.id === order.id);
        //             return existingOrder ? { ...existingOrder, ...order } : order;
        //         })
        //     };

        case 'SET_FS_ORDERS':
            return {
                ...state,
                fsOrders: action.payload
            };
        case 'UPDATE_FS_ORDERS':
            return {
                ...state,
                fsOrders: state.fsOrders.map(order =>
                    order.id === action.payload.id ? { ...order, ...action.payload } : order
                )
            };

        case 'UPDATE_H_FS_ORDERS':
            return { ...state, hFSOrders: state.hFSOrders.map(order =>
                order.id === action.payload.id ? { ...order, ...action.payload } : order
            )};

        case 'UPDATE_HEADS':
            return { ...state, heads: action.payload };

        default:
            return state;
    }
}


// Provider component
export function AppStateProvider({ children }) {
    const [state, dispatch] = useReducer(appStateReducer, initialState);

    const value = { state, dispatch };

    return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
    const context = useContext(AppStateContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within an AppStateProvider');
    }
    return context;
}
