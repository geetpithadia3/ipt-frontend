import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import Apps from "@material-ui/icons/Apps";
import CalendarToday from "@material-ui/icons/CalendarToday";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "./tools/Grid/GridItem.js";
import GridContainer from "./tools/Grid/GridContainer.js";
import Table from "./tools/Table/Table.js";
import Tasks from "./tools/Tasks/Tasks.js";
import CustomTabs from "./tools/CustomTabs/CustomTabs.js";
import Danger from "./tools/Typography/Danger.js";
import Card from "./tools/Card/Card.js";
import CardHeader from "./tools/Card/CardHeader.js";
import CardIcon from "./tools/Card/CardIcon.js";
import CardBody from "./tools/Card/CardBody.js";
import CardFooter from "./tools/Card/CardFooter.js";
import MenuAppBar from "./ToolBar"
import { bugs, website, server } from "variables/general.js";
import { useHttpGet, useHttpPost } from "./http";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../variables/charts.js";
import { APILinks } from './apisLink';

import styles from "../assets/jss/material-dashboard-react/views/dashboardStyle";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles()
  const companyList = {
    "companyList":[
      {
        "companyName":"BlackBerry"
      },
      {
        "companyName":"Microsoft"
      }
    ]
  }
  const [skillsLoading,skillsData]= useHttpGet(APILinks.getSkillsCountUrl() ,[ ])
  const [openPositionsLoading,openPositionsData]= useHttpGet(APILinks.getOpenPositionCountUrl() ,companyList,[ ])
  const [skillsCompaniesCountLoading,skillsCompaniesCountData]= useHttpGet(APILinks.getSkillsCompaniesCountUrl() ,companyList,[ ])

  const skillsChart = {
    labels: skillsData? Object.keys(skillsData.data): [],
    series: [skillsData? Object.values(skillsData.data): []]
  }
  
  return (
    <div>
      <MenuAppBar/>
      <GridContainer  style={{marginTop:'70px !important'}}>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Open Positions</p>
              <h1 className={classes.cardTitle}>
                {openPositionsData? openPositionsData.data: <span>Loading....</span>}
              </h1>
            </CardHeader>
            <CardFooter stats>
              {/* <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div> */}
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
                {skillsCompaniesCountData? skillsCompaniesCountData.data.companies: <span>Loading....</span>}
              </h1>
            </CardHeader>
            <CardFooter stats>
              {/* <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <CalendarToday/>
              </CardIcon>
              <p className={classes.cardCategory}>Events</p>
              <h1 className={classes.cardTitle}>7</h1>
            </CardHeader>
            <CardFooter stats>
              {/* <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div> */}
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
              <h1 className={classes.cardTitle}>5</h1>
            </CardHeader>
            <CardFooter stats>
              {/* <div className={classes.stats}>
                <Update />
                Just Updated
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader >
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader>
              <ChartistGraph
                className="ct-chart"
                data={skillsChart}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader>
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem> */}
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {companyList["companyList"].map((c,index)=>{
            return (<Card >
              <CardHeader color={[
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ][index%5]}>
                <h3>{c.companyName}</h3>
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>Last Campaign Performance</p>
              </CardBody>
              <CardFooter chart>
                
                Some weblink
              </CardFooter>
            </Card>)
          })}
          {/* <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              }
            ]}
          /> */}
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem> */}
      </GridContainer>
    </div>
  );
}
