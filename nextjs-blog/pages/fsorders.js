import NavBar from "../components/navBar";
import FSTable from "../components/fsOrderTables";
import HFSTable from "../components/hFSTables";

export default function fsorders() {
    return (
        <div>
            <NavBar/>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{position: 'sticky', top: 65, float: '0'}}>
                    <FSTable/>
                </div>
                <div>
                    <HFSTable headerColor='rgba(108, 193, 101)'  requiredString={'H1'} />
                    <HFSTable headerColor='rgba(135, 206, 250, 1)' requiredString={'H2'} />
                    <HFSTable headerColor='rgba(255, 182, 193, 1)' requiredString={'H3'} />
                    <HFSTable headerColor='rgba(220, 200, 255, 1)' requiredString={'H4'} />
                    <HFSTable headerColor='rgba(210, 180, 140, 1)' requiredString={'H5'} />
                    <HFSTable headerColor='rgba(101, 176, 193, 0.5)' requiredString={'UN'}/>
                </div>
            </div>
        </div>
    );
}