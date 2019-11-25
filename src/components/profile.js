import React, { useEffect, useState, Component } from "react";
import { APILinks } from "./apisLink";
import { Container, Typography, Button, Snackbar, IconButton  } from "@material-ui/core";
import MenuAppBar from "./ToolBar";
import Skills from "./register/skills";
import Axios from "axios";
import CloseIcon from '@material-ui/icons/Close';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  skills: [],
	  toastOpen: false
    };
    this.updateSkills = this.updateSkills.bind(this);
	this.handleSkillsButton = this.handleSkillsButton.bind(this);
	this.handleToastClose = this.handleToastClose.bind(this);
  }

  componentDidMount() {
    Axios.get(APILinks.getCurrentSkillsUrl(), { withCredentials: true }).then(
      response => {
        this.setState({
		  skills: response.data
        });
      },
      error => {}
    );
  }

  updateSkills(data) {
    this.setState({
      skills: data.data
    });
  }

  handleToastClose() {
    this.setState({
		toastOpen: false
	  });
  };

  handleSkillsButton() {
    Axios.post(
      APILinks.updateUserSkillsUrl(),
      {
        skillsList: this.state.skills
      },
      { withCredentials: true }
    ).then(
      response => {
        this.setState({
			toastOpen: true
		});
      },
      error => {}
    );
  }

  render() {
    return (
      <Container maxWidth="xl">
        <MenuAppBar />
        <Typography align="center" variant="h6">
          Update Skills
        </Typography>
        <Skills data={this.state.skills} saveDetails={this.updateSkills} />
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleSkillsButton}
        >
          Update Skills
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
		  open={this.state.toastOpen}
		  onClose={this.handleToastClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
		  message={<span id="message-id">Profile Updated Successfully.</span>}
		  action={[
			<IconButton key="close" aria-label="close" color="inherit" onClick={this.handleToastClose}>
			  <CloseIcon />
			</IconButton>,
		  ]}
        />
      </Container>
    );
  }
}

export default Profile;
