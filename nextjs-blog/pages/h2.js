import React from 'react';
import NavBar from "../components/navBar";
import FloodHead from "../components/fHeadTable";


export default function h2() {
    return (
        <div>
            <NavBar />
            <FloodHead headerColor='rgba(135, 206, 250, 1)' requiredString={'H2'} 
            />
        </div>
    );
}