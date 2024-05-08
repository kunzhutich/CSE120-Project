import React from 'react';
import NavBar from "../components/navBar";
import FloodHead from "../components/fHeadTable";


export default function h5() {
    return (
        <div>
            <NavBar />
            <FloodHead headerColor='rgba(210, 180, 140, 1)' requiredString={'H5'} />
        </div>
    );
}