import NavBar from "../components/navBar";
// import UNorderstable from "../components/unTable";
import HeadTable from "../components/headTable";


export default function un() {
    return (
        <div>
            <NavBar/>
            <HeadTable headerColor='rgba(101, 176, 193, 0.5)' requiredString={'UN'}/>
        </div>
    );
}