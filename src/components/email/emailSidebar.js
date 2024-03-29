import React from "react";
import { Row, Col, Button, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import FilterEmail from '../../containers/email/filterEmails';
import { EmailVisibilityFilters } from '../../redux/email/action';
import PerfectScrollbar from "react-perfect-scrollbar";

class EmailSidebar extends React.Component {

	state = {
		composeModal: false
	};

	toggle = () => {
		this.setState({
			composeModal: !this.state.composeModal
		});
	}

	render() {
		return (
			<div>
				<div className="p-3">
					<span onClick={this.toggle} className="btn btn-danger d-block text-white">Compose</span>
				</div>
				<div className="divider"></div>
				<ListGroup className="email-filters">
					<FilterEmail filter={EmailVisibilityFilters.SHOW_INBOX}>
						<i className="fas fa-inbox mr-2"></i> Inbox
					</FilterEmail>
					<FilterEmail filter={EmailVisibilityFilters.SHOW_SENT}>
						<i className="fas fa-paper-plane mr-2"></i> Sent
					</FilterEmail>
					<FilterEmail filter={EmailVisibilityFilters.SHOW_DRAFTS}>
						<i className="fas fa-file mr-2"></i> Drafts
					</FilterEmail>
					<FilterEmail filter={EmailVisibilityFilters.SHOW_SPAM}>
						<i className="fas fa-exclamation-circle mr-2"></i> Spam
					</FilterEmail>
					<FilterEmail filter={EmailVisibilityFilters.SHOW_TRASH}>
						<i className="fas fa-trash mr-2"></i> Trash
					</FilterEmail>
					<ListGroupItem>
						<hr />
					</ListGroupItem>
					<FilterEmail filter={EmailVisibilityFilters.SHOW_STARRED}>
						<i className="fas fa-star mr-2"></i> Starred
					</FilterEmail>
					<FilterEmail filter={EmailVisibilityFilters.SHOW_IMPORTANT}>
						<i className="fas fa-bookmark mr-2"></i> Important
					</FilterEmail>
					<ListGroupItem>
						<hr />
					</ListGroupItem>
					<FilterEmail filter={EmailVisibilityFilters.SHOW_PROMOTIONAL}>
						<i className="fas fa-tags mr-2"></i> Promotional
					</FilterEmail>
					<FilterEmail filter={EmailVisibilityFilters.SHOW_SOCIAL}>
						<i className="fas fa-tags mr-2"></i> Social
					</FilterEmail>
					<FilterEmail filter={EmailVisibilityFilters.SHOW_HEALTH}>
						<i className="fas fa-tags mr-2"></i> Health
					</FilterEmail>
				</ListGroup>
				<Modal isOpen={this.state.composeModal} toggle={this.toggle} size="lg">
					<ModalHeader toggle={this.toggle}>Compose New Message</ModalHeader>
					<ModalBody>
						<Form>
							<div className="form-body">
								<Row>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="to">To</Label>
											<Input type="text" id="to" name="to" />
										</FormGroup>
									</Col>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="cc">CC</Label>
											<Input type="text" id="cc" name="cc" />
										</FormGroup>
									</Col>
									<Col sm="12">
										<FormGroup>
											<Label for="subject">Subject</Label>
											<Input type="text" id="subject" name="subject" />
										</FormGroup>
									</Col>
									<Col sm="12">
										<FormGroup>
											<Label for="msg">Email Message</Label>
											<Input type="textarea" name="msg" id="msg" />
										</FormGroup>
									</Col>
								</Row>

								<FormGroup>
									<Label>Attachment</Label>
									<Input type="file" className="form-control-file" id="projectinput8" />
								</FormGroup>
							</div>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.toggle}>Send</Button>{' '}
						<Button color="secondary" onClick={this.toggle}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</div>
		)
	}
}

export default EmailSidebar;
