import React, { createContext, useContext, useReducer } from 'react';

export const AppStateContext = createContext();

const initialState = {
    fTable: [],
    h1Table: [],
    h2Table: [],
    h3Table: [],
    h4Table: [],
    h5Table: [],
    unTable: [],
    mTable: [],
    mHeadTable: [],
};

// Reducer function to handle state transitions
function appStateReducer(state, action) {
    switch (action.type) {
        case 'SET_F_TABLE':  // Handling orders from /forders endpoint
            return { ...state, fTable: action.payload };
        
        case 'UPDATE_F_TABLE':
            const updatedFTable = state.fTable.map(order =>
                order.id === action.payload.id ? { ...order, ...action.payload } : order
            );
            return { ...state, fTable: updatedFTable };
        
        case 'SET_M_TABLE':  // Handling orders from /morders endpoint
            return { ...state, mTable: action.payload };

        case 'UPDATE_M_TABLE':
            const updatedMTable = state.mTable.map(order =>
                order.id === action.payload.id ? { ...order, ...action.payload } : order
            );
            return { ...state, mTable: updatedMTable };
            
        case 'SET_M_HEAD_TABLE':  // Handling orders from /M endpoint
            return { ...state, mHeadTable: action.payload };

        case 'UPDATE_M_HEAD_TABLE':
            const updatedMHeadTable = state.mHeadTable.map(head =>
                head.id === action.payload.id ? { ...head, ...action.payload } : head
            );
            return { ...state, mHeadTable: updatedMHeadTable };

        case 'SET_H1_TABLE':
            return { ...state, h1Table: action.payload };

        case 'UPDATE_H1_TABLE':
            const updatedH1Table = state.h1Table.map(order =>
                order.id === action.payload.id ? { ...order, ...action.payload } : order
            );
            return { ...state, h1Table: updatedH1Table };

        case 'ADD_TO_H1_TABLE':
            return { ...state, h1Table: [...state.h1Table, action.payload] };

        case 'REMOVE_FROM_H1_TABLE':
            return { ...state, h1Table: state.h1Table.filter(order => order.id !== action.payload.id) };

        case 'SET_H2_TABLE':
            return { ...state, h2Table: action.payload };

        case 'UPDATE_H2_TABLE':
            const updatedH2Table = state.h2Table.map(order =>
                order.id === action.payload.id ? { ...order, ...action.payload } : order
            );
            return { ...state, h2Table: updatedH2Table };

        case 'ADD_TO_H2_TABLE':
            return { ...state, h2Table: [...state.h2Table, action.payload] };

        case 'REMOVE_FROM_H2_TABLE':
            return { ...state, h2Table: state.h2Table.filter(order => order.id !== action.payload.id) };

        case 'SET_H3_TABLE':
            return { ...state, h3Table: action.payload };

        case 'UPDATE_H3_TABLE':
            const updatedH3Table = state.h3Table.map(order =>
                order.id === action.payload.id ? { ...order, ...action.payload } : order
            );
            return { ...state, h3Table: updatedH3Table };

        case 'ADD_TO_H3_TABLE':
            return { ...state, h3Table: [...state.h3Table, action.payload] };

        case 'REMOVE_FROM_H3_TABLE':
            return { ...state, h3Table: state.h3Table.filter(order => order.id !== action.payload.id) };

        case 'SET_H4_TABLE':
            return { ...state, h4Table: action.payload };
            
        case 'UPDATE_H4_TABLE':
            const updatedH4Table = state.h4Table.map(order =>
                order.id === action.payload.id ? { ...order, ...action.payload } : order
            );
            return { ...state, h4Table: updatedH4Table };

        case 'ADD_TO_H4_TABLE':
            return { ...state, h4Table: [...state.h4Table, action.payload] };

        case 'REMOVE_FROM_H4_TABLE':
            return { ...state, h4Table: state.h4Table.filter(order => order.id !== action.payload.id) };

        case 'SET_H5_TABLE':
            return { ...state, h5Table: action.payload };

        case 'UPDATE_H5_TABLE':
            const updatedH5Table = state.h5Table.map(order =>
                order.id === action.payload.id ? { ...order, ...action.payload } : order
            );
            return { ...state, h5Table: updatedH5Table };

        case 'ADD_TO_H5_TABLE':
            return { ...state, h5Table: [...state.h5Table, action.payload] };

        case 'REMOVE_FROM_H5_TABLE':
            return { ...state, h5Table: state.h5Table.filter(order => order.id !== action.payload.id) };

        case 'SET_UN_TABLE':
            return { ...state, unTable: action.payload };

        case 'UPDATE_UN_TABLE':
            const updatedUNTable = state.unTable.map(order =>
                order.id === action.payload.id ? { ...order, ...action.payload } : order
            );
            return { ...state, unTable: updatedUNTable };

        case 'ADD_TO_UN_TABLE':
            return { ...state, unTable: [...state.unTable, action.payload] };
            
        case 'REMOVE_FROM_UN_TABLE':
            return { ...state, unTable: state.unTable.filter(order => order.id !== action.payload.id) };

        default:
            return state;
    }
}


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
