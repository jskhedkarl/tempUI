import React, {Component} from 'react';
import PlaybookComp from '../../../components/PlaybookComp/PlaybookComp';
import ServiceManager from "../../../services/serviceManager";

class Playbook extends Component {
  constructor(){
    super();
  }
  render() {
    return (
      <div> <PlaybookComp/> </div>
    )
  }
}
export default Playbook;
