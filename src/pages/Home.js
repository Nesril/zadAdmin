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
   console.log(programs);
  
  // Placeholder data for demonstration
  const [summary, setSummary] = useState({
    programs: 0,
    upcomingPrograms: 0,
    announcements: 0,
    transactions: 0,
    admins: 0,
  });
  
  useEffect(() => {
    if (programs?.programs && programs.programs.length > 0) {
      const today = new Date().toDateString();
  
      const activePrograms = programs.programs.filter(e => {
        const programDate = new Date(e.startingDate).toDateString();
        return programDate <= today;
      });
  
      const upcomingPrograms = programs.programs.filter(e => {
        const programDate = new Date(e.startingDate).toDateString();
        return programDate > today;
      });
  
      setSummary(prevSummary => ({
        ...prevSummary,
        programs: activePrograms.length,
        upcomingPrograms: upcomingPrograms.length,
      }));
    }
  }, [programs]);
  
  useEffect(() => {
    if (admins?.admins && admins.admins.length > 0) {
      setSummary(prevSummary => ({
        ...prevSummary,
        admins: admins.admins.length,
      }));
    }
  }, [admins]);
  
  

  const [recentActivity, setRecentActivity] = useState([]);
  useEffect(() => {
    if (activities?.activities && activities.activities.length > 0) {
        setRecentActivity(activities.activities)
    }
  }, [recentActivity]);

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
                    <Typography style={{paddingLeft:10,opacity:0.8}} key={activity.id}>{activity.description
                      }</Typography>
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
