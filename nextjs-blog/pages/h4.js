import NavBar from "../components/navBar";
import React, { useEffect, useState } from 'react';
import HeadTable from "../components/headTable";


export default function h4() {
    return (
        <div>
            <NavBar />
            <HeadTable requiredString={'H4'} />
        </div>
    );
}