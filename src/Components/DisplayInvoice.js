import React from "react";
import MainContainer from "./MainContainer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PricesAndDescriptions from "./PricesAndDescriptions";
import ButtonToShowAllInvoices from "./ButtonToShowAllInvoices";

export default class DisplayInvoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingError: false,
      invoicedescription: "",
      sellername: "",
      selleraddress: "",
      customername: "",
      customeraddress: "",
      itemsInfo: [],
      termsandconditions: "",
      finalprice: 0,
      date: "",
      invoiceId: "",
    };
  }

  componentDidMount() {
    //este metodo se ejecuta automaticamente
    fetch("/api/readinvoice/" + this.props.invoiceId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          //todo salio bien
          return response.json();
        } else {
          //hubo problemas
          throw new Error();
        }
      })
      .then((responseAsJson) => {
        console.log(responseAsJson);
        this.setState({
          sellername: responseAsJson.sellername,
          selleraddress: responseAsJson.selleraddress,
          customername: responseAsJson.customername,
          customeraddress: responseAsJson.customeraddress,
          invoicedescription: responseAsJson.invoicedescription,
          date: responseAsJson.date,
          invoiceId: responseAsJson._id,
          itemname: responseAsJson.itemname,
          itemprice: responseAsJson.itemprice,
          termsandconditions: responseAsJson.terms,
          finalprice: responseAsJson.finalprice,
        });

        console.log(responseAsJson);
      })
      .catch(() => {
        this.setState({
          fetchingError: true,
        });
        console.log("hubo un problema");
      });
  }

  render() {
    if (this.state.fetchingError) {
      return (
        <MainContainer head="Invoice">
          <h2 style={{ color: "white" }}>
            Hubo un error con el servidor,vuelva a cargar la página
          </h2>
        </MainContainer>
      );
    }
    return (
      <MainContainer head="Invoice">
        <Container style={{ fontSize: "1.2em" }}>
          <Row style={{ marginTop: "2em" }}>
            <Col style={{ textAlign: "right", color: "white" }}>
              <h5>Seller's name and address</h5>
              {this.state.sellername}
              <br />
              {this.state.selleraddress}
            </Col>
          </Row>
          <Row style={{ marginTop: "2em" }}>
            <Col style={{ textAlign: "left", color: "white" }}>
              <h5>Customer's name and address</h5>
              {this.state.customername}
              <br />
              {this.state.customeraddress}
            </Col>
          </Row>
          <Row style={{ marginTop: "2em" }}>
            <Col style={{ textAlign: "left", color: "white" }}>
              <h5>Invoice Id and Date</h5>
              {this.state.invoiceId}
              <br />
              {new Date(this.state.date).toLocaleString()}
            </Col>
          </Row>
          <Row style={{ marginTop: "2em" }}>
            <Col style={{ textAlign: "left", color: "white" }}>
              <h5>Invoice Description</h5>
              {this.state.invoicedescription}
            </Col>
          </Row>
          <Row style={{ marginTop: "2em" }}>
            <Col style={{ textAlign: "left", color: "white" }}>
              <h5>Final Price</h5>
              {this.state.finalprice}
            </Col>
          </Row>
          <Row style={{ marginTop: "2em" }}>
            <Col style={{ textAlign: "left", color: "white" }}>
              <h5>Terms and Conditions</h5>
              {this.state.termsandconditions}
            </Col>
          </Row>
          <Row>
            <Col>
              <ButtonToShowAllInvoices />
            </Col>
          </Row>
        </Container>
      </MainContainer>
    );
  }
}
