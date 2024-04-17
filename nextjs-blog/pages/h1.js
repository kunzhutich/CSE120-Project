import React, { useEffect, useState } from 'react';
import NavBar from "../components/navBar";
import HeadTable from "../components/headTable";


export default function h1() {
    return (
        <div>
            <NavBar/>
            <HeadTable requiredString={'H1'}/>
        </div>
    );
}