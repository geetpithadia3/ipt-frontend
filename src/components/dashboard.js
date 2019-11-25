import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Apps from "@material-ui/icons/Apps";
import CalendarToday from "@material-ui/icons/CalendarToday";
// core components
import GridItem from "./tools/Grid/GridItem.js";
import GridContainer from "./tools/Grid/GridContainer.js";
import Card from "./tools/Card/Card.js";
import CardHeader from "./tools/Card/CardHeader.js";
import CardIcon from "./tools/Card/CardIcon.js";
import CardBody from "./tools/Card/CardBody.js";
import CardFooter from "./tools/Card/CardFooter.js";
import MenuAppBar from "./ToolBar"
import { useHttpGet, useHttpPost } from "./http";
import Avatar from "@material-ui/core/Avatar";
import microsoftLogo from "../assets/images/microsoft_logo.jpg";
import blackberryLogo from "../assets/images/blackberry_logo.jpg";
import paysafeLogo from "../assets/images/paysafe_logo.jpg";
import salesforceLogo from "../assets/images/salesforce_logo.jpg";
import sapLogo from "../assets/images/sap_logo.png";
import { LineChart, PieChart, ColumnChart } from 'react-chartkick'
import { Chart } from "react-google-charts";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../variables/charts.js";
import { APILinks } from './apisLink';

import styles from "../assets/jss/material-dashboard-react/views/dashboardStyle";
import { Container } from "@material-ui/core";
import { width } from "@material-ui/system";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles()
  const [skillsLoading, skillsData] = useHttpGet(APILinks.getSkillsCountUrl(), null, [])
  const [openPositionsLoading, openPositionsData] = useHttpGet(APILinks.getOpenPositionCountUrl(), null, [])
  const [skillsCompaniesCountLoading, skillsCompaniesCountData] = useHttpGet(APILinks.getSkillsCompaniesCountUrl(), null, [])
  const [jobPostingLoading, jobPostingData] = useHttpGet(APILinks.getRelevantJobPostings(), null, [])
  const [progressLoading, progressData] = useHttpGet(APILinks.getProgress(), null, [])
  const [chartData, setChartData] = useState()
  const [xData, setXData] = useState([])
  const getCompanyLogo = (name) => {
    switch (name) {
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
  const skillsChart = skillsData ? skillsData.data : []

  const chartDat = useEffect(() => {
    // var xData=[]

    // var xList =
    if (progressData) {
      let trackerChartData = [];
      // adding headers
      const tList = []
      tList.push(
        { type: 'date', label: 'Day' },
      );
      // const cData=[]
      progressData.data["trackingData"].map((trData, index) => {
        const tData = []
        Object.keys(trData).map(key => {
          if (key !== "timeStamp" && index <= 0) {
            tList.push(key)
          }
          if (key === "timeStamp") {
            tData.push(new Date(trData[key]["$date"]))
          }
          else {
            tData.push(trData[key])
          }
        })
        if (index <= 0) {
          trackerChartData.push(tList)
        }
        trackerChartData.push(tData)
      })
      setChartData(trackerChartData);
    }

  }, [progressData])

  // skillsChart=l
  // return skillsChart}
  // labels: skillsData ? Object.keys(skillsData.data) : [],
  // series: [skillsData ? Object.values(skillsData.data) : []]
  // }

  return (
    <Container maxWidth='xl'>
      <MenuAppBar />
      <GridContainer style={{ marginTop: '70px !important' }}>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Open Positions</p>
              <h1 className={classes.cardTitle}>
                {openPositionsData ? openPositionsData.data : <span>Loading....</span>}
              </h1>
            </CardHeader>
            <CardFooter stats>Number of open positions in companies selected
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Companies</p>
              <h1 className={classes.cardTitle}>
                {skillsCompaniesCountData ? skillsCompaniesCountData.data["company_count"] : <span>Loading....</span>}
              </h1>
            </CardHeader>
            <CardFooter stats>
              Count of companies interested in
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <CalendarToday />
              </CardIcon>
              <p className={classes.cardCategory}>Events</p>
              <h1 className={classes.cardTitle}>Coming Soon...</h1>
            </CardHeader>
            <CardFooter stats>
             Number of events registered for
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Apps />
              </CardIcon>
              <p className={classes.cardCategory}>Skills</p>
              <h1 className={classes.cardTitle}>{skillsCompaniesCountData ? skillsCompaniesCountData.data["skills_count"] : <span>Loading....</span>}</h1>
            </CardHeader>
            <CardFooter stats>
              Current count of skills
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader >
              {/* <LineChart data={dailySalesChart.data} />
               */}
              <Chart
                width={'100%'}
                height={'500'}
                chartType="Line"
                ytitle="Probability %"
                loader={<div>Loading Chart</div>}
                data={chartData
                }
                options={{
                  
                  width: 650,
                  height: 300
                  
                  // series: {
                  //   // Gives each series an axis name that matches the Y-axis below.
                  //   0: { axis: 'Probability' },
                  // },
                  // axes: {
                  //   // Adds labels to each axis; they don't have to match the axis names.
                  //   y: {
                  //     Probability: { label: 'Probability %' },
                  //   },
                  // },
                }}
                rootProps={{ 'data-testid': '4' }}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Progress Tracker</h4>
              <p className={classes.cardCategory}>
                Shows the progress as skills update
              </p>
            </CardBody>
            {/* <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter> */}
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader>
              <ColumnChart data={skillsChart} xtitle="Skills" ytitle="Job Postings Count" messages={{ empty: "No data" }} />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Skill Required Count</h4>
              <p className={classes.cardCategory}>Shows the skills required in number of job postings</p>
            </CardBody>
            {/* <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter> */}
          </Card>
        </GridItem>
       
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {jobPostingData ? jobPostingData.data.map((jobPosting, index) => {
            return (
              <Card className={classes.card} key={index}>
                <CardHeader color={jobPosting.probability >= 25 ? jobPosting.probability >= 50 ? jobPosting.probability >= 75 ? "success" : "info" : "warning" : "danger"} >
                  <GridContainer>
                    <GridItem md={1}><Avatar
                      aria-label="recipe"
                      sizes="40px,40px"
                      src={getCompanyLogo(jobPosting.company)}
                      className={classes.bigAvatar}
                    ></Avatar></GridItem>
                    <GridItem md={10}><h2>{jobPosting.position}</h2></GridItem>
                    <GridItem md={1}><h2>{jobPosting.probability}%</h2></GridItem>
                  </GridContainer>
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Skills Required: {jobPosting.skillsRequired}</h4>
                  <p className={classes.cardCategory}>{jobPosting.description}</p>
                </CardBody>
                <CardFooter chart>

                  <a >{jobPosting.website}</a>
                </CardFooter>
              </Card>)
          }) : <span>Loading....</span>}
        </GridItem>
      </GridContainer>
    </Container>
  );
}
