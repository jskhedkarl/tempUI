import React, { Component } from 'react';
import { Row, Col, Button, Label, Media, Modal, ModalHeader, ModalBody, ModalFooter, Input, Alert } from 'reactstrap';
import { ServerAPI } from '../../ServerAPI';
import SummaryDataTable from './NodeSummary/SummaryDataTable';
import { customHistory } from '../../index';
import '../views.css';
import { nodeHead } from '../../consts';
import DropDown from '../../components/dropdown/DropDown';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import MultiselectDropDown from '../../components/MultiselectDropdown/MultiselectDropDown';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


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
      interfaceIndex: null,
      nodes: props.location.state,
      selectedRowIndexes: [], 
      selectedType: props.location.state.length == 1 ? props.location.state[0].nodeType : '',
      selectedLinux: props.location.state.length == 1 ? props.location.state[0].kernel : '',
      selectedIso: props.location.state.length == 1 ? props.location.state[0].linuxISO : '',
      selectedRoles: props.location.state.length == 1 ? props.location.state[0].roles : '',
      displayProvisionModel: false,
      visible: false,
      visibleIp: false,
      showAlert: '',
      wipeBtn: true,
      rebootBtn: true,
      interfaces:props.location.state.allInterfaces

    }
    this.counter = 0
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
        <Media>
          <Media left>
            <h5>Interfaces</h5>
          </Media>
          <Media body>
          </Media>
          <Media right>
            <Button className="custBtn" outline color="secondary" onClick={() => (this.toggleNewModel())}> New </Button>
            <Button className="custBtn" outline color="secondary" onClick={() => (this.deleteInterface())}> Delete </Button>
          </Media>
        </Media>  
        <Row className="headerRow" style={{ marginLeft: '0px', marginRight: '0px' }}>
          <Col sm="1" className="head-name"></Col>
          <Col sm="2" className="head-name">Interface Name</Col>
          <Col sm="2" className="head-name">Admin state</Col>
          <Col sm="2" className="head-name">IP Address</Col>
          <Col sm="2" className="head-name">Remote Node Name</Col>
          <Col sm="2" className="head-name">Remote Interface</Col>
          <Col sm="1" className="head-name">edit</Col>
        </Row>
      </div>
    )
  }

  interfaceTableContent() {
    let rows = []
    let self = this
    if (this.state.nodes && this.state.nodes.length) {
      this.state.nodes.map((node) => {
        let interfaces = node.allInterfaces
        if (!interfaces || !interfaces.length) {
          let row = (<Row className='headerRow1' style={{ marginLeft: '0px', marginRight: '0px' }}>
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
          
          let row = (<Row className={row1} style={{ marginLeft: '0px', marginRight: '0px' }}>
            <Col sm="1" className="pad" ><Input  key={self.counter++} style={{ cursor: 'pointer',marginLeft:'0px' }}
                                        type="checkbox" onChange={() => (self.checkBoxClickInterface(rowIndex))} defaultChecked={false}/></Col>
            <Col sm="2" className="pad">{item.port ? item.port : '-'}</Col>
            <Col sm="2" className="pad">{item.adminState ? item.adminState : '-'}</Col>
            <Col sm="2" className="pad">{item.IPAddress ? item.IPAddress : '-'}</Col>
            <Col sm="2" className="pad">{item.connectedTo.serverName ? item.connectedTo.serverName : '-'}</Col>
            <Col sm="2" className="pad">{item.connectedTo.serverPort ? item.connectedTo.serverPort : '-'}</Col>
            <Col sm="1" className="pad" style={{ cursor: 'pointer' }}><i className="fa fa-pencil" aria-hidden="true" onClick={() => (self.toggleModel(rowIndex))}></i></Col>

          </Row>)
          rows.push(row)
        })

      })
    }
    return rows
  }

  checkBoxClickInterface = (rowIndex) => {
    let { selectedRowIndexes } = this.state
    let arrayIndex = selectedRowIndexes.indexOf(rowIndex)
    if (arrayIndex > -1) {
        selectedRowIndexes.splice(arrayIndex, 1)
    } else {
        selectedRowIndexes.push(rowIndex)
    }
    //this.setState({selectedRowIndexes:selectedRowIndexes})
   
  }

  deleteInterface = () =>{
    let arr = []
    let interfaces = this.state.nodes[0].allInterfaces
    interfaces.map((interfaceItem,index) =>{
      for(let i = 0; i < this.state.selectedRowIndexes.length; i++ ){
          if(index == this.state.selectedRowIndexes[i]){
            arr.push(interfaceItem.port)
          }
      }

      for(let j = 0 ; j < arr.length ; j++ ) {
        if(arr[j] == interfaceItem.port){
          delete interfaces[index]
        }
      }

    })

    interfaces = interfaces.filter(function(n){ return n != undefined })
    this.state.nodes[0].allInterfaces = interfaces
    let a = {
      nodes: this.state.nodes
    }
    ServerAPI.DefaultServer().updateNode(this.deleteInterfaceCallback, this, a);
    
  }

  deleteInterfaceCallback(instance, data) {
    let a = instance.state.data
    if (!a) {
      a = []
    }
    a.push(data)
    instance.setState({ data: a ,selectedRowIndexes:[]})
    
    NotificationManager.success('deleted Successfully', 'Interface');
  }

  checkBoxClick = (e) => {
    console.log('have fun', e)
  }

  toggleModel = (rowIndex) => {
    let data = this.state.nodes
    let itemData = {}
    data.map((datum) => {
      datum.allInterfaces.map((interfaceItem, datumIndex) => {
        if (rowIndex === datumIndex) {
          itemData = interfaceItem
        }
      })
    })
    this.setState({ displayModel: !this.state.displayModel, interfaceData: itemData, interfaceIndex: rowIndex })
  }


  renderUpgradeModelDialog() {
    if (this.state.displayModel) {
      let data = this.state.interfaceData
      let index = this.state.interfaceIndex
      return (
        <Modal isOpen={this.state.displayModel} toggle={() => this.toggleModel0()} size="sm" centered="true" >
          <ModalHeader toggle={() => this.toggleModel0()}>Edit Interface {data.port}</ModalHeader>
          <ModalBody>
            <div className="marTop10">Name: <Input type="text" autoFocus defaultValue={data.port} id="interfacePort" /></div>
            <div className="marTop10">Admin state:<Input type="text" defaultValue={data.adminState} disabled id="interfaceAdminState" /></div>
            <div className="marTop10">IP Address:<Input type="text" defaultValue={data.IPAddress} id="interfaceIpAddress" /></div>
            <div className="marTop10">Remote Node Name:<Input type="text" defaultValue={data.connectedTo.serverName ? data.connectedTo.serverName : '-'} id="interfaceRemoteNodename" /></div>
            <div className="marTop10">Remote Node Interface:<Input type="text" defaultValue={data.connectedTo.serverPort ? data.connectedTo.serverPort : '-'} id="interfaceRemoteNodeInterface" /></div>
          </ModalBody>
          <ModalFooter>
            <Button outline className="custBtn" color="primary" onClick={() => (this.updateNodeCall(index))}>Update</Button>
            <Button outline className="custBtn" color="primary" onClick={() => (this.toggleModel0())}>Cancel</Button>
          </ModalFooter>
        </Modal>
      );
    }
  }

  toggleModel0 = () => {
    this.setState({ displayModel: !this.state.displayModel })
  }

  updateNodeCall = (interfaceIndex) => {
    let data = this.state.nodes
    data.map((datum) => {
      datum.allInterfaces.map((interfaceItem, rowIndex) => {
        if (rowIndex === interfaceIndex) {
          interfaceItem.port = document.getElementById('interfacePort').value
          interfaceItem.IPAddress = document.getElementById('interfaceIpAddress').value,
            interfaceItem.connectedTo.serverName = document.getElementById('interfaceRemoteNodename').value,
            interfaceItem.connectedTo.serverPort = document.getElementById('interfaceRemoteNodeInterface').value
        }
      })
      this.setState({interfaces:datum.allInterfaces})
    })
    this.setState({ displayModel: !this.state.displayModel })
    NotificationManager.success('Updated Successfully', 'Interface');
  }

  toggleNewModel() {
    this.setState({ displayNewInterfaceModel: !this.state.displayNewInterfaceModel })
  }

  renderUpgradeNewModelDialog() {
    if (this.state.displayNewInterfaceModel) {
      return (
        <Modal isOpen={this.state.displayNewInterfaceModel} toggle={() => this.toggleNewModel()} size="sm" centered="true" >
          <ModalHeader toggle={() => this.toggleNewModel()}>Add Interface </ModalHeader>
          <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
            Name field is mandatory
          </Alert>
          <Alert color="danger" isOpen={this.state.visibleIp} toggle={this.onDismissIp}>
            Ip Address entered is wrong
          </Alert>
          <ModalBody>
            <div className="marTop10">Name: <Input autoFocus type="text" id="interName" /></div>
            <div className="marTop10">IP Address:<Input type="text" id="interIp" /></div>
            <div className="marTop10">Remote Node Name:<Input type="text" id="interRemoteName" /></div>
            <div className="marTop10">Remote Node Interface:<Input type="text" id="interRemoteInterface" /></div>
          </ModalBody>
          <ModalFooter>
            <Button outline className="custBtn" color="primary" onClick={() => (this.updateNewInterfaceCall())}>Add</Button>
            <Button outline className="custBtn" color="primary" onClick={() => (this.toggleNewModel())}>Cancel</Button>
          </ModalFooter>
        </Modal>
      );
    }
  }

  toggleProvisionModel() {
    this.setState({ displayProvisionModel: !this.state.displayProvisionModel })
  }

  provisionModal() {
    if (this.state.displayProvisionModel) {
      return (
        <Modal isOpen={this.state.displayProvisionModel} toggle={() => this.toggleProvisionModel()} size="sm" centered="true" >
          <ModalHeader>Provision </ModalHeader>
          <ModalBody>
            <div className="marTop10">Do you want to save all these changes?</div>
          </ModalBody>
          <ModalFooter>
            <Button className="custBtn" outline color="primary" onClick={() => (this.toggleProvisionModel())}>Yes</Button>
            <Button className="custBtn" outline color="primary" onClick={() => (this.toggleProvisionModel())}>No</Button>
          </ModalFooter>
        </Modal>
      );
    }
  }

  onDismiss = () => {
    this.setState({ visible: false });
  }

  onDismissIp = () => {
    this.setState({ visibleIp: false });
  }

  ValidateIPaddress = (ipaddress) => {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
      return (true)
    }
    return (false)
  }

  updateNewInterfaceCall = () => {
    if (!document.getElementById('interName').value) {
      this.setState({ visible: true });
      return;
    }

    let ipaddress = document.getElementById('interIp').value

    if (!this.ValidateIPaddress(ipaddress)) {
      this.setState({ visibleIp: true });
      return;
    }

    let newInterface = {
      'connectedTo': {
        'serverName': document.getElementById('interRemoteName').value,
        'serverPort': document.getElementById('interRemoteInterface').value
      },
      'IPAddress': document.getElementById('interIp').value,
      'port': document.getElementById('interName').value
    }
    let data = this.state.nodes
    data.map((datum) => {
      let allInterfaces = datum.allInterfaces
      if (!datum.allInterfaces || !datum.allInterfaces.length) {
        datum.allInterfaces = []
      }
      datum.allInterfaces.push(newInterface)
      this.setState({ interfaces:datum.allInterfaces})
    })
    
    this.setState({ displayNewInterfaceModel: !this.state.displayNewInterfaceModel,nodes:data })
    NotificationManager.success('Saved Successfully', 'Interface');
  }

  updateSaveNode = () => {
    let roles = this.state.selectedRoles;
    let data = this.state.nodes
    data.map((datum) => {
      datum.roles = roles,
        datum.nodeType = this.state.selectedType,
        datum.linuxIso = this.state.selectedIso,
        datum.kernel = this.state.selectedLinux,
        datum.interfaces = this.state.interfaces
      let a = {
        nodes: [datum]
      }
      ServerAPI.DefaultServer().updateNode(this.updateSaveNodeCallback, this, a);
    })
  }

  updateSaveNodeCallback(instance, data) {
    let a = instance.state.data
    if (!a) {
      a = []
    }
    a.push(data)
    instance.setState({ data: a })
    NotificationManager.success('Saved Successfully', 'Node Configuration');
  }

  wipeISO = () => {
    let data = this.state.nodes[0]
    ServerAPI.DefaultServer().upgradeOrWipeServerNode(data, this.wipeCallback, this);
    NotificationManager.success('Wiped Successfully', 'Linux ISO');
    this.setState({ wipeBtn: true })
  }

  wipeCallback(wipeInfo) {
    console.log("Updated :: " + wipeInfo);
  }

  onDismiss() {
    this.setState({ visible: false });

  }

  getSelectRoleValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }




  getSelectedData = (data, identity) => {
    if (identity == 'Type') {
      this.setState({ selectedType: data })

    }
    if (identity == 'Linux') {
      this.state.selectedIso != data && data != '' ? this.setState({ rebootBtn: false }) : ''
      this.setState({ selectedLinux: data })
    }
    if (identity == 'ISO') {

      this.state.selectedIso != data && data != '' ? this.setState({ wipeBtn: false }) : ''
      this.setState({ selectedIso: data })
    }

  }

  handleChange = (event) => {
    let selectedRoles = this.state.selectedRoles
    let val = event.target.value
    if (!selectedRoles || !selectedRoles.length) {
      selectedRoles = []
      selectedRoles.push(val)
    } else if (selectedRoles.indexOf(val) > -1) {
      selectedRoles.splice(selectedRoles.indexOf(val), 1)
    } else {
      selectedRoles.push(val)
    }
    this.setState({ selectedRoles: selectedRoles })
  }


  handleChanges = (selectedOption) => {
    this.setState({ selectedRoles: selectedOption });
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
    let siteField = null
    let selectedRowIndexes = []
    if (isSingleNode) {
      
      nodeNameDiv =
        <div>
          <Media className="edit" id="edit">
            <Media left>
              {this.state.nodes.map((nodeItem) => nodeItem.name)}
            </Media>
          </Media>
          <h6 className="srNo"><b>Sr. No. </b> {this.state.nodes.map((nodeItem) => nodeItem.serialNumber)}  / <b> Site </b>  {this.state.nodes.map((nodeItem) => nodeItem.site)}</h6>
        </div>
      interfaceTableHeader = this.interfaceTableHeader()
      interfaceTableContent = this.interfaceTableContent()

      siteField = <Input id='site' className="marTop10" />

    } else {
      
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
          <Media body><NotificationContainer /></Media>
          <Media right>
            <Button className="custBtn" outline color="secondary" onClick={() => { customHistory.goBack() }}> Cancel </Button>

            <Button className="custBtn" outline color="secondary" onClick={() => (this.updateSaveNode())}> Save </Button>
          </Media>
        </Media>
        <div >

          <div className="linuxBox" style={{ marginRight: '20px' }}>
            <Media>
              <Media body>
                <Label>Linux Kernel</Label>
                <DropDown options={this.state.kernelData} getSelectedData={this.getSelectedData} identity={"Linux"} default={this.state.selectedLinux} />
              </Media>
              <Media right>
                <Button className="custBtn marTop30 marLeft10" disabled={this.state.rebootBtn} outline color="secondary" > Reboot </Button>
              </Media>
            </Media>
          </div>
          <div className="linuxBox">
            <Media>
              <Media body>
                <Label>Base Linux ISO</Label>
                <DropDown options={this.state.isoData} getSelectedData={this.getSelectedData} identity={"ISO"} default={this.state.selectedIso} />
              </Media>
              <Media right>
                <Button className="custBtn marTop30 marLeft10" disabled={this.state.wipeBtn} outline color="secondary" onClick={() => { this.wipeISO() }}> Wipe </Button>
              </Media>
            </Media>
          </div>
        </div>
        <div className="boxBorder marTop20">
          <Media>
            <Media body>
            </Media>
            <Media right>
              <Button className="custBtn" outline color="secondary" onClick={() => { this.toggleProvisionModel() }}> Provision </Button>
            </Media>
          </Media>
          <Row className="pad">
            <Col xs='6' ><Label>Roles</Label><br />
              {/* <select key={this.couter++} multiple className="form-control" id="multiRole" value={this.state.selectedRoles} onChange={(e) => { this.handleChange(e) }}>{this.getRoles()}</select> */}
              <MultiselectDropDown value={this.state.selectedRoles} getSelectedData={this.handleChanges} options={this.state.roleData} />
            </Col>
            <Col xs='6' ><Label>Type</Label><br />
              <DropDown options={this.state.typedata} getSelectedData={this.getSelectedData} identity={"Type"} default={this.state.selectedType} />
            </Col>
          </Row>
          {/* {this.confDropdown()} */}
          <div style={{ padding: '10px' }}>
            {interfaceTableHeader}
            {interfaceTableContent}
          </div>
        </div>


        <div className="padTop20">
          {summaryDataTable}
        </div>
        {this.renderUpgradeModelDialog()}
        {this.renderUpgradeNewModelDialog()}
        {this.provisionModal()}

      </div>

    )
  }
}

export default NodeConfig;
