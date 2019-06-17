import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

var callback = function () {
	console.log('Done!!!!');
};

export default class Step2 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			password: '',
			passwordError: '',
		};
	}


	handlePassChange = event => {
		this.setState({ password: event.target.value }, () => {
			this.validatePassword();
		});
	};

	validatePassword = () => {
		const { password } = this.state;
		this.setState({
			passwordError:
				password.length > 6 ? null : 'password must be longer than 3 characters'
		});
	}



	render() {
		return (
			<div className="step step2 mt-5">
				<div className="row justify-content-md-center">
					<div className="col-lg-8">
						<form>
							{/* <div className="form-group row">
								<label htmlFor="staticEmail" className="col-sm-2 col-form-label">Date of Birth</label>
								<div className="col-sm-2">
									<select className="custom-select">
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
									</select>
								</div>
								<div className="col-sm-4">
									<select className="custom-select">
										<option value="Jan">January</option>
										<option value="Feb">February</option>
										<option value="Mar">March</option>
									</select>
								</div>
								<div className="col-sm-4">
									<input type="text" className="form-control" placeholder="Year" />
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="inputPassword" className="col-sm-2 col-form-label">Home Address</label>
								<div className="col-sm-10">
									<div className="row mb-3">
										<div className="col-sm-12">
											<input type="text" className="form-control" placeholder="Street Address" />
										</div>
									</div>
									<div className="row">
										<div className="col-sm-5">
											<input type="text" className="form-control" placeholder="Suburb" />
										</div>
										<div className="col-sm-3">
											<select className="custom-select">
												<option value="nsw">NSW</option>
												<option value="hfk">HFK</option>
												<option value="uyr">UYR</option>
											</select>
										</div>
										<div className="col-sm-4">
											<input type="text" className="form-control" placeholder="Postcode" />
										</div>
									</div>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="gender" className="col-sm-2 col-form-label">Gender</label>
								<div className="col-sm-10">
									<select className="custom-select">
										<option>Select Gender</option>
										<option value="1">Male</option>
										<option value="2">Female</option>
										<option value="3">Other</option>
									</select>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
								<div className="col-sm-10">
									<input type="email" className="form-control" placeholder="Email" />
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="pphone" className="col-sm-2 col-form-label">Primary Phone</label>
								<div className="col-sm-10">
									<input type="text" className="form-control" placeholder="Primary Number" />
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="ophone" className="col-sm-2 col-form-label">Other Phone</label>
								<div className="col-sm-10">
									<input type="text" className="form-control" placeholder="Other Number" />
								</div>
							</div> */}
							<div className="form-group row">
								<label htmlFor="psword" className="col-sm-2 col-form-label">Password</label>
								<div className="col-sm-5">
									<input type="password" name="password" id="password" className="form-control" className={`form-control ${this.state.passwordError ? 'is-invalid' : ''}`}
										value={this.state.password}
										onChange={this.handlePassChange}
										onBlur={this.validatePassword}
										placeholder="Password" />
									<div className="text-danger">{this.state.passwordError}</div>
								</div>

							</div>

							<div className="form-group row">
								<div className="col-sm-1">
									<input type="checkbox" className="form-control" placeholder="Confirm Password" />
								</div>
								<label htmlFor="cpsword" className="col-sm-6 col-form-label">I Agree to the terms and Conditions</label>
							</div>
							<ReCAPTCHA
								sitekey="6LfaoaQUAAAAAB4TPuOZCjvZDABA_OFxVXqQOo8K"
								render="explicit"
								onloadCallback={callback}
							/>
						</form>
					</div>
				</div>
			</div>
		)
	}
}
