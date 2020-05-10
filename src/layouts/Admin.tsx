/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React , { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "../components/Navbars/AdminNavbar";
import AdminFooter from "../components/Footers/AdminFooter";
import Sidebar from "../components/Sidebar/Sidebar";

import routes from "../routes";
import { RouteInterface } from "global-interfaces";

interface PropsInterface {
  location: any;
  layout: string;
  path: string;
  icon: string;
  bgColor: string;
  routes: Array<RouteInterface>;
  name: string;
}

class Admin extends React.Component<PropsInterface> {
  componentDidUpdate() {
    document.documentElement.scrollTop = 0
  }

  getRoutes = (routes: Array<RouteInterface>) => {
    return routes.map((prop: RouteInterface, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={ prop.layout.concat(prop.path.toString()) }
            component={ prop.component }
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  
  getBrandText = (path: string) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  render() {
    return (
      <Fragment>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("../assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/admin/index" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default Admin;
