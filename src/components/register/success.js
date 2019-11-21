import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Axios from "axios";
import { APILinks } from "../apisLink";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Link as ReactLink } from "react-router-dom";

class Success extends Component {
    Link1 = React.forwardRef((props, ref) => <ReactLink innerRef={ref} {...props} />);

    constructor(props) {
        super(props);
        this.state = {
        success: false
        };
    }

  componentDidMount() {
    var apiBaseUrl = APILinks.registerUserUrl();
    console.log(this.props.data)
    Axios.post(apiBaseUrl, this.props.data).then(
      response => {
        console.log(this.props);
        this.setState({
          success: true
        });
      },
      error => {
        alert('Error in registering user. Please try again');
      }
    );
  }

  render() {
    return (
      <Container style={{ textAlign: "center" }}>
        {!this.state.success ? (
          <CircularProgress />
        ) : (
          <>
            <ThumbUpIcon color="primary"/> 
            <Typography>
                Registration Successful. Please 
                <Link component={this.Link1} to="/login" variant="body2">
                    {" Login "}
                </Link>
                to continue.
            </Typography>
          </>
        )}
      </Container>
    );
  }
}

export default Success;
