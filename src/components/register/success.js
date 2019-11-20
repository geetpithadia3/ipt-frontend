import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from "axios";

class Success extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        success: false
    };
  }

  componentDidMount() {
      
  }

  render() {
    return (
      <Container style={{textAlign: 'center'}}>
          {!this.state.success ? 
          <CircularProgress />
          :
          <Button>Login</Button>}
      </Container>
    );
  }
}

export default Success;
