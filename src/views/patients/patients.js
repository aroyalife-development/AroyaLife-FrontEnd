import React from 'react';
import ReactTable from "react-table";
import treeTableHOC from "react-table/lib/hoc/treeTable";
import {
    Card,
    CardBody,
    CardTitle,
    Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink
} from 'reactstrap';
import "react-table/react-table.css";

class Client extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Card>
                <CardTitle className="mb-0 p-3 border-bottom bg-light">
                    <i className="mdi mdi-border-right mr-2"></i>Patients

                </CardTitle>
                <CardBody>
                    <ReactTable
                        columns={[
                            {
                                Header: "Patient Name",
                                accessor: "patient name"
                            },
                            {
                                Header: "Registerd Date",
                                accessor: "registerd date"
                            },
                            {
                                Header: "Call Status",
                                accessor: "callStatus"
                            },
                            {
                                Header: "Diognosis Link",
                                accessor: "diognosis"
                            },
                            {
                                Header: "Recommendation Link",
                                accessor: "ecommendationLink"
                            },
                            {
                                Header: "Actions",
                                accessor: "actions",
                                sortable: false,
                                filterable: false
                            }
                        ]}
                        defaultPageSize={10}
                        showPaginationBottom={true}
                        className="-striped -highlight"
                        filterable
                    />
                </CardBody>
            </Card>
        );
    }
}

export default Client;