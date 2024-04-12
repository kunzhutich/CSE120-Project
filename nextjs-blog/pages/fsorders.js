import NavBar from "../components/navBar";
import FSTable from "../components/fsOrderTables";
import HFSTable from "../components/hFSTables";

export default function fsorders() {
    return (
        <div style={{display: 'grid', gridTemplateColumns: 'auto 2fr'}}>
            <NavBar/>
            <div style={{position: 'sticky'}}>
                <FSTable/>
            </div>
            <div style={{paddingTop: 9}}>
                <HFSTable/>
                <HFSTable/>
                <HFSTable/>
                <HFSTable/>
                <HFSTable/>
            </div>
        </div>
    );
}