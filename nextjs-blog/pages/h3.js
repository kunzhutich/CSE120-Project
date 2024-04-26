import NavBar from "../components/navBar";
import React, { useEffect, useState } from 'react';
import HeadTable from "../components/headTable";


export default function h3() {
    return (
        <div>
            <NavBar />
            <HeadTable headerColor='rgba(255, 182, 193, 1)' requiredString={'H3'} />
        </div>
    );
}