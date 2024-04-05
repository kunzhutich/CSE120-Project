import NavBar from "../components/navBar";
import FSTables from "../components/fsOrderTables";
import HeadTable from "../components/headTable";

export default function fsorders() {
    return (
        <div>
            <NavBar/>
            <div syle={{display: 'grid'}}>
                <div style={{float: 'left'}}>
                    <FSTables/>
                </div>
                <div>
                    <HeadTable/>
                </div>
                <div>
                    <HeadTable/>
                </div>
            </div>
        </div>
    );
}