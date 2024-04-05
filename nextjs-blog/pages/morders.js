import React, { useEffect, useState } from 'react';
import NavBar from "../components/navBar";
import MordersTable from "../components/mordersTable";

export default function morders(){
    return (
        <div>
            <NavBar/>
            <MordersTable/>
        </div>
    );
}