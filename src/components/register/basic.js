import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography component={'div'} variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
   
    minWidth: 120,
  },
}));

export default function BasicDetails(props) {
  /**
   * Fields of basic details form
   */
  
  const classes = useStyles();
  const [state, setState] = React.useState({
    firstName: props.data.firstName || '',
    lastName: props.data.lastName || '',
    email: props.data.email || '',
    password: props.data.password || '',
    intake: props.data.intake || '',
    year: props.data.year || ''
  });
  

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  React.useEffect(() => {
    props.saveDetails({
      component: 'basic',
      data: state
    });
  }, [state]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange = {handleChange('firstName')}
                value = {state.firstName}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField

                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange = {handleChange('lastName')}
                autoComplete="lname"
                value = {state.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange = {handleChange('email')}
                autoComplete="email"
                value = {state.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange = {handleChange('password')}
                id="password"
                autoComplete="current-password"
                value = {state.password}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm password"
                label="Confirm Password"
                type="password"
                id="confirm password"
                autoComplete="current-password"
              />
            </Grid> */}

            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="number"
                label="Phone Number"
                type="text"
                pattern="[0-9]*"
                id="phone password"
                autoComplete="phone-number"
              />
            </Grid> */}

            <Grid item xs={10} sm={5}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} htmlFor="outlined-intake">
                  Intake
        </InputLabel>
                <Select
                  native
                  value={state.intake}
                  onChange={handleChange('intake')}
                  labelWidth={labelWidth}
                  inputProps={{
                    name: 'intake',
                    id: 'outlined-intake',
                    
                  }}
                >
                  <option value="" />
                  <option value={'January'}>January</option>
                  <option value={'May'}>May</option>
                  <option value={'September'}>September</option>
                </Select>
              </FormControl>
            </Grid>
          

          <Grid item xs={10} sm={5}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} htmlFor="outlined-year">
                  Year
        </InputLabel>
                <Select
                  native
                  value={state.year}
                  onChange={handleChange('year')}
                  labelWidth={labelWidth}
                  inputProps={{
                    name: 'year',
                    id: 'outlined-year',
                    
                  }}
                >
                  <option value="" />
                  <option value={2015}>2015</option>
                  <option value={2016}>2016</option>
                  <option value={2017}>2017</option>
                  <option value={2018}>2018</option>
                  <option value={2019}>2019</option>

                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>


    </Container>
  );
}
