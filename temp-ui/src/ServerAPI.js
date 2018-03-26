export class StatsEginx {
    constructor(activeConnection, totalConnection, totalHandledConnection, totalRequests, requestsPerConnection, reading, writing, waiting) {
        this.activeConnection = activeConnection;
        this.totalConnection = totalConnection;
        this.totalHandledConnection = totalHandledConnection;
        this.totalRequests = totalRequests;
        this.requestsPerConnection = requestsPerConnection;
        this.reading = reading;
        this.writing = writing;
        this.waiting = waiting;
    }
    
    
    static SimulateObj() {
        let activeConnection = Math.floor((Math.random() * 100) + 1);
        let totalConnection = Math.floor((Math.random() * 100000) + 1);
        let totalHandledConnection = Math.floor((Math.random() * 100000) + 1);
        let totalRequests = totalConnection + totalHandledConnection;
        return new StatsEginx(activeConnection, totalConnection, totalHandledConnection, totalRequests, 0, 0, 0, 0);
    }
}


class StatsVarnish {
    constructor(clientRequests, cacheHits, cacheMisses) {
        this.clientRequests = clientRequests;
        this.cacheHits = cacheHits;
        this.cacheMisses = cacheMisses;
    }
    
    static SimulateObj() {
        let cacheHits = Math.floor((Math.random() * 100000) + 1);
        let cacheMisses = Math.floor((Math.random() * 100) + 1);
        let clientRequests = cacheHits + cacheMisses;
        return this(clientRequests, cacheHits, cacheMisses);
    }
}


//DONE
export class StatsCPU {
    constructor(user, nice, system, idle, iowait, irq) {
       //console.log(cpuStatsDict)
       // let cpuAllStats = cpuStatsDict["cpu_all"];
        this.user = user
        this.nice = nice
        this.system = system
        this.idle = idle
        this.iowait = iowait
        this.irq = irq        
    }
    static SimulateObj() {
        let a = Math.floor((Math.random() * 5) + 1);
        let user = Math.floor((Math.random() * 10) + 1) * a;
        let nice = Math.floor((Math.random() * 10) + 1) * a;
        let system = Math.floor((Math.random() * 10) + 1) * a;
        let iowait = Math.floor((Math.random() * 7) + 1);
        let idle = 100 - user - nice - system - iowait - iowait;
        let irq = 0;
        return new StatsCPU(user, nice, system, idle, iowait, irq);
    }
}

//DONE
export class StatsMemory {
    constructor(total, free, available) {
        this.total = total;
        this.free = free;
        this.available = available;
    }
    static SimulateObj() {
        let total = 16464124;
        let freePercent = Math.floor((Math.random() * 10) + 1) * (30 - 10) + 10;
        let free = total * freePercent / 100;
        let available = 15614996;
        return new StatsMemory(total, free, available);
    }
}

export class StatsDisk {
    constructor(dName, readIOs, readSectors, writeIOs, writeSectors, ticksIO) {
        this.dName = dName;
        this.readIOs = readIOs;
        this.readSectors = readSectors;
        this.writeIOs = writeIOs;
        this.writeSectors = writeSectors;
        this.ticksIO = ticksIO;
    }
    static SimulateObj() {
        let dName = "sda1";
        let readIOs = Math.floor((Math.random() * 15) + 1);
        let readSectors = Math.floor((Math.random() * 85) + 5);
        let writeIOs = Math.floor((Math.random() * 27) + 3);
        let writeSectors = 1188568;
        let ticksIO =  Math.floor((Math.random() * 24) - 2);
        return new StatsDisk(dName, readIOs, readSectors, writeIOs, writeSectors, ticksIO);
    }
}

// Old Code Backup
//  class StatsDisk {
//     constructor(dName, readIOs, readSectors, writeIOs, writeSectors, ticksIO) {
//         this.dName = dName;
//         this.readIOs = readIOs;
//         this.readSectors = readSectors;
//         this.writeIOs = writeIOs;
//         this.writeSectors = writeSectors;
//         this.ticksIO = ticksIO;
//     }
//     static SimulateObj() {
//         let dName = "sda1";
//         let readIOs = 15806;
//         let readSectors = 853546;
//         let writeIOs = 27781;
//         let writeSectors = 1188568;
//         let ticksIO = 24448;
//         return this(dName, readIOs, readSectors, writeIOs, writeSectors, ticksIO);
//     }
// }


class StatsIPVS {
    constructor(connections, inPackets, outPackets, inBytes, outBytes) {
        this.connections = connections;
        this.inPackets = inPackets;
        this.outPackets = outPackets;
        this.inBytes = inBytes;
        this.outBytes = outBytes;
    }
    static SimulateObj() {
        
    }
}


class Service {
    constructor(sName, sPort, sType, sProtocol, vIP) {
        
    }
    static SimulateObj() {
    }
}


class AnsibleVariable {
    constructor(key, value, vType) {
        this.key = key;
        this.value = value;
    }
    
}
AnsibleVariable.HOST_VARIABLE = 10;
AnsibleVariable.GROUP_VARIABLE = 5;
AnsibleVariable.SYS_VARIABLE = 1


class Host {
    constructor(hName, hType) {
        this.hName = hName;
        this.IPAddress = "";
        this.invaderPort = "";
        this.type = hType;
        this.variables = {};
    }
    
    static SimulateObj() {
    }
    
    addService(service) {
        
    }
    
    addVariable(key, value) {
        this.variables[key] = value;
    }
    
    setupVariable(variableDict) {
        for (let key in variableDict) {
            let val = variableDict[key];
            if (key === "ansible_host")
                this.IPAddress = val;
            else if (key === "inv_port")
                this.invaderPort = val;
            else
                this.addVariable(key, val);
        }
    }
}

Host.KEY = "host";
Host.OTHER = 0;
Host.INVADER = 1;
Host.SERVER = 5;



class Group {
    constructor(gName, gType) {
        this.gName = gName;
        this.gType = gType;
        this.hosts = [];
        this.variables = {};
    }
    
    addVariable(key, value) {
        this.variables[key] = value;
    }

    setupVariable(variableDict) {
        for (let key in variableDict) {
            let val = variableDict[key];
            this.addVariable(key, val);
        }
    }
}

Group.KEY = "group";
Group.INVADER_KEY = "clients";
Group.SERVER_KEY = "servers";
Group.VARIABLES = "vars";


function simulateAllStats() {
    
}


let allGroups = {};
let allHosts = {};


export class ServerAPI {
    constructor() {
        this.allGroups = new Object();
        this.allHosts = new Object();
        this.setupInventory();
    }
    
    static DefaultServer() {
        return defaultAPIServer;
    }
    
    fetchHosts() {
        return '{"hosts":["127.0.0.1","inv7","sr3","sr2"]}';
    }
    allServerHostNames() {
        let grp = this.allGroups[Group.SERVER_KEY];
        return grp.hosts;
    }

    allInvaderNames() {
        let grp = this.allGroups[Group.INVADER_KEY];
        return grp.hosts;
    }

    setupInventory() {
        // Below we are going to replace hardcoded string to fetch from server.
        this.allGroups = new Object();
        this.allHosts = new Object();
        let invaderHosts = [];
        let serverHosts = [];
        let jsonString = this.fetchInvetoryAll();
        let jsonObj = JSON.parse(jsonString);
        let inventoryAll = jsonObj["all"];
        let allHostDict = inventoryAll[Host.KEY];
        let inventoryGroups = inventoryAll[Group.KEY];

        for (let groupName in inventoryGroups) {
            let groupDict = inventoryGroups[groupName];
            let hostType = Host.OTHER;
            if (groupName === Group.INVADER_KEY)
                hostType = Host.INVADER;
            else if (groupName === Group.SERVER_KEY)
                hostType = Host.SERVER;

            let grp = new Group(groupName, hostType);
            let grpHostsArray = groupDict["hosts"];
            if (grpHostsArray !== undefined) {
                for (let hIndex in grpHostsArray) {
                    let hostName = grpHostsArray[hIndex];
                    let host = this.allHosts[hostName];
                    if (host === undefined) {
                        host = new Host(hostName, hostType);
                        let hostDict = allHostDict[hostName];
                        if (hostDict !== undefined) {
                            let hostVars = hostDict["vars"];
                            host.setupVariable(hostVars);
                        }
                        this.allHosts[hostName] = host;
                    } else if (hostType > Host.OTHER) {
                        if (host.type == Host.OTHER)
                            host.type = hostType;
                        else
                            console.log("ERROR :: Host :: " + hostName + " :: belongs to both 'Server' and 'Invader' Groups");
                    }
                    grp.hosts.push(hostName);
                }
            }

            let grpVars = groupDict[Group.VARIABLES];
            grp.setupVariable(grpVars);

            this.allGroups[groupName] = grp;
        }
    }

    fetchAllSystemStats() {
        let jsonCPUString = this.fetchCPUStats();
        let jsonDiskString = this.fetchDiskStats();
        let jsonMemoryString = this.fetchMemoryStats();

        let cpuStatsObj = JSON.parse(jsonCPUString);
        let diskStatsObj = JSON.parse(jsonDiskString);
        let memStatsObj = JSON.parse(jsonMemoryString);

        let a = "";
    }

    fetchAllServiceStats() {
        let jsonEGINXString = this.fetchEGINXStats();
        let jsonVarnishString = this.fetchVarnishStats();
        let jsonIPVSString = this.fetchIPVSStats();
    }

    fetchAllGroupNames() {
        let jsonStr = this.fetchGroups();
        let jsonObj = JSON.parse(jsonStr);
        return jsonObj["groups"];
    }

    fetchAllHostNames() {
        let jsonStr = this.fetchHosts();
        let jsonObj = JSON.parse(jsonStr);
        return jsonObj["hosts"];
    }

    fetchAllPlaybookNames() {
        let jsonStr = this.fetchPlaybooks();
        let jsonObj = JSON.parse(jsonStr);
        return jsonObj["playbooks"];
    }

    fetchInvetoryAll() {
        return '{"all":{"group":{"all":{"client_ip":"10.10.30.110","containers":4,"vip":"4.3.2.1"},"clients":{"hosts":["inv7"]},"inv":{"hosts":["127.0.0.1"],"vars":{"ansible_connection":"local","check_digest":"0ac91d27021904d30dbafce186223c81","check_url":"/","keepalived_conf":"/etc/keepalived/keepalived.conf","keepalived_daemon":"/usr/sbin/keepalived","lb_intfs":"eth-14-1 eth-16-1","script_inv":"/home/ansible/ipvs_inv.sh"}},"servers":{"hosts":["sr3","sr2"]}},"host":{"127.0.0.1":{"vars":{}},"inv7":{"vars":{}},"sr2":{"vars":{"ansible_host":"192.168.101.222","inv_port":"eth-14-1","main_intf":"enp130s0","server_num":1,"ssl_engine":"nginx"}},"sr3":{"vars":{"ansible_host":"192.168.101.223","inv_port":"eth-16-1","main_intf":"enp130s0","server_num":2,"ssl_engine":"hitch"}}}}}';
    }

    fetchCPUStats() {
        return '{"inv2":{"cpu_all":{"id":"cpu","user":720493,"nice":0,"system":193706,"idle":281232312,"iowait":2204,"irq":0,"softirq":305516,"steal":0,"guest":0,"guest_nice":0},"cpus":[{"id":"cpu0","user":212496,"nice":0,"system":51767,"idle":34979935,"iowait":1625,"irq":0,"softirq":60984,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu1","user":82107,"nice":0,"system":23029,"idle":35166237,"iowait":346,"irq":0,"softirq":35078,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu2","user":82484,"nice":0,"system":21236,"idle":35168259,"iowait":132,"irq":0,"softirq":34678,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu3","user":76214,"nice":0,"system":20793,"idle":35174223,"iowait":38,"irq":0,"softirq":35512,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu4","user":70971,"nice":0,"system":19936,"idle":35181043,"iowait":18,"irq":0,"softirq":34804,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu5","user":61940,"nice":0,"system":18894,"idle":35190912,"iowait":17,"irq":0,"softirq":35000,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu6","user":69994,"nice":0,"system":19524,"idle":35182745,"iowait":12,"irq":0,"softirq":34482,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu7","user":64283,"nice":0,"system":18524,"idle":35188954,"iowait":14,"irq":0,"softirq":34974,"steal":0,"guest":0,"guest_nice":0}],"intr":1602162025,"ctxt":878408125,"btime":"2018-03-15T11:41:44-07:00","processes":329682,"procs_running":2,"procs_blocked":0},"sr2":{"cpu_all":{"id":"cpu","user":172163,"nice":0,"system":96379,"idle":10776440,"iowait":14326,"irq":0,"softirq":79093,"steal":0,"guest":0,"guest_nice":0},"cpus":[{"id":"cpu0","user":2771,"nice":0,"system":2973,"idle":457666,"iowait":1050,"irq":0,"softirq":2484,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu1","user":9402,"nice":0,"system":4393,"idle":450964,"iowait":583,"irq":0,"softirq":494,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu2","user":4949,"nice":0,"system":3056,"idle":457220,"iowait":465,"irq":0,"softirq":150,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu3","user":3110,"nice":0,"system":3050,"idle":459030,"iowait":516,"irq":0,"softirq":154,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu4","user":2612,"nice":0,"system":2822,"idle":459980,"iowait":380,"irq":0,"softirq":128,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu5","user":2654,"nice":0,"system":2675,"idle":460217,"iowait":321,"irq":0,"softirq":99,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu6","user":11490,"nice":0,"system":4656,"idle":438628,"iowait":393,"irq":0,"softirq":6856,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu7","user":7887,"nice":0,"system":4683,"idle":445640,"iowait":658,"irq":0,"softirq":4136,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu8","user":8651,"nice":0,"system":4699,"idle":441134,"iowait":507,"irq":0,"softirq":6833,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu9","user":8896,"nice":0,"system":4146,"idle":441758,"iowait":476,"irq":0,"softirq":6558,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu10","user":6774,"nice":0,"system":4200,"idle":446551,"iowait":677,"irq":0,"softirq":4490,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu11","user":9544,"nice":0,"system":4622,"idle":440090,"iowait":709,"irq":0,"softirq":7214,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu12","user":2296,"nice":0,"system":2652,"idle":460459,"iowait":355,"irq":0,"softirq":81,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu13","user":24763,"nice":0,"system":8563,"idle":429689,"iowait":1611,"irq":0,"softirq":1228,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu14","user":4542,"nice":0,"system":3425,"idle":457114,"iowait":647,"irq":0,"softirq":166,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu15","user":2515,"nice":0,"system":2837,"idle":460075,"iowait":379,"irq":0,"softirq":86,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu16","user":2742,"nice":0,"system":2806,"idle":459740,"iowait":563,"irq":0,"softirq":102,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu17","user":2576,"nice":0,"system":2759,"idle":460241,"iowait":270,"irq":0,"softirq":101,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu18","user":10505,"nice":0,"system":4279,"idle":441885,"iowait":522,"irq":0,"softirq":5228,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu19","user":9614,"nice":0,"system":4352,"idle":441509,"iowait":523,"irq":0,"softirq":6190,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu20","user":9561,"nice":0,"system":4744,"idle":441353,"iowait":838,"irq":0,"softirq":5909,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu21","user":6738,"nice":0,"system":4000,"idle":444704,"iowait":659,"irq":0,"softirq":5894,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu22","user":8372,"nice":0,"system":4596,"idle":443565,"iowait":623,"irq":0,"softirq":5231,"steal":0,"guest":0,"guest_nice":0},{"id":"cpu23","user":9190,"nice":0,"system":5382,"idle":437218,"iowait":591,"irq":0,"softirq":9270,"steal":0,"guest":0,"guest_nice":0}],"intr":134144739,"ctxt":63361338,"btime":"2018-03-19T12:28:26-07:00","processes":10306,"procs_running":2,"procs_blocked":0},"sr3":{"cpu_all":{"id":"","user":0,"nice":0,"system":0,"idle":0,"iowait":0,"irq":0,"softirq":0,"steal":0,"guest":0,"guest_nice":0},"cpus":null,"intr":0,"ctxt":0,"btime":"0001-01-01T00:00:00Z","processes":0,"procs_running":0,"procs_blocked":0}}';
    }

    fetchDiskStats() {
        return '{"inv2":[{"major":7,"minor":0,"name":"loop0","read_ios":0,"read_merges":0,"read_sectors":0,"read_ticks":0,"write_ios":0,"write_merges":0,"write_sectors":0,"write_ticks":0,"in_flight":0,"io_ticks":0,"time_in_queue":0},{"major":7,"minor":1,"name":"loop1","read_ios":0,"read_merges":0,"read_sectors":0,"read_ticks":0,"write_ios":0,"write_merges":0,"write_sectors":0,"write_ticks":0,"in_flight":0,"io_ticks":0,"time_in_queue":0},{"major":7,"minor":2,"name":"loop2","read_ios":0,"read_merges":0,"read_sectors":0,"read_ticks":0,"write_ios":0,"write_merges":0,"write_sectors":0,"write_ticks":0,"in_flight":0,"io_ticks":0,"time_in_queue":0},{"major":7,"minor":3,"name":"loop3","read_ios":0,"read_merges":0,"read_sectors":0,"read_ticks":0,"write_ios":0,"write_merges":0,"write_sectors":0,"write_ticks":0,"in_flight":0,"io_ticks":0,"time_in_queue":0},{"major":7,"minor":4,"name":"loop4","read_ios":0,"read_merges":0,"read_sectors":0,"read_ticks":0,"write_ios":0,"write_merges":0,"write_sectors":0,"write_ticks":0,"in_flight":0,"io_ticks":0,"time_in_queue":0},{"major":7,"minor":5,"name":"loop5","read_ios":0,"read_merges":0,"read_sectors":0,"read_ticks":0,"write_ios":0,"write_merges":0,"write_sectors":0,"write_ticks":0,"in_flight":0,"io_ticks":0,"time_in_queue":0},{"major":7,"minor":6,"name":"loop6","read_ios":0,"read_merges":0,"read_sectors":0,"read_ticks":0,"write_ios":0,"write_merges":0,"write_sectors":0,"write_ticks":0,"in_flight":0,"io_ticks":0,"time_in_queue":0},{"major":7,"minor":7,"name":"loop7","read_ios":0,"read_merges":0,"read_sectors":0,"read_ticks":0,"write_ios":0,"write_merges":0,"write_sectors":0,"write_ticks":0,"in_flight":0,"io_ticks":0,"time_in_queue":0},{"major":8,"minor":0,"name":"sda","read_ios":16103,"read_merges":163,"read_sectors":858184,"read_ticks":13432,"write_ios":27806,"write_merges":80984,"write_sectors":1188568,"write_ticks":54144,"in_flight":0,"io_ticks":24492,"time_in_queue":67556},{"major":8,"minor":1,"name":"sda1","read_ios":15806,"read_merges":163,"read_sectors":853546,"read_ticks":13296,"write_ios":27781,"write_merges":80984,"write_sectors":1188568,"write_ticks":54124,"in_flight":0,"io_ticks":24448,"time_in_queue":67400},{"major":8,"minor":2,"name":"sda2","read_ios":31,"read_merges":0,"read_sectors":62,"read_ticks":8,"write_ios":0,"write_merges":0,"write_sectors":0,"write_ticks":0,"in_flight":0,"io_ticks":8,"time_in_queue":8},{"major":8,"minor":5,"name":"sda5","read_ios":157,"read_merges":0,"read_sectors":2824,"read_ticks":76,"write_ios":0,"write_merges":0,"write_sectors":0,"write_ticks":0,"in_flight":0,"io_ticks":52,"time_in_queue":76}]}';
    }

    fetchMemoryStats() {
        return '{"inv2":{"mem_total":16464124,"mem_free":15180960,"mem_available":15614996,"buffers":84460,"cached":856396,"swap_cached":0,"active":559036,"inactive":562992,"active_anon":224052,"inactive_anon":335928,"active_file":334984,"inactive_file":227064,"unevictable":0,"mlocked":0,"swap_total":5105660,"swap_free":5105660,"dirty":0,"write_back":0,"anon_pages":181288,"mapped":397016,"shmem":378812,"slab":79268,"s_reclaimable":51168,"s_unclaim":28100,"kernel_stack":4448,"page_tables":7548,"nfs_unstable":0,"bounce":0,"writeback_tmp":0,"commit_limit":13337720,"committed_as":10151596,"vmalloc_total":34359738367,"vmalloc_used":0,"vmalloc_chunk":0,"hardware_corrupted":0,"anon_huge_pages":0,"huge_pages_total":0,"huge_pages_free":0,"huge_pages_rsvd":0,"huge_pages_surp":0,"hugepagesize":2048,"direct_map_4k":96000,"direct_map_2M":4081664,"direct_map_1G":14680064},"sr2":{"mem_total":16398104,"mem_free":14543220,"mem_available":14869020,"buffers":28824,"cached":564608,"swap_cached":0,"active":582284,"inactive":408972,"active_anon":398356,"inactive_anon":9024,"active_file":183928,"inactive_file":399948,"unevictable":84,"mlocked":84,"swap_total":33479676,"swap_free":33479676,"dirty":10468,"write_back":10188,"anon_pages":398252,"mapped":252916,"shmem":9468,"slab":258312,"s_reclaimable":59020,"s_unclaim":199292,"kernel_stack":63712,"page_tables":6460,"nfs_unstable":0,"bounce":0,"writeback_tmp":0,"commit_limit":41678728,"committed_as":1650980,"vmalloc_total":34359738367,"vmalloc_used":0,"vmalloc_chunk":0,"hardware_corrupted":0,"anon_huge_pages":0,"huge_pages_total":0,"huge_pages_free":0,"huge_pages_rsvd":0,"huge_pages_surp":0,"hugepagesize":2048,"direct_map_4k":250952,"direct_map_2M":6004736,"direct_map_1G":12582912},"sr3":{"mem_total":0,"mem_free":0,"mem_available":0,"buffers":0,"cached":0,"swap_cached":0,"active":0,"inactive":0,"active_anon":0,"inactive_anon":0,"active_file":0,"inactive_file":0,"unevictable":0,"mlocked":0,"swap_total":0,"swap_free":0,"dirty":0,"write_back":0,"anon_pages":0,"mapped":0,"shmem":0,"slab":0,"s_reclaimable":0,"s_unclaim":0,"kernel_stack":0,"page_tables":0,"nfs_unstable":0,"bounce":0,"writeback_tmp":0,"commit_limit":0,"committed_as":0,"vmalloc_total":0,"vmalloc_used":0,"vmalloc_chunk":0,"hardware_corrupted":0,"anon_huge_pages":0,"huge_pages_total":0,"huge_pages_free":0,"huge_pages_rsvd":0,"huge_pages_surp":0,"hugepagesize":0,"direct_map_4k":0,"direct_map_2M":0,"direct_map_1G":0}}';
    }

    fetchEGINXStats() {
        return '{"sr2":[{"serviceId":"varnish1","ActiveConnections":0,"TotalConnections":464039,"TotalHandledConnections":452205,"TotalRequests":1298410,"RequestsPerConnection":"\\u0002","Reading":0,"Writing":1,"Waiting":0}]}';
    }

    fetchVarnishStats() {
        return '{"sr2":[{"serviceId":"varnish1","stats":[{"id":"clientRequests","value":6933853},{"id":"cacheHits","value":6933850},{"id":"cacheMisses","value":3}]}]}';
    }

    fetchIPVSStats() {
        return '[{"protocol":"TCP","virtualIp":"4.3.2.1","port":"80","serviceType":"varnish","stats":{"connections":"0","inPackets":"0","outPackets":"0","inBytes":"0","outBytes":"0"},"servers":[{"realIp":"10.14.1.1","port":"80","serverName":"sr2","serviceId":"1","stats":{"connections":"0","inPackets":"0","outPackets":"0","inBytes":"0","outBytes":"0"}}]},{"protocol":"TCP","virtualIp":"4.3.2.1","port":"443","serviceType":"nginx","stats":{"connections":"0","inPackets":"0","outPackets":"0","inBytes":"0","outBytes":"0"},"servers":[{"realIp":"10.14.1.1","port":"443","serverName":"sr2","serviceId":"1","stats":{"connections":"0","inPackets":"0","outPackets":"0","inBytes":"0","outBytes":"0"}}]}]';
    }

    fetchPlaybooks() {
        return '{"playbooks":["adjust_containers.yml","install-docker.yml","install-ipvs.yml","ping.yml","uninstall-ipvs.yml"]}';
    }

    fetchGroups() {
        return '{"groups":["servers","inv","clients"]}';
    }

}

let defaultAPIServer = new ServerAPI();

