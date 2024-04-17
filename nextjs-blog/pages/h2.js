import NavBar from "../components/navBar";
import React, { useEffect, useState } from 'react';
import HeadTable from "../components/headTable";


export default function h2() {
    return (
        <div>
            <NavBar />
            <HeadTable requiredString={'H2'} />
        </div>
    );
}