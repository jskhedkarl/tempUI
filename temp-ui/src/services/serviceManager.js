//import axios from "axios";
import {ServerAPI} from "../ServerAPI"


class ServiceManager {

    allServerHostNames() {
        return JSON.parse(new ServerAPI().allServerHostNames());
    }

    allInvaderNames() {
        return JSON.parse(new ServerAPI().allInvaderNames());
    }

    setupInventory() {
        //return JSON.parse(new ServerAPI().setupInventory());
    }

    fetchAllSystemStats() {
       // return JSON.parse(new ServerAPI().fetchAllSystemStats());
    }

    fetchAllServiceStats() {
        //return JSON.parse(new ServerAPI().fetchAllServiceStats());
    }

    fetchAllGroupNames() {
        return new ServerAPI().fetchAllGroupNames();
    }

    fetchAllHostNames() {
        return new ServerAPI().fetchAllHostNames();
    }

    fetchAllPlaybookNames() {
        return new ServerAPI().fetchAllPlaybookNames();
    }

    fetchInvetoryAll() {
        return JSON.parse(new ServerAPI().fetchInvetoryAll());
    }

    fetchCPUStats() {
        return JSON.parse(new ServerAPI().fetchCPUStats());
    }

    fetchDiskStats() {
        return JSON.parse(new ServerAPI().fetchDiskStats());
    }

    fetchMemoryStats() {
        return JSON.parse(new ServerAPI().fetchMemoryStats());
    }

    fetchEGINXStats() {
        return JSON.parse(new ServerAPI().fetchEGINXStats());
    }

    fetchVarnishStats() {
        return JSON.parse(new ServerAPI().fetchVarnishStats());
    }

    fetchIPVSStats() {
        return JSON.parse(new ServerAPI().fetchIPVSStats());
    }

    fetchPlaybooks() {
        return JSON.parse(new ServerAPI().fetchPlaybooks());
    }

    fetchGroups() {
        return JSON.parse(new ServerAPI().fetchGroups());
    }
    fetchHosts(){
        console.log(this.fetchPlaybooks())
        console.log(this.fetchInvetoryAll())
        console.log(this.fetchEGINXStats());
        return JSON.parse(new ServerAPI().fetchHosts());
    }
}
export default ServiceManager;