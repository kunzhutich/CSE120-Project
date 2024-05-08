import React from 'react';
import NavBar from "../components/navBar";
import FloodHead from "../components/fHeadTable";


export default function h1() {
    return (
        <div>
            <NavBar/>
            <FloodHead  headerColor='rgba(108, 193, 101)' requiredString={'H1'}/>
        </div>
    );
}