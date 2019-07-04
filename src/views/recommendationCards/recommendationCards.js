import React, { Component } from 'react';
import ReactTable from "react-table";
import treeTableHOC from "react-table/lib/hoc/treeTable";
import {
    Card,
    CardBody,
    CardTitle,
    Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink
} from 'reactstrap';
import "react-table/react-table.css";

class RecommendationCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Card>
                <CardTitle className="mb-0 p-3 border-bottom bg-light">
                    <i className="mdi mdi-border-right mr-2"></i>Recommendation Cards

                </CardTitle>
                <CardBody>
                    <ReactTable
                        columns={[
                            {
                                Header: "Date of Calls",
                                accessor: "date of calls"
                            },
                            {
                                Header: "Time of the Call",
                                accessor: "time of the call"
                            },
                            {
                                Header: "Provider Name",
                                accessor: "provider name"
                            },
                            {
                                Header: "Status of Recommendation",
                                accessor: "status of recommendation"
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

export default RecommendationCards;