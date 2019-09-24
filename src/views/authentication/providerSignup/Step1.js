







import React, { Component } from "react";

export default class Step1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.getStore().email,
      gender: props.getStore().gender,
      name: props.getStore().name,
      surname: props.getStore().surname,
      mobile: props.getStore().mobile,
      birthday: props.getStore().birthday
    };
    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
  }
  isValidated() {
    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (
      Object.keys(validateNewInput).every(k => {
        return validateNewInput[k] === true;
      })
    ) {
      if (
        this.props.getStore().email !== userInput.email ||
        this.props.getStore().gender !== userInput.gender ||
        this.props.getStore().name !== userInput.name ||
        this.props.getStore().surname !== userInput.surname ||
        this.props.getStore().mobile !== userInput.mobile ||
        this.props.getStore().birthday !== userInput.birthday
      ) {
        // only update store of something changed
        this.props.updateStore({
          ...userInput,
          savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
        }); // Update store here (this is just an example, in reality you will do it via redux or flux)
      }

      isDataValid = true;
    } else {
      // if anything fails then update the UI validation state but NOT the UI Data State
      this.setState(
        Object.assign(
          userInput,
          validateNewInput,
          this._validationErrors(validateNewInput)
        )
      );
    }

    return isDataValid;
  }

  validationCheck() {
    if (!this._validateOnDemand) return;

    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator

    this.setState(
      Object.assign(
        userInput,
        validateNewInput,
        this._validationErrors(validateNewInput)
      )
    );
  }

  _validateData(data) {
    return {
      genderVal: data.gender !== "", // required: anything besides N/A
      emailVal: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        data.email
      ), // required: regex w3c uses in html5
      nameVal: data.name !== "",
      surnameVal: data.surname !== "",
      mobileVal: /^\d{10}$/.test(data.mobile),
      birthdayVal: data.birthday !== ""
    };
  }

  _validationErrors(val) {
    const errMsgs = {
      genderValMsg: val.genderVal ? "" : "A gender selection is required",
      emailValMsg: val.emailVal ? "" : "A valid email is required",
      nameValMsg: val.nameVal ? "" : "First name is required",
      surnameValMsg: val.surnameVal ? "" : "Surname is required",
      mobileValMsg: val.mobileVal
        ? ""
        : "Mobile number should be 10 characters",
      birthdayValMsg: val.birthdayVal ? "" : "Birthday is required"
    };
    return errMsgs;
  }

  _grabUserInput() {
    return {
      gender: this.gender.value,
      email: this.email.value,
      name: this.name.value,
      surname: this.surname.value,
      mobile: this.mobile.value,
      birthday: this.birthday.value
    };
  }
  render() {
    // explicit class assigning based on validation
    let notValidClasses = {};

    if (typeof this.state.genderVal === "undefined" || this.state.genderVal) {
      notValidClasses.genderCls = "form-control";
    } else {
      notValidClasses.genderCls = "is-invalid form-control";
      notValidClasses.genderValGrpCls = "text-danger";
    }

    if (typeof this.state.emailVal === "undefined" || this.state.emailVal) {
      notValidClasses.emailCls = "form-control";
    } else {
      notValidClasses.emailCls = "is-invalid form-control";
      notValidClasses.emailValGrpCls = "text-danger";
    }

    if (typeof this.state.nameVal === "undefined" || this.state.nameVal) {
      notValidClasses.nameCls = "form-control";
    } else {
      notValidClasses.nameCls = "is-invalid form-control";
      notValidClasses.nameValGrpCls = "text-danger";
    }

    if (typeof this.state.surnameVal === "undefined" || this.state.surnameVal) {
      notValidClasses.surnameCls = "form-control";
    } else {
      notValidClasses.surnameCls = "is-invalid form-control";
      notValidClasses.surnameValGrpCls = "text-danger";
    }

    if (typeof this.state.mobileVal === "undefined" || this.state.mobileVal) {
      notValidClasses.mobileCls = "form-control";
    } else {
      notValidClasses.mobileCls = "is-invalid form-control";
      notValidClasses.mobileValGrpCls = "text-danger";
    }

    if (
      typeof this.state.birthdayVal === "undefined" ||
      this.state.birthdayVal
    ) {
      notValidClasses.birthdayCls = "form-control";
    } else {
      notValidClasses.birthdayCls = "is-invalid form-control";
      notValidClasses.birthdayValGrpCls = "text-danger";
    }
    return (
      <div className="step step1 mt-5 ">
        <div className="row justify-content-md-center">
          <div className="col col-lg-6">
            <div className="">
              <h4>Welcome, Please Enter your Basic Details.</h4>
              <form id="Form" className="form-horizontal mt-2">
                <div className="form-group content form-block-holder">
                  <label className="control-label">Name</label>
                  <div>
                    <input
                      placeholder="Name"
                      type="text"
                      ref={g => {
                        this.name = g;
                      }}
                      autoComplete="off"
                      required
                      defaultValue={this.state.name}
                      onBlur={this.validationCheck}
                      className={notValidClasses.nameCls}
                    />
                    <div className={notValidClasses.nameValGrpCls}>
                      {this.state.nameValMsg}
                    </div>
                  </div>
                </div>
                <div className="form-group content form-block-holder">
                  <label className="control-label">Surname</label>
                  <div>
                    <input
                      placeholder="Surname"
                      type="text"
                      ref={h => {
                        this.surname = h;
                      }}
                      autoComplete="off"
                      required
                      defaultValue={this.state.surname}
                      onBlur={this.validationCheck}
                      className={notValidClasses.surnameCls}
                    />
                    <div className={notValidClasses.surnameValGrpCls}>
                      {this.state.surnameValMsg}
                    </div>
                  </div>
                </div>
                <div className="form-group content form-block-holder">
                  <label className="control-label">Gender</label>
                  <div>
                    <select
                      // ref="gender"
                      ref={e => {
                        this.gender = e;
                      }}
                      autoComplete="off"
                      className={notValidClasses.genderCls}
                      required
                      defaultValue={this.state.gender}
                      onBlur={this.validationCheck}
                    >
                      <option value="">Please select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className={notValidClasses.genderValGrpCls}>
                      {this.state.genderValMsg}
                    </div>
                  </div>
                </div>
                <div className="form-group content form-block-holder">
                  <label className="control-label ">Email</label>
                  <div>
                    <input
                      // ref="email"
                      ref={f => {
                        this.email = f;
                      }}
                      autoComplete="off"
                      type="email"
                      placeholder="john.smith@example.com"
                      className={notValidClasses.emailCls}
                      required
                      defaultValue={this.state.email}
                      onBlur={this.validationCheck}
                    />
                    <div className={notValidClasses.emailValGrpCls}>
                      {this.state.emailValMsg}
                    </div>
                  </div>
                </div>
                <div className="form-group content form-block-holder">
                  <label className="control-label">Mobile</label>
                  <div>
                    <input
                      placeholder="Mobile"
                      type="text"
                      ref={i => {
                        this.mobile = i;
                      }}
                      autoComplete="off"
                      required
                      defaultValue={this.state.mobile}
                      onBlur={this.validationCheck}
                      className={notValidClasses.mobileCls}
                    />
                    <div className={notValidClasses.mobileValGrpCls}>
                      {this.state.mobileValMsg}
                    </div>
                  </div>
                </div>
                <div className="form-group content form-block-holder">
                  <label className="control-label">Birthday</label>
                  <div>
                    <input
                      placeholder="Birthday"
                      type="date"
                      ref={j => {
                        this.birthday = j;
                      }}
                      autoComplete="off"
                      required
                      defaultValue={this.state.birthday}
                      onBlur={this.validationCheck}
                      className={notValidClasses.birthdayCls}
                    />
                    <div className={notValidClasses.birthdayValGrpCls}>
                      {this.state.birthdayValMsg}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
