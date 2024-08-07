import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Typography, Card, CardContent } from "@mui/material";
import CommonSection from "../components/commonSection";
import Header from "../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import Theme from "../assets/css/theme";
import { width } from "@mui/system";

export default function Home() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const activities = useSelector((state) => state.activities);
  const programs = useSelector((state) => state.programs);
  const admins = useSelector((state) => state.admins);

   console.log(activities);
  
  // Placeholder data for demonstration
  const [summary, setSummary] = useState({
    programs: 10,
    upcomingPrograms: 3,
    announcements: 5,
    transactions: 5000,
    admins: 4,
  });
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, activity: "Admin X added a new program" },
    { id: 2, activity: "Admin Y posted an announcement" },
    { id: 3, activity: "Transaction #123 completed" },
  ]);
  const [notifications, setNotifications] = useState([
    "System update available",
    "2 pending transactions",
  ]);

  return (
    <Box sx={styles.container}>
      <CommonSection />
      <Header />

      <Box sx={styles.content}>
        <Typography variant="h4" sx={styles.welcomeMessage}>
          Welcome, {auth.info?.username}!
        </Typography>
        <Box sx={styles.cards}>
          <Grid sx={styles.cardsContainer} container spacing={2}>
            {/* Summary Statistics */}
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={styles.card}>
                <CardContent>
                  <Typography variant="h6">Active Programs</Typography>
                  <Typography variant="h4">{summary.programs}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={styles.card}>
                <CardContent>
                  <Typography variant="h6">Upcoming Programs</Typography>
                  <Typography variant="h4">{summary.upcomingPrograms}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={styles.card}>
                <CardContent>
                  <Typography variant="h6">Announcements</Typography>
                  <Typography variant="h4">{summary.announcements}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={styles.card}>
                <CardContent>
                  <Typography variant="h6">Total Transactions</Typography>
                  <Typography variant="h4">${summary.transactions}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={styles.card}>
                <CardContent>
                  <Typography variant="h6">Active Admins</Typography>
                  <Typography variant="h4">{summary.admins}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12}>
              <Card sx={styles.card}>
                <CardContent>
                  <Typography variant="h6">Recent Activity</Typography>
                  {recentActivity.map((activity) => (
                    <Typography key={activity.id}>{activity.activity}</Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>

          
          </Grid>
          
        </Box>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    background: `linear-gradient(-20deg,${Theme.COLOR_THEME_TWO} 0%, ${Theme.COLOR_THEME_ONE} 100%)`,
    minHeight: "90vh",
    padding: "120px 40px 30px 40px",
  },
  content: {
    position: "relative",
    top: "0px",
    width: "100%",
    zIndex: 2,
    color: 'white'
  },
  cards:{
     display:'flex',
     justifyContent:"center",
     alignItems:'center',
  },
  cardsContainer:{
    width:'70%',
    '@media(max-width:800)':{
      width:"90%"
    }
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    color: 'white',
    marginBottom: '20px',
  },
  welcomeMessage: {
    marginBottom: '30px',
    color:'#b2b8b4'
  },
};
