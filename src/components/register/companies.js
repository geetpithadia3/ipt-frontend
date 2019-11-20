import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Favorite from "@material-ui/icons/Favorite";
import microsoftLogo from "../../assets/images/microsoft_logo.jpg";
import blackberryLogo from "../../assets/images/blackberry_logo.jpg";
import paysafeLogo from "../../assets/images/paysafe_logo.jpg";
import salesforceLogo from "../../assets/images/salesforce_logo.jpg";
import sapLogo from "../../assets/images/sap_logo.png";
import { APILinks } from "../apisLink";
import Axios from "axios";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 300,
    margin: 5,
    height: 300,
    float: "left"
  },
  media: {
    height: 0,
    // paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function Companies(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [companyDetails, setCompanyDetails] = React.useState([]);
  let selectedCompanies = new Set(props.data);

  React.useEffect(() => {
    Axios.get(APILinks.fetchCompanyDetails()).then(
      response => {
        setCompanyDetails(response.data);
      },
      error => {}
    );
  }, []);

  const getCompanyLogo = (name) => {
    switch(name) {
      case 'Microsoft': return microsoftLogo;
        break;
      case 'Salesforce': return salesforceLogo;
        break;
      case 'Blackberry': return blackberryLogo;
        break;
      case 'SAP': return sapLogo;
        break;
      case 'Paysafe Group': return paysafeLogo;
        break;
    }
  }

  const handleCompanySelect = (name) => (event) => {
    if (event.target.checked) {
      selectedCompanies.add(name);
    } else {
      selectedCompanies.delete(name);
    }
    props.saveDetails({
      component: 'companies',
      data: [...selectedCompanies]
    });
  }

  const isSelected = (name) => {
    return selectedCompanies.has(name);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getCompanyDetailsURL = APILinks.fetchCompanyDetails();

  return (
    <Container component="div">
      {companyDetails.map(function(data, index) {
        return (
          <Card className={classes.card} key={index}>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="recipe"
                  src={getCompanyLogo(data.name)}
                  className={classes.avatar}
                ></Avatar>
              }
              title={data.name}
            />
            <CardContent style={{overflowY: "auto", height:130}}>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.summary}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                {
                  <Checkbox
                    icon={<FavoriteIcon />}
                    checkedIcon={<Favorite />}
                    onChange={handleCompanySelect(data.name)}
                    value={data.name}
                    checked={isSelected(data.name)}
                  />
                }
              </IconButton>
            </CardActions>
          </Card>
        );
      })}
    </Container>
  );
}
