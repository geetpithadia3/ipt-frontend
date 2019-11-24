import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import BasicDetails from "./basic";
import Skills from "./skills";
import Companies from "./companies";
import Success from "./success";
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import GridContainer from "components/tools/Grid/GridContainer";
import GridItem from "components/tools/Grid/GridItem";
import { height } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
    boxShadow: "0 0 10px 2px lightgrey",
    marginTop: "40px",
    padding: "40px"

  },
  cont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  buttonCont: {
    display:'flex',
    flexDirection: 'column',
    alignItems:'center'
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    overflow: "auto",
    height:"390px"
  }
}));

export default function Register() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  let [registerationData, setRegisterationData] = React.useState({
    basicDetails: {},
    skills: [],
    companies: []
  });

  const updateBasicProps = (data) => {
    switch (data.component) {
      case 'basic':
        setRegisterationData({
          ...registerationData,
          basicDetails: data.data
        })
        break;
      case 'skills':
        setRegisterationData({
          ...registerationData,
          skills: data.data
        })
        break;
      case 'companies':
        setRegisterationData({
          ...registerationData,
          companies: data.data
        })
        break;
    }
  }

  function getSteps() {
    return ["Basic Details", "Skills", "Company"];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <BasicDetails data={registerationData.basicDetails} saveDetails={updateBasicProps} />;
      case 1:
        return <Skills data={registerationData.skills} saveDetails={updateBasicProps} />;
      case 2:
        return <Companies data={registerationData.companies} saveDetails={updateBasicProps} />;
      default:
        return "Unknown step";
    }
  }

  const steps = getSteps();

  const isStepOptional = step => {
    return false;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const validateData = () => {
    return (Object.keys(registerationData.basicDetails).length > 0 && (registerationData.skills).length > 0 && (registerationData.companies).length > 0);
  }

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    const newStep = activeStep + 1;
    if (newStep === getSteps().length && validateData()) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      setSkipped(newSkipped);
    } else if (newStep < getSteps().length) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container maxWidth="md" className={classes.root} >
      <div className={classes.cont}>
        <Avatar className={classes.avatar} >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
      </div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {((activeStep === steps.length) && (validateData())) ? (
          <Success data={registerationData} />
        ) : (
            <div>
              <Typography className={classes.instructions} component="div">
                {getStepContent(activeStep)}
              </Typography>
              <GridContainer>
                <GridItem md={3} className={classes.buttonCont}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
              </Button>
                </GridItem >
                <GridItem md={3}></GridItem>
                <GridItem md={3}></GridItem>
                {/* {isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                    className={classes.button}
                  >
                    Skip
                </Button>
                )} */}
                <GridItem md={3} className={classes.buttonCont}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : ">"}
                  </Button>
                </GridItem>
              </GridContainer>
            </div>
          )}
      </div>
    </Container>
  );
}
