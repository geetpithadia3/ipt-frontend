import React, { Component } from "react";
import {
  Grid,
  CssBaseline,
  Paper,
  Avatar,
  Typography,
  Checkbox,
  Button,
  Link,
  TextField,
  FormControlLabel
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { withStyles } from "@material-ui/core/styles";
import logo from "../assets/images/uwindsor_logo.svg";
import axios from "axios";
import { Link as ReactLink } from "react-router-dom";
import { APILinks } from './apisLink';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "length",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

const Link1 = React.forwardRef((props, ref) => <ReactLink innerRef={ref} {...props} />);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginSuccess: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  renderRedirect = () => {
    if (this.state.loginSuccess) {
      return <Redirect to='/dashboard' />
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    var apiBaseUrl = APILinks.getLoginUrl();
    var self = this;
    var payload = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post(apiBaseUrl + "authenticate", payload,{"withCredentials":true, "headers":{ "Access-Control-Allow-Credentials":true,'Access-Control-Allow-Origin': 'http://localhost:3000'}})
      .then(function(response) {
        if (response.data.status == 200) {
          // navigating to dashboard
          self.setState({
            loginSuccess: true
          });
        } else if (response.data.status == 204) {
          console.log("Username password do not match");
          alert("username password do not match");
        } else {
          console.log("Username does not exists");
          alert("Username does not exist");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  handleClearForm() {}
  render() {
    const { classes } = this.props;
    return (
      
      <Grid container className={classes.root}>
        <CssBaseline />
        
        <Grid item xs={false} sm={3} md={6} className={classes.image} />
        <Grid item xs={12} sm={9} md={6} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Internship Progress Tracker - Sign in
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleFormSubmit}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={this.state.email}
                onChange={event => this.setState({ email: event.target.value })}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {this.renderRedirect()}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <Link component={Link1} to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
