import NavBar from "../components/navBar";
import React, { useEffect, useState } from 'react';
import HeadTable from "../components/headTable";


export default function h2() {
    return (
        <div>
            <NavBar />
            <HeadTable headerColor='rgba(135, 206, 250, 1)' requiredString={'H2'} 
            />
        </div>
    );
}