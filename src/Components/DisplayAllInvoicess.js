import React from "react";
import MainContainer from "./MainContainer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InvoiceRow from "./invoiceRow";
import CustomAlert from "./CustomAlert";
import ButtonToMainMenu from "./ButtonToMainMenu";

export default class DisplayAllInvoices extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingError: false,
      show: false,
      alertTitle: "",
      alertContent: "",
      invoicesData: [],
    };

    this.deleteInvoice = this.deleteInvoice.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  closeAlert() {
    this.setState({
      show: false,
    });
  }

  deleteInvoice(invoiceId) {
    fetch("/api/deleteinvoice/" + invoiceId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        //todo ok
        this.setState({
          show: true,
          alertTitle: "Invoice removed",
          alertContent: "The invoice was removed from the server",
        });

        const invoicesCopy = this.state.invoicesData;

        this.state.invoicesData.map((invoice, index) => {
          if (invoice.id === invoiceId) {
            //eliminando factura
            invoicesCopy.splice(index, 1);
            this.setState({
              invoicesData: invoicesCopy,
            });
          }
        });
      } else {
        //hubo error
        this.setState({
          show: true,
          alertTitle: "Problems...",
          alertContent: "The invoice was not removed...try again",
        });
      }
    });

    console.log("Quieres borrar una factura" + invoiceId);
  }

  componentDidMount() {
    //se ejecuta de forma automatica
    fetch("/api/readinvoice/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          //todo ok
          return response.json();
        } else {
          //hubo problemas
          throw new Error();
        }
      })
      .then((responseAsJson) => {
        let data = [];

        responseAsJson.map((item, index) => {
          data.push({
            id: item.id,
            description: item.invoiceDescription,
          });
        });

        this.setState((state, props) => {
          return {
            invoicesData: state.invoicesData.concat(data),
          };
        });

        console.log(responseAsJson);
      })
      .catch(() => {
        this.setState({
          fetchingError: true,
        });
        console.log("Hubo problemas");
      });
  }

  render() {
    console.log("@", this.state.invoicesData);
    if (this.state.fetchingError) {
      //error en el server
      return (
        <MainContainer head="Invoices Listing">
          <h3 style={{ textAlign: "center", color: "white" }}>
            There was a problem with the server,try again!
          </h3>
        </MainContainer>
      );
    }

    return (
      <MainContainer head="Invoices Listing">
        <Container style={{ color: "white" }}>
          <Row>
            <Col>
              <h5>Invoice Id</h5>
            </Col>
            <Col>
              <h5>Description</h5>
            </Col>
            <Col>
              <h5>Actions</h5>
            </Col>
          </Row>
          <InvoiceRow
            invoicesData={this.state.invoicesData}
            deleteInvoice={this.deleteInvoice}
          />
          <Row>
            <Col>
              <ButtonToMainMenu />
            </Col>
          </Row>
        </Container>
        <CustomAlert
          show={this.state.show}
          title={this.state.alertTitle}
          content={this.state.alertContent}
          close={this.closeAlert}
        />
      </MainContainer>
    );
  }
}
