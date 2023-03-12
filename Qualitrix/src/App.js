import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';

const HomePage = React.lazy(() => import('pages/HomePage'));
// Web Page
const DashboardPage = React.lazy(() => import('pages/Web/DashboardPage'));
const ExecutionLabPage = React.lazy(() => import('pages/Web/ExecutionLabPage'));
const TestScripts = React.lazy(() => import('pages/Web/TestScripts'));
const TestAttribute = React.lazy(() => import('pages/Web/TestAttribute'));
const LocatorProperty = React.lazy(() => import('pages/Web/LocatorProperty'));
const TestData = React.lazy(() => import('pages/Web/TestData'));
const UpdateTestScript = React.lazy(() => import('pages/Web/UpdateTestScript'));
const CustomFunction = React.lazy(() => import('pages/Web/CustomFunction'));
const SeleniumGrid = React.lazy(() => import('pages/Web/SeleniumGrid'));
const Configuration = React.lazy(() => import('pages/Web/Configuration'));
const CICDSupport = React.lazy(() => import('pages/Web/CICDSupport'));
// API Page
const APIConfiguration = React.lazy(() => import('pages/API/Configuration'));
const APIScripts = React.lazy(() => import('pages/API/APIScripts'));
const UpdateAPIScripts = React.lazy(() => import('pages/API/UpdateAPIScripts'));
const APIExecutionLabPage = React.lazy(() => import('pages/API/ExecutionLabPage'));
const APIDashboardPage = React.lazy(() => import('pages/API/APIDashboard'));
const APICICDPage = React.lazy(() => import('pages/API/APICICD'));
const APISwagger = React.lazy(() => import('pages/API/APISwagger'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {

  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />
            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/auwebdashboard" component={DashboardPage} />
                <Route exact path="/auwebexecutionlabpage" component={ExecutionLabPage} />
                <Route exact path="/auwebtestscripts" component={TestScripts} />
                <Route exact path="/auwebtestattribute" component={TestAttribute} />
                <Route exact path="/auweblocatorproperty" component={LocatorProperty} />
                <Route exact path="/auwebtestdata" component={TestData} />
                <Route exact path="/auwebupdatetestscript" component={UpdateTestScript} />
                <Route exact path="/auwebcustomfunction" component={CustomFunction} />
                <Route exact path="/auwebseleniumgrid" component={SeleniumGrid} />
                <Route exact path="/auwebconfiguration" component={Configuration} />
                <Route exact path="/auwebcicd" component={CICDSupport} />
                <Route exact path="/auapiconfiguration" component={APIConfiguration} />
                <Route exact path="/auapiapiscripts" component={APIScripts} />
                <Route exact path="/auapiupdateapiscripts" component={UpdateAPIScripts} />
                <Route exact path="/auapiexecutionlabpage" component={APIExecutionLabPage} />
                <Route exact path="/auapicicd" component={APICICDPage} />
                <Route exact path="/auapidashboard" component={APIDashboardPage} />
                <Route exact path="/auapiswaggerscripts" component={APISwagger} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
