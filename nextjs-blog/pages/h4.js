import NavBar from "../components/navBar";
import React, { useEffect, useState } from 'react';
import HeadTable from "../components/headTable";


export default function h4() {
    return (
        <div>
            <NavBar />
            <HeadTable headerColor='rgba(220, 200, 255, 1)' requiredString={'H4'} />
        </div>
    );
}