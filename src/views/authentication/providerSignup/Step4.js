import React, { Component } from "react";

export default class Step4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedToCloud: props.getStore().savedToCloud
    };
  }

  render() {
    return (
      <div className="step step4 mt-5">
        <div className="row justify-content-md-center">
          <div className="col-lg-8">
            <form id="Form" className="form-horizontal">
              <div className="form-group">
                {/* <label className="col-md-12 control-label align-self-center">
                  {this.state.savedToCloud ? (
                    <div>
                      <h1>Thanks!</h1>
                      <h2>Data was successfully saved to cloud...</h2>
                    </div>
                  ) : (
                    <div>
                      <h1>Thanks</h1>
                      <h2>Data was successfully saved to cloud...</h2>
                      <span
                        className="btn btn-success text-white"
                        onClick={() => {
                          this.props.jumpToStep(4);
                        }}
                      >
                        Save
                      </span>
                    </div>
                  )}
				</label> */}
                <div>
                  <div className="align-self-center">
                    <h1>Success! </h1>
                    <h2>Are you sure you want to save the added details?</h2>
                  </div>
                  <br />
                  <span
                    className="btn btn-prev btn-success btn-lg pull-left"
                    onClick={() => {
                      this.props.jumpToStep(1);
                    }}
                  >
                    Previous
                  </span>
                  <span
                    className="btn btn-prev btn-success btn-lg pull-right"
                    onClick={() => {
                      this.props.jumpToStep(4);
                      this.props.savePatient();
                    }}
                  >
                    Save
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
