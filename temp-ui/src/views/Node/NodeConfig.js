import React, { Component } from 'react';
import { Row, Col, Button, Label, Media, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { ServerAPI } from '../../ServerAPI';
import SummaryDataTable from './NodeSummary/SummaryDataTable';
import { customHistory } from '../../index';
import '../views.css';
import { nodeHead } from '../../consts';
import DropDown from '../../components/dropdown/DropDown';

class NodeConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleData: [],
      isoData: [],
      kernelData: [],
      typedata: [],
      nodeHead: nodeHead,
      displayModel: false,
      displayNewInterfaceModel: false,
      interfaceData: {},
      interfaceIndex:null,
      nodes: props.location.state,
      selectedType : props.location.state.length == 1 ? props.location.state[0].nodeType : '',
      selectedLinux :  props.location.state.length == 1 ? props.location.state[0].kernel : '',
      selectedIso :  props.location.state.length == 1 ? props.location.state[0].linuxISO : ''
    }
  }

  componentDidMount() {
    ServerAPI.DefaultServer().fetchAllRoles(this.retrieveRoleData, this);
    ServerAPI.DefaultServer().fetchAllIso(this.retrieveIsoData, this);
    ServerAPI.DefaultServer().fetchAllKernels(this.retrieveKernelsData, this);
    ServerAPI.DefaultServer().fetchAllSystemTypes(this.retrieveTypesData, this);
  }

  retrieveRoleData(instance, data) {
    if (!data) {
      alert("No data received");
    }
    else {
      if (Object.keys(data).length) {
        instance.setState({ roleData: data });
      }
    }
  }

  retrieveIsoData(instance, data) {
    if (!data) {
      alert("No data received");
    }
    else {
      if (Object.keys(data).length) {
        instance.setState({ isoData: data });
      }
    }
  }

  retrieveKernelsData(instance, data) {
    if (!data) {
      alert("No data received");
    }
    else {
      if (Object.keys(data).length) {
        instance.setState({ kernelData: data });
      }
    }
  }

  retrieveTypesData(instance, data) {
    if (!data) {
      alert("No data received");
    }
    else {
      if (Object.keys(data).length) {
        instance.setState({ typedata: data });
      }
    }
  }
  getRoles() {
    let rolesHtml = [];
    this.state.roleData.map((item) => (rolesHtml.push(<option>{item.label}</option>)));
    return rolesHtml;
  }

  interfaceTableHeader() {
    return (
      <div className="padTop30">
        <h3>Interfaces  <Button className="custBtn" outline color="secondary" onClick={() => (this.toggleNewModel())}> New </Button></h3>
        <Row className="headerRow" style={{ marginLeft: '0px' }}>
          <Col sm="2" className="head-name">Interface Name</Col>
          <Col sm="2" className="head-name">Admin state</Col>
          <Col sm="3" className="head-name">IP Address</Col>
          <Col sm="2" className="head-name">Remote Node Name</Col>
          <Col sm="2" className="head-name">Remote Interface</Col>
          <Col sm="1" className="head-name"></Col>
        </Row>
      </div>
    )
  }

  interfaceTableContent() {
    let rows = []
    let self = this;
    if (this.state.nodes && this.state.nodes.length) {
      this.state.nodes.map((node) => {
        let interfaces = node.allInterfaces
        if (!interfaces || !interfaces.length) {
          let row = (<Row className='headerRow1'>
            <Col sm="12" className="pad"><h5 className="text-center">Interface data not available</h5></Col>
          </Row>)
          rows.push(row)
          return rows
        }
        interfaces.map((item, rowIndex) => {
          let row1 = 'headerRow1'
          if (rowIndex % 2 === 0) {
            row1 = 'headerRow2'
          }
          if (rowIndex == interfaces.length - 1) {
            row1 = row1 + ' headerRow3 '
          }
          let row = (<Row className={row1} style={{ marginLeft: '0px' }}>

            <Col sm="2" className="pad">{item.port ? item.port : '-'}</Col>
            <Col sm="2" className="pad">{item.adminState ? item.adminState : '-'}</Col>
            <Col sm="3" className="pad">{item.IPAddress ? item.IPAddress : '-'}</Col>
            <Col sm="2" className="pad">{item.connectedTo.serverName ? item.connectedTo.serverName : '-'}</Col>
            <Col sm="2" className="pad">{item.connectedTo.serverPort ? item.connectedTo.serverPort : '-'}</Col>
            <Col sm="1" className="pad"><i className="fa fa-pencil" aria-hidden="true" onClick={() => (self.toggleModel(rowIndex))}></i></Col>

          </Row>)
          rows.push(row)
        })

      })
    }
    return rows
  }

  checkBoxClick = (e) => {
    console.log('have fun', e)
  }

  editName() {
    document.getElementById('edit').style.display = 'none';
    document.getElementById('show').style.display = 'block';
  }

  showName() {
    document.getElementById('edit').style.display = 'block';
    document.getElementById('show').style.display = 'none';
  }

  toggleModel(rowIndex) {
    let data = this.state.nodes
    let itemData = {}
    data.map((datum) => {
      datum.allInterfaces.map((interfaceItem, datumIndex) => {
        if (rowIndex === datumIndex) {
          itemData = interfaceItem
        }
      })
    })
    this.setState({ displayModel: !this.state.displayModel, interfaceData: itemData , interfaceIndex : rowIndex })
  }


  renderUpgradeModelDialog() {
    if (this.state.displayModel) {
      let data = this.state.interfaceData
      let index = this.state.interfaceIndex
      return (
        <Modal isOpen={this.state.displayModel} size="sm" centered="true" >
          <ModalHeader>Edit Interface {data.port}</ModalHeader>
          <ModalBody>
            <div className="marTop10">Name: <Input type="text" defaultValue={data.port} id="interfacePort"/></div>
            <div className="marTop10">Admin state:<Input type="text" defaultValue={data.adminState} disabled id="interfaceAdminState"/></div>
            <div className="marTop10">IP Address:<Input type="text" defaultValue={data.IPAddress} id="interfaceIpAddress"/></div>
            <div className="marTop10">Remote Node Name:<Input type="text" defaultValue={data.connectedTo.serverName} id="interfaceRemoteNodename"/></div>
            <div className="marTop10">Remote Node Interface:<Input type="text" defaultValue={data.connectedTo.serverPort} id="interfaceRemoteNodeInterface"/></div>
          </ModalBody>
          <ModalFooter>
            <Button outline color="primary" onClick={()=>(this.updateNodeCall(index))}>Update</Button>
            <Button outline color="secondary" onClick={() => (this.toggleModel())}>Cancel</Button>
          </ModalFooter>
        </Modal>
      );
    }
  }

  updateNodeCall = (interfaceIndex) => {
    let data = this.state.nodes
    data.map((datum) => {
      datum.allInterfaces.map((interfaceItem,rowIndex) => {
        if(rowIndex === interfaceIndex){
          interfaceItem.port = document.getElementById('interfacePort').value
          interfaceItem.IPAddress = document.getElementById('interfaceIpAddress').value,
          interfaceItem.connectedTo.serverName = document.getElementById('interfaceRemoteNodename').value,
          interfaceItem.connectedTo.serverPort = document.getElementById('interfaceRemoteNodeInterface').value
        }
      })
    })

    let a = { 
      nodes : data
    }

    this.setState({ displayModel: !this.state.displayModel })
   
    ServerAPI.DefaultServer().updateNode(this.callback,this,a);
    
}

callback(instance, data) {
    let a = instance.state.data
    if(!a) {
       a = []
    }
    a.push(data)
    instance.setState({data: a})
    instance.click();
}

toggleNewModel() {
    console.log('toggleNewModel inside')
    this.setState({ displayNewInterfaceModel: !this.state.displayNewInterfaceModel})
  }

  renderUpgradeNewModelDialog() {
    if (this.state.displayNewInterfaceModel) {
      return (
        <Modal isOpen={this.state.displayNewInterfaceModel} size="sm" centered="true" >
          <ModalHeader>Add Interface </ModalHeader>
          <ModalBody>
            <div className="marTop10">Name: <Input type="text" id="interfacePort"/></div>
            <div className="marTop10">Admin state:<Input type="text"  id="interfaceAdminState"/></div>
            <div className="marTop10">IP Address:<Input type="text"  id="interfaceIp"/></div>
            <div className="marTop10">Remote Node Name:<Input type="text" id="interfaceRemoteNode"/></div>
            <div className="marTop10">Remote Node Interface:<Input type="text" id="interfaceRemoteInterface"/></div>
          </ModalBody>
          <ModalFooter>
            <Button outline color="primary" onClick={()=>(this.updateNewInterfaceCall())}>Add</Button>
            <Button outline color="secondary" onClick={() => (this.toggleModel())}>Cancel</Button>
          </ModalFooter>
        </Modal>
      );
    }
  }

  updateNewInterfaceCall = () => {
    let newInterface = {
      'connectedTo' : {
        'name':document.getElementById('interfaceRemoteNode').value,
        'port':document.getElementById('interfaceRemoteInterface').value
      },
      'ip': document.getElementById('interfaceIp').value,
      'port': document.getElementById('interfacePort').value
    }
    let data = this.state.nodes
    data.map((datum) => {
      let allInterfaces = datum.allInterfaces
      if(!datum.allInterfaces || !datum.allInterfaces.length){
        datum.allInterfaces = []
      }
      datum.allInterfaces.push(newInterface)
    }) 
    
    this.setState({ displayNewInterfaceModel: !this.state.displayNewInterfaceModel })

    let a = { 
      nodes : data
    }
   
    ServerAPI.DefaultServer().updateNode(this.callback1,this,a);
    
  }

  callback1(instance, data) {
    let a = instance.state.data
    if(!a) {
       a = []
    }
    a.push(data)
    instance.setState({data: a})
    instance.click();
  }

  updateSaveNode = () => {

    let roles = this.getSelectRoleValues(document.getElementById('multiRole'))

    let data = this.state.nodes
    data.map((datum) => {
        datum.roles = roles,
        datum.nodeType = this.state.selectedType,
        datum.linuxIso = this.state.selectedIso,
        datum.kernel = this.state.selectedLinux
        let a = { 
          nodes : [datum]
        }
        ServerAPI.DefaultServer().updateNode(this.callback2,this,a);
    })

  }

  getSelectRoleValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;
  
    for (var i=0, iLen=options.length; i<iLen; i++) {
      opt = options[i];
  
      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
}

  callback2(instance, data) {
    let a = instance.state.data
    if(!a) {
       a = []
    }
    a.push(data)
    instance.setState({data: a})
    instance.click();
  }

  getSelectedData= (data,identity) => {
    if(identity == 'Type') {
      this.setState({ selectedType : data })
    
    }
    if(identity == 'Linux') {
      this.setState({ selectedLinux : data })
    
    }
    if(identity == 'ISO') {
      this.setState({ selectedIso : data })
      
    }
  }


  render() {
    let { nodes } = this.state
    if (!nodes || !nodes.length) {
      return <div></div>
    }
    let isSingleNode = this.state.nodes.length === 1 ? true : false
    let nodeNameDiv = null
    let interfaceTableHeader = null
    let interfaceTableContent = null
    let summaryDataTable = null
   
    if (isSingleNode) {
      nodeNameDiv =
        <div>
          <Media className="edit" id="edit">
            <Media left>
              {this.state.nodes.map((nodeItem) => nodeItem.name)}
            </Media>
            <Media right onClick={this.editName} className="marLeft10">
              <i className="fa fa-pencil" aria-hidden="true" ></i>
            </Media>
          </Media>
          <Media className="show" id="show">
            <Row>
              <Col onClick={this.showName} className="sm-1">
                <i className="fa fa-arrow-left" aria-hidden="true" ></i>
              </Col>
              <Col className="sm-11">
                <input type="text" className="form-control wid" name="name" value={this.state.nodes.map((nodeItem) => nodeItem.name)} />
              </Col>
            </Row>
          </Media>
          <h6 className="srNo"><small>Sr. No.  </small> {this.state.nodes.map((nodeItem) => nodeItem.serialNumber)}</h6>
        </div>
      interfaceTableHeader = this.interfaceTableHeader()
      interfaceTableContent = this.interfaceTableContent()


    } else {
      let selectedRowIndexes = []
      this.state.nodes.map(function (node, i) {
        selectedRowIndexes.push(i)
      })
      summaryDataTable = <SummaryDataTable data={this.state.nodes} heading={this.state.nodeHead} selectedRowIndexes={selectedRowIndexes} checkBoxClick={this.checkBoxClick} />
    }
    return (
      <div className="animated fadeIn">
        <Media>
          <Media left >
            {nodeNameDiv}
          </Media>
          <Media body></Media>
          <Media right>
            <Button className="custBtn" outline color="secondary" onClick={() => { customHistory.goBack() }}> Cancel </Button>
            <Button className="custBtn" outline color="secondary" > Provision </Button>
            <Button className="custBtn" outline color="secondary" onClick={()=>(this.updateSaveNode())}> Save </Button>
          </Media>
        </Media>
        <div className="boxBorder">
          <Row className="pad">

            <Col xs='3' ><Label>Roles</Label><br />
              <select multiple className="form-control" id="multiRole" defaultValue={this.state.nodes[0].roles}>{this.getRoles()}</select>
            </Col>
            <Col xs='3' ><Label>Type</Label><br />
              <DropDown options={this.state.typedata} getSelectedData={this.getSelectedData} identity={"Type"} default={this.state.selectedType}/>
            </Col>
            <Col xs='3' ><Label>Linux</Label><br />
              <DropDown options={this.state.kernelData} getSelectedData={this.getSelectedData} identity={"Linux"} default={ this.state.selectedLinux }/>
            </Col>
            <Col xs='3' ><Label>Base Linux ISO</Label><br />
              <DropDown options={this.state.isoData} getSelectedData={this.getSelectedData} identity={"ISO"} default={ this.state.selectedIso }/>
            </Col>
          </Row>
          {/* {this.confDropdown()} */}
        </div>
        {interfaceTableHeader}
        {interfaceTableContent}
        <div className="padTop20">
          {summaryDataTable}
        </div>
        {this.renderUpgradeModelDialog()}
        {this.renderUpgradeNewModelDialog()}

      </div>

    )
  }
}

export default NodeConfig;
