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
                    <HFSTable requiredString={'H1'} />
                    <HFSTable requiredString={'H2'} />
                    <HFSTable requiredString={'H3'} />
                    <HFSTable requiredString={'H4'} />
                    <HFSTable requiredString={'H5'} />
                </div>
            </div>
        </div>
    );
}