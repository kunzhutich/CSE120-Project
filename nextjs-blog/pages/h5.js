import NavBar from "../components/navBar";
import React, { useEffect, useState } from 'react';
import HeadTable from "../components/headTable";


export default function h5() {
    return (
        <div>
            <NavBar />
            <HeadTable headerColor='rgba(210, 180, 140, 1)' requiredString={'H5'} />
        </div>
    );
}