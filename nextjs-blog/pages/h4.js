import React from 'react';
import NavBar from "../components/navBar";
import FloodHead from "../components/fHeadTable";


export default function h4() {
    return (
        <div>
            <NavBar />
            <FloodHead headerColor='rgba(220, 200, 255, 1)' requiredString={'H4'} />
        </div>
    );
}