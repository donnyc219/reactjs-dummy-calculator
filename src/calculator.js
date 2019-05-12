import React from 'react';
import './index.css';
import Key from './key';
import Display from './display';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Calculator extends React.Component {

//     <div className="calculator">
//     <div className="row"><Display /></div>
//     <div className="row"><Key keyValue="AC"/><Key keyValue="+/-"/><Key keyValue="%"/><Key keyValue="&#247;"/></div>
//     <div className="row"><Key keyValue="7"/><Key keyValue="8"/><Key keyValue="9"/><Key keyValue="&times;"/><br/></div>
//     <div className="row"><Key keyValue="4"/><Key keyValue="5"/><Key keyValue="6"/><Key keyValue="-"/></div>
//     <div className="row"><Key keyValue="1"/><Key keyValue="2"/><Key keyValue="3"/><Key keyValue="+"/></div>
//     <div className="row"><Key keyValue="0"/><Key keyValue="."/><Key keyValue="="/></div>
// </div>
    render() {

        return (

            <Container className="calculator">
                <Row noGutters="true"><Col><Display /></Col></Row>
                <Row noGutters="true">
                    <Col><Key keyValue="AC"/></Col>
                    <Col><Key keyValue="+/-"/></Col>
                    <Col><Key keyValue="%"/></Col>
                    <Col><Key keyValue="&#247;"/></Col>
                </Row>

                <Row noGutters="true">
                    <Col><Key keyValue="7"/></Col>
                    <Col><Key keyValue="8"/></Col>
                    <Col><Key keyValue="9"/></Col>
                    <Col><Key keyValue="&times;"/></Col>
                </Row>

                <Row noGutters="true">
                    <Col><Key keyValue="4"/></Col>
                    <Col><Key keyValue="5"/></Col>
                    <Col><Key keyValue="6"/></Col>
                    <Col><Key keyValue="-"/></Col>
                </Row>

                <Row noGutters="true">
                    <Col><Key keyValue="1"/></Col>
                    <Col><Key keyValue="2"/></Col>
                    <Col><Key keyValue="3"/></Col>
                    <Col><Key keyValue="+"/></Col>
                </Row>

                <Row noGutters="true">
                    <Col xs={6}><Key keyValue="0"/></Col>
                    <Col><Key keyValue="."/></Col>
                    <Col><Key keyValue="="/></Col>
                </Row>

            </Container>
        );
    }
}

export default Calculator;