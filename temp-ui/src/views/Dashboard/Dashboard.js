import React, { Component } from 'react';
import { ServerAPI } from '../../ServerAPI';
 

class Dashboard extends Component {

    constructor() {
        super();
        
        this.state = {
            inventoryReady : false,
        };
    }
    
    componentDidMount() {
        //let server = ServerAPI.DefaultServer();
        //server.setupInventory(this.inventoryCallback, this);
    }
    
    inventoryCallback(instance) {
        //console.log("DONE..");
        //instance.setState({
        //    inventoryReady : true,
        //});
    }
    
    renderInventoryComplete() {
        if (this.state.inventoryReady) {
            return (
                <div> .. </div>
            );
        }
        return (
          <div> . </div>  
        );
    }

  render() {
    return (
      <div className="animated fadeIn">
        {this.renderInventoryComplete()}
      </div>
    )
  }
}

export default Dashboard;
