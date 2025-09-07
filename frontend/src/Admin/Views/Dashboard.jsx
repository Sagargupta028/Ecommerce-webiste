// ** MUI Imports
import AdminPannel from "../../Styles/AdminPannelWrapper";
import Achivement from "../tables/Achivment";
import MonthlyOverview from "../tables/MonthlyOverView";
import WeeklyOverview from "../tables/WeeklyOverview";
import TotalEarning from "../tables/TotalEarning";
import CardStatsVertical from "../../Styles/CardStatsVertical";
import CustomersTable from "../tables/CustomersTable";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import { customTheme, darkTheme } from "../Theme/CustomTheme";
import "./Dashboard.css";
import RecentlyAddeddProducts from "../tables/RecentlyAddeddProducts";
import SalesOverTime from "../tables/SalesOverTime";
import RecentOrders from "../tables/RecentOrders";
import { BriefcaseVariantOutline, CurrencyUsd, HelpCircleOutline, Poll } from "mdi-material-ui";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardAnalytics } from '../../State/Analytics/Action';

const darkTheme1 = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#312d4b',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

// bg-[#28243d]
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { analytics } = useSelector(store => store);
  
  useEffect(() => {
    dispatch(getDashboardAnalytics());
  }, [dispatch]);

  const data = analytics.analytics;

  return (
    <div className="adminContainer ">
      <ThemeProvider theme={customTheme}>
        <AdminPannel>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Achivement />
            </Grid>
            <Grid item xs={12} md={8}>
              <MonthlyOverview />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <WeeklyOverview />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TotalEarning />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <CardStatsVertical
                    stats={`₹${data?.monthlyRevenue ? Math.round(data.monthlyRevenue / 1000) : 0}k`}
                    icon={<Poll />}
                    color="success"
                    trendNumber={`+${data?.revenueGrowth || 0}%`}
                    title="Total Profit"
                    subtitle="Monthly Revenue"
                  />
                </Grid>
                <Grid item xs={6}>
                  <CardStatsVertical
                    stats={data?.orderStatusCounts?.CANCELLED || 0}
                    title="Refunds"
                    trend="negative"
                    color="secondary"
                    trendNumber="-5%"
                    subtitle="Cancelled Orders"
                    icon={<CurrencyUsd />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CardStatsVertical
                    stats={data?.monthlyOrders || 0}
                    trend="positive"
                    trendNumber={`+${data?.revenueGrowth || 0}%`}
                    title="New Orders"
                    subtitle="Monthly Orders"
                    icon={<BriefcaseVariantOutline />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CardStatsVertical
                    stats={data?.orderStatusCounts?.PLACED || 0}
                    color="warning"
                    trend="positive"
                    trendNumber="+12%"
                    subtitle="Pending Orders"
                    title="Sales Queries"
                    icon={<HelpCircleOutline />}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            <CustomersTable />
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <RecentOrders />
            </Grid>
             <Grid item xs={12} md={12} lg={8}>
              <RecentlyAddeddProducts />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <SalesOverTime/>
            </Grid>
          </Grid>
        </AdminPannel>
      </ThemeProvider>
    </div>
  );
};

export default AdminDashboard;
