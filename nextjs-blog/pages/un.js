import React from 'react';
import NavBar from "../components/navBar";
import FloodHead from "../components/fHeadTable";


export default function un() {
    return (
        <div>
            <NavBar/>
            <FloodHead headerColor='rgba(101, 176, 193, 0.5)' requiredString={'UN'}/>
        </div>
    );
}