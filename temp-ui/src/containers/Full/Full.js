import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import Inventory from '../../views/Operation/Inventory/Inventory';
import Monitor from '../../views/Operation/Monitor/Monitor';
import Playbook from '../../views/Operation/Playbook/Playbook';
import Summary from '../../views/Node/Summary/Summary';
import Roles from '../../views/Node/Roles/Roles';
import Types from '../../views/Node/Types/Types';
import LinuxKernel from '../../views/Node/LinuxKernel/LinuxKernel';
import BaseLinuxIso from '../../views/Node/BaseLinuxIso/BaseLinuxIso';
import BmcMonitor from '../../views/Node/BmcMonitor/BmcMonitor';
import ConnectivitySummary from '../../views/Connectivity/ConnectivitySummary/Summary';
import TileApp from '../../views/Connectivity/TilesApp/TilesApp';


class Full extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        <Breadcrumb />
                        <Container fluid>
                            <Switch>
                                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                                <Route path="/node/Summary" name="Summary" component={Summary}/>
                                <Route path="/node/Roles" name="Roles" component={Roles}/>
                                <Route path="/node/Types" name="Types" component={Types}/>
                                <Route path="/node/Linuxkernel" name="Linux Kernel" component={LinuxKernel}/>
                                <Route path="/node/BaseLinuxIso" name="Base Linux ISO" component={BaseLinuxIso}/>
                                <Route path="/node/BmcMonitor" name="Summary" component={BmcMonitor}/>
                                <Route path="/connectivity/Summary" name="Summary" component={ConnectivitySummary}/>
                                <Route path="/connectivity/TilesApp" name="Tiles-App" component={TileApp}/>
                                <Route path="/operation/inventory" name="Inventory" component={Inventory}/>
                                <Route path="/operation/playbook" name="Playbook" component={Playbook}/>
                                <Route path="/operation/monitor" name="Monitor" component={Monitor}/>
                                <Redirect from="/" to="/dashboard"/>
                            </Switch>
                        </Container>
                    </main>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Full;
