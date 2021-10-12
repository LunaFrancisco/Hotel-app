import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Components
// import MiniWidgets from "./MiniWidgets";
import MiniWidgets from "../../components/Common/MiniWidgets";
import CajaGraph from "./CajaGraph";
import UsersTable from "./UsersTable";
import RecentlyRegistros from "./RecentlyRegistros";
import RevenueAnalytics from "./RevenueAnalytics";
import SalesAnalytics from "./SalesAnalytics";
import EarningReports from "./EarningReports";
import Sources from "./Sources";
import RecentlyActivity from "./RecentlyActivity";
import RevenueByLocations from "./RevenueByLocations";
import ChatBox from "./ChatBox";
import LatestTransactions from "./LatestTransactions";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Dashboard", link: "#" },
            ],
            reports: [
                { icon: "ri-stack-line", title: "Number of Sales", value: "1452", rate: "2.4%", desc: "From previous period" },
                { icon: "ri-store-2-line", title: "Sales Revenue", value: "$ 38452", rate: "2.4%", desc: "From previous period" },
                { icon: "ri-briefcase-4-line", title: "Average Price", value: "$ 15.4", rate: "2.4%", desc: "From previous period" },
            ]
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        <Breadcrumbs title="Dashboard" breadcrumbItems={this.state.breadcrumbItems} />
                        <Row>
                            <MiniWidgets
                                title="Caja"
                                value={`$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`}
                                // icon="ri-stack-line"
                                rate={(Math.random() * (5 - -5) + -5).toFixed(2)}
                                desc="Desde el mes anterior"
                            />
                            <MiniWidgets
                                title="Ventas"
                                value={`$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`}
                                // icon="ri-stack-line"
                                rate={(Math.random() * (5 - -5) + -5).toFixed(2)}
                                desc="Desde el mes anterior"
                            />
                            <MiniWidgets
                                title="Gastos"
                                value={`$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`}
                                // icon="ri-add-fill"
                                rate={(Math.random() * (5 - -5) + -5).toFixed(2)}
                                desc="Desde el mes anterior"
                                negative
                            />
                            <MiniWidgets
                                title="Retiros"
                                value={`$ ${Math.round(Math.random() * 10000).toLocaleString("es-CL")}`}
                                // icon=" ri-add-fill"
                                rate={(Math.random() * (5 - -5) + -5).toFixed(2)}
                                desc="Desde el mes anterior"
                                negative
                            />

                            <Col xl={12}>
                                <CajaGraph />
                            </Col>

                            <Col xl={8}>
                                <UsersTable />
                            </Col>

                            <Col xl={4}>
                                <RecentlyRegistros />
                            </Col>

                            {/* <Col xl={4}>

                                <SalesAnalytics />

                                <EarningReports />

                            </Col> */}
                        </Row>


                        {/* <Row>
                            <Sources />

                            <RecentlyActivity />

                            <RevenueByLocations />

                        </Row>

                        <Row>
                            <ChatBox />

                            <LatestTransactions />
                        </Row> */}

                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
