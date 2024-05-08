import React from 'react';
import NavBar from "../components/navBar";
import FloodHead from "../components/fHeadTable";


export default function h3() {
    return (
        <div>
            <NavBar />
            <FloodHead headerColor='rgba(255, 182, 193, 1)' requiredString={'H3'} />
        </div>
    );
}