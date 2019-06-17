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

class UserAppointments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Card>
                <CardTitle className="mb-0 p-3 border-bottom bg-light">
                    <i className="mdi mdi-border-right mr-2"></i>Appointments
                    <NavLink href="/videoCall">
                        <Button
                            color="success"
                            // onClick={this.toggle}
                            style={{ 'marginBottom': '1rem' }}
                            className="btn float-right"
                        >
                            <i className="mdi mdi-phone" />
                            <span className="ml-2">Make a Call</span>
                        </Button>
                    </NavLink>
                </CardTitle>
                <CardBody>
                    <ReactTable
                        columns={[
                            {
                                Header: "Date",
                                accessor: "date"
                            },
                            {
                                Header: "Time",
                                accessor: "time"
                            },
                            {
                                Header: "Duration",
                                accessor: "duration"
                            },
                            {
                                Header: "Provider Name",
                                accessor: "providerName"
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

export default UserAppointments;