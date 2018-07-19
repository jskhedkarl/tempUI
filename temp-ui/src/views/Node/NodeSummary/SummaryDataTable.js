import React from 'react';
import { Col, Row, Input } from 'reactstrap';
import { Button } from 'reactstrap';

export default class SummaryDataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            heading: [],
            selectedRowIndexes: [],
            selectEntireRow: false
        };
        this.counter = 0;
    }

    static defaultProps = {
        showCheckBox: true
    }

    static getDerivedStateFromProps(props, state) {
        return {
            data: props.data,
            heading: props.heading,
            selectedRowIndexes: props.selectedRowIndexes,
            selectEntireRow: props.selectEntireRow
        }
    }

    drawHeader(props = this.props) {
        let headNames = [];
        this.state.heading.map((item) => (headNames.push(<Col sm={item.colSize} className="head-name">{item.displayName}</Col>)));
        let tableSize = 12

        if (props.showCheckBox) {
            tableSize = 10
        }
        return (
            <Row className="headerRow">
                <Col sm="1" className="head-name"></Col>
                <Col sm={tableSize} className="head-name" >
                    <Row>
                        {headNames}
                    </Row>
                </Col>
                <Col sm="1" className="head-name"><Button color="link"><i className="fa fa-plus fa-lg" aria-hidden="true"></i></Button></Col>
            </Row>
        )
    }



    drawtable(props = this.props) {
        let { data, selectedRowIndexes } = this.state
        let rows = []
        let checkBoxColumn = null
        let header = this.drawHeader()
        rows.push(header)
        let self = this
        if (data && data.length) {
            let colHeader = this.state.heading
            data.map(function (datum, rowIndex) {
                if (datum && Object.keys(datum).length) {
                    let rowClassName = 'headerRow1'

                    if (rowIndex % 2 === 0) {
                        rowClassName = 'headerRow2'
                    }
                    if (rowIndex == data.length - 1) {
                        rowClassName += ' headerRow3 '
                    }

                    let columns = []
                    colHeader.map(function (header) {
                        let key = header.id
                        let value = '-'

                        if (datum.hasOwnProperty(key)) {
                            value = datum[key]
                            if (value && value.length && header.type == 'array') {
                                let str = ''
                                value.map((val) => {
                                    if (val) {
                                        str += val + ','
                                    }

                                })
                                value = str
                            }
                        }


                        if (props.showCheckBox) {
                            checkBoxColumn = (
                                <Col sm="1" className="pad" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Input key={self.counter++} style={{ cursor: 'pointer' }} 
                                        type="checkbox" onChange={() => (self.checkBoxClick(rowIndex))} defaultChecked={selectedRowIndexes && selectedRowIndexes.length && selectedRowIndexes.indexOf(rowIndex) > -1 ? true : false} />
                                </Col>)
                        }
                        columns.push(<Col sm={header.colSize ? header.colSize : 1} className="pad"> {value}</Col>)
                    })
                    var row;
                    if (props.selectEntireRow) {
                        row = (<Row className={rowClassName} >
                            {checkBoxColumn}
                            <Col sm="10" className="pad" style={{ cursor: 'pointer' }} onClick={() => self.checkBoxClick(rowIndex, true)} >
                                <Row>
                                    {columns}
                                </Row>
                            </Col>
                        </Row>)
                    }
                    else {
                        row = (<Row className={rowClassName} >
                            {checkBoxColumn}
                            <Col sm="10" className="pad">
                                <Row>
                                    {columns}
                                </Row>
                            </Col>
                        </Row>)
                    }
                    rows.push(row)
                }
            })
        }
        return rows
    }

    checkBoxClick = (rowIndex, singleRowClick) => {
        this.props.checkBoxClick(rowIndex, singleRowClick)
    }

    render() {
        return (
            <div >
                {this.drawtable()}
            </div>
        );
    }
}
