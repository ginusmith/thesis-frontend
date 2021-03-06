import React, { Component } from 'react';
import {ACCESS_TOKEN, RESTHOST} from "../../../../constants/index";
import './Course.css';
import {Button, Card, CardHeader, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, InputGroup, Input} from "reactstrap";
import {get} from "../../../../user/UserUtils";
import NewTestModal from "./NewTestModal";
import classnames from 'classnames';
import Topbar from '../../../Global/Topbar/Topbar';
import FileModal from "./FileModal";
import LinkModal from "./LinkModal";
import pdf from "../../../../../src/assets/img/pdf.png";
import {Link} from "react-router-dom";

export class Course extends Component{
    constructor (props) {
        super(props);

        this.state = {
            name: '',
            tests: [],
            loading: true,
            activeTab: '1',
            users: []
        }

        this.courseId = this.props.match.params.id;
        this.name ='';

        this.changeName = this.changeName.bind(this);
        this.getTests = this.getTests.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.renderCols = this.renderCols.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
        this.toTest = this.toTest.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            this.props.history.push("/login");
        }
    }

    componentDidMount() {
        Promise.all([
            this.getTests(),
            this.getUsers()
        ])
            .then(() => {
                this.setState({loading: false});
            }
        );
    }

    getTests() {
        return get({
            url: RESTHOST + '/test/findAll',
            data: {courseId: this.courseId}
        })
            .then(response => {
                this.setState({tests: response.body});
            });
    }

    getUsers() {
        return get({
            url: RESTHOST + '/user/findAll'
        })
            .then(response => {
                this.setState({users: response.body});
            });
    }


    renderCards = () => {
        let rows = [];

        let count = this.state.tests.length;

        let numInRow = 3;

        for (let i=0; i<=count/numInRow; i+=1) {
            let egySlice = this.state.tests.slice(i*numInRow, (i+1)*numInRow);

            rows.push(
                <Row className="mb-3">
                    {this.renderCols(egySlice)}
                </Row>);
        }

        return rows;
    }

    renderCols = (egySlice) => {
        let cols = [];

        egySlice.forEach( s => {
                cols.push(
                    <Col md="4">
                        <Card onClick={() => this.toTest(s.id)}>
                            <CardHeader className="testH">
                                <Row>
                                    <Col md="8">
                                        <h5 className="names">{s.name}</h5>
                                    </Col>
                                    <Col md="2">
                                        <Button outline color="darkBlue" className="butp">
                                            <i className="fa fa-pencil"  aria-hidden="true"/>
                                        </Button>
                                    </Col>
                                    <Col md="1">
                                        <Button outline color="darkBlue" className="butt">
                                            <i className="fa fa-trash" aria-hidden="true"/>
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                        </Card>
                    </Col>
                )
            }
        )

        return cols;
    }

    studentButtons (email) {
        if (email !== "student@test.com") {
            return (
                <Button color="lightBlue">
                    <i className="fa fa-user-plus" aria-hidden="true"/>
                </Button>
            )
        }
        else {
            return (
                <Button color="darkBlue">
                    <i className="fa fa-trash-o" aria-hidden="true"/>
                </Button>
            )
        }
    }

    renderUsers = () => {
        let rows = [];

        this.state.users.forEach( r => {
                rows.push(
                    <Row>
                        <Col className="col-md-3">
                            {r.email}
                        </Col>
                        <Col className="col-md-3">
                            {this.studentButtons(r.email)}
                        </Col>
                    </Row>
                );
            rows.push(<hr/>);
            }
        )

        return rows;
    }

    toTest(id) {
        this.props.history.push("/test/" + id);
    }

    changeName  = (event) => {
        this.setState({name: event.target.value});
    }

    toggle (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render () {
        if(this.state.loading) {
            return <div>
                Loading...
            </div>
        }

        return (
            <div>
                <Topbar/>
                <br/>
                <div class="tableDiv">
                    <Row>
                        <Col>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}>
                                            Materials
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggle('2'); }}>
                                            Tests
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '3' })}
                                        onClick={() => { this.toggle('3'); }}>
                                        Students
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <br/>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <Row>
                                        <Col sm="12">
                                            <Row className="d-flex justify-content-end">
                                                <FileModal/>
                                                <LinkModal/>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <Row>
                                                        <h5>Files:</h5>
                                                    </Row>
                                                    <Row>
                                                        <Col md="1"/>
                                                        <Col>
                                                            <img src={pdf} alt="pdf" className="pdf"/>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="1"/>
                                                        <Col>
                                                            <p className="szoveg">pdf.pdf</p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col md="6">
                                                    <Row>
                                                        <h5>Links:</h5>
                                                    </Row>
                                                    <Row>
                                                        <Col md="1"/>
                                                        <Col>
                                                            <Link to="www.google.com">http://localhost:8080/course/95</Link>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row className="d-flex justify-content-end">
                                        <NewTestModal id={this.courseId} getTests={this.getTests}/>
                                    </Row>
                                    <div className="tableDiv justify-content-center">
                                        {this.renderCards()}
                                    </div>
                                </TabPane>
                                <TabPane tabId="3">
                                    <div>
                                        <Row>
                                            <Col className="col-md-3">
                                                <InputGroup>
                                                    <Input type="text" placeholder="Search..."/>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <br/>
                                    <div className="tableDiv justify-content-center">
                                        {this.renderUsers()}
                                    </div>
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Course;