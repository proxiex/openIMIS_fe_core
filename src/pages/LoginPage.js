import React, { useMemo, useState, useEffect } from "react";
import { useHistory } from "../helpers/history";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  Box, Grid,
  Paper,
  LinearProgress,
  Link,
  TextField,
  CssBaseline,
  Typography,
  Container,
} from "@material-ui/core";
import TextInput from "../components/inputs/TextInput";
import { useTranslations } from "../helpers/i18n";
import { useModulesManager } from "../helpers/modules";
import { useAuthentication } from "../helpers/hooks";
import Helmet from "../helpers/Helmet";
import Contributions from "./../components/generics/Contributions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}{new Date().getFullYear()}{' | All Rights Reserved | Privacy Policy.'}
    </Typography>
  );
}

const LOGIN_PAGE_CONTRIBUTION_KEY = "core.LoginPage";

export default function SignInSide({ logo, images: { login_bg}}) {

  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      background: `linear-gradient(357deg, rgb(49 54 42 / 80%) 0%, rgb(54 60 46 / 53%) 100%), linear-gradient(0deg, rgb(17 39 1 / 55%) 0%, rgb(17 39 1 / 42%) 100%), rgb(0 0 0 / 55%) url(${login_bg})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    footer: {
      padding: theme.spacing(3, 2),
      // marginTop: 'auto',
      position: "absolute",
      bottom: 0,
      width: "100%",
      // height: "2.5rem",
      background: "#F8F9FA",
    },
    h1: {
      fontFamily: "Inter",
      fontSize: "30px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "14px",
    },
    p: {
      fontFamily: "Inter",
      fontSize: "24px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "14px",
    },
    tagline: {
      width: "100%",
      color: "white",
      marginLeft: "5%",
      fontFamily: "Inter",
      fontSize: "20px",
      fontWeight: "400",
      lineHeight: "52.8px",
      marginTop: "calc(100vh - 350px)",
    },
  }));

  const classes = useStyles();
  const history = useHistory();
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("core.LoginPage", modulesManager);
  const [credentials, setCredentials] = useState({});
  const [hasError, setError] = useState(false);
  const auth = useAuthentication();
  const [isAuthenticating, setAuthenticating] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/");
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setAuthenticating(true);
console.log('--e--e-3-3 why not working na', credentials)
    if (await auth.login(credentials)) {
      history.push("/");
    } else {
      setError(true);
      setAuthenticating(false);
    }
  };

  const redirectToForgotPassword = (e) => {
    e.preventDefault();
    history.push("/forgot_password");
  };


  return (
    <>
     {isAuthenticating && (
        <Box position="absolute" top={0} left={0} right={0}>
          <LinearProgress className="bootstrap" />
        </Box>
      )}
      <Grid container component="main" disableGutters className={classes.root}>
      <Helmet title={formatMessage("pageTitle")} />
        <CssBaseline />
        <Grid item xs={false} sm={4} md={8} className={classes.image}>
          <div style={{ display: 'flex', margin: '5%', color: 'white' }}>
            <img className={classes.logo} style={{ width: '10%', height: '10%' }} src={logo} />
            <div style={{ marginLeft: '3%' }}>
              <h1 className={classes.h1}>Kano State Contributory Healthcare Management Agency</h1>
              <p className={classes.p}>Management Information System</p>
            </div>
          </div>
          <div className={classes.tagline}>
            <h1>Mutual bond to access quality healthcare...</h1>
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <div style={{ marginTop: '45%', width:'60%', marginLeft: 'auto', marginRight:'auto'}} className={classes.paper}>
            <div>
              <h1> Login to your account</h1>
              <p>Enter your email address and password to access  to your account.</p>
            </div>
            <div>
            {hasError && ( <Box color="error.main">{formatMessage("authError")}</Box> )}
            </div>
            <form style={{ width: '100%' }} onSubmit={onSubmit}>
              <TextInput
                variant="outlined"
                margin="normal"
                required
                readOnly={isAuthenticating}
                label={formatMessage("username.label")}
                fullWidth
                defaultValue={credentials.username}
                onChange={(username) => setCredentials({ ...credentials, username })}
              />
              <TextInput
                variant="outlined"
                margin="normal"
                required
                readOnly={isAuthenticating}
                type="password"
                label={formatMessage("password.label")}
                fullWidth
                onChange={(password) => setCredentials({ ...credentials, password })}
              />
              <Grid style={{ textAlign: 'right' }} item xs>
                <Link  onClick={redirectToForgotPassword} href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isAuthenticating || !(credentials.username && credentials.password)}
              >
                Login
              </Button>
              <Grid item>
                  <Button onClick={redirectToForgotPassword}>{formatMessage("forgotPassword")}</Button>
                  <Contributions contributionKey={LOGIN_PAGE_CONTRIBUTION_KEY} />
                </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
      <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Copyright />
          </Container>
      </footer>
   </>
  );
}