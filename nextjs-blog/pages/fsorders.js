import NavBar from "../components/navBar";
import FSTable from "../components/fsOrderTables";
import HFSTable from "../components/hFSTables";

export default function fsorders() {
    return (
        <div>
            <NavBar/>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{position: 'sticky', top: 65, left: 0}}>
                    <FSTable/>
                </div>
                <div>
                    <HFSTable/>
                    <HFSTable/>
                    <HFSTable/>
                    <HFSTable/>
                    <HFSTable/>
                </div>
            </div>
        </div>
    );
}