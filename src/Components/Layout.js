import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CustomTextArea from "./CustomTextArea";
import CustomTextField from "./CustomTextField";
import CustomAlert from "./CustomAlert";
import CustomCard from "./CustomCard";
import ButtonToMainMenu from "./ButtonToMainMenu";
import ButtonToShowAllInvoices from "./ButtonToShowAllInvoices";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoicedescription: "",
      sellername: "",
      selleraddress: "",
      customername: "",
      customeraddress: "",
      termsandconditions: "",
      finalprice: 0,
      show: false,
      title: "",
      content: "",
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.createInvoice = this.createInvoice.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.updateInvoice = this.updateInvoice.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.updateMode || !this.props.invoiceId) {
      return;
    }

    //este metodo se ejecuta automaticamente
    fetch("/api/readinvoice/" + this.props.invoiceId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Hubo problemas con el servidor");
        }
      })
      .then((responseAsJson) => {
        //si todo sale bien
        this.setState({
          invoicedescription: responseAsJson.invoicedescription,
          sellername: responseAsJson.sellername,
          selleraddress: responseAsJson.selleraddress,
          customername: responseAsJson.customername,
          customeraddress: responseAsJson.customeraddress,
          // itemsInfo : responseAsJson.items,
          finalprice: responseAsJson.finalprice,
          termsandconditions: responseAsJson.terms,
        });
        console.log(responseAsJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  closeAlert() {
    this.setState({
      show: false,
    });
  }

  updateInvoice(event) {
    const data = {
      sellername: this.state.sellername,
      selleraddress: this.state.selleraddress,
      customername: this.state.customername,
      customeraddress: this.state.customeraddress,
      finalprice: this.state.finalprice,
      terms: this.state.termsandconditions,
      invoicedescription: this.state.invoicedescription,
    };

    fetch("/api/updateInvoice/" + this.props.invoiceId, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        //todo se actualizo bien
        this.setState({
          show: true,
          title: "The invoice was updated succesfully",
          content: "The invoice was saved on the system",
        });
      } else {
        //hubo un fallo
        this.setState({
          show: true,
          title: "Problems when updating",
          content: "The invoice couldnt be updated",
        });
      }
    });

    event.preventDefault();
  }

  createInvoice(event) {
    const data = {
      sellername: this.state.sellername,
      selleraddress: this.state.selleraddress,
      customername: this.state.customername,
      customeraddress: this.state.customeraddress,
      items: this.state.itemsInfo,
      finalprice: this.state.finalprice,
      terms: this.state.termsandconditions,
      invoicedescription: this.state.invoicedescription,
    };

    fetch("/api/createinvoice", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        //todo fue exitoso
        this.setState({
          show: true,
          title: "The invoice was created succesfully",
          content: "The invoice was saved on the system",
        });
      } else {
        //hubo un fallo
        this.setState({
          show: true,
          title: "Oops!! The invoice was not created",
          content: "Try again...",
        });
      }
    });
    event.preventDefault();
  }

  // clickHandler() {
  //   this.setState((state, props) => {
  //     const currentItems = state.itemsInfo;

  //     let totalPrice = 0;
  //     state.itemsInfo.map((item, index) => {
  //       let price = parseFloat(item.price);
  //       totalPrice = totalPrice + price;
  //     });

  //     totalPrice = totalPrice + parseFloat(state.itemPrice);

  //     return {
  //       itemsInfo: currentItems.concat([
  //         {
  //           description: state.itemDescription,
  //           price: state.itemPrice,
  //         },
  //       ]),
  //       finalprice: totalPrice,
  //     };
  //   });
  // }

  inputHandler(event) {
    if (event.target.name === "invoice-description") {
      this.setState({
        invoicedescription: event.target.value,
      });

      console.log("Invoice description: " + event.target.value);
    }

    if (event.target.name === "sellername") {
      this.setState({
        sellername: event.target.value,
      });

      console.log("Seller Name: " + event.target.value);
    }

    if (event.target.name === "selleraddress") {
      this.setState({
        selleraddress: event.target.value,
      });

      console.log("Seller Address: " + event.target.value);
    }

    if (event.target.name === "customername") {
      this.setState({
        customername: event.target.value,
      });

      console.log("Customer Name: " + event.target.value);
    }

    if (event.target.name === "customeraddress") {
      this.setState({
        customeraddress: event.target.value,
      });

      console.log("Customer Address: " + event.target.value);
    }

    if (event.target.name === "itemDescription") {
      this.setState({
        itemDescription: event.target.value,
      });

      console.log("Item Description: " + event.target.value);
    }

    if (event.target.name === "itemPrice") {
      this.setState({
        itemPrice: event.target.value,
      });

      console.log("Item Price: " + event.target.value);
    }

    if (event.target.name === "termsandconditions") {
      this.setState({
        termsandconditions: event.target.value,
      });

      console.log("Terms and Conditions " + event.target.value);
    }

    if (event.target.name === "finalprice") {
      this.setState({
        finalprice: event.target.value,
      });

      console.log("Price " + event.target.value);
    }
  }

  handleSubmit(event) {
    if (this.props.updateMode) {
      //se quiere actualizar factura
      this.updateInvoice(event);
    }
    if (!this.props.updateMode)
      //se quiere crear una factura
      this.createInvoice(event);
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Container>
            <Row style={{ marginTop: "2em" }}>
              <Col>
                <CustomCard head="Invoice Description">
                  <CustomTextArea
                    name="invoice-description"
                    label="Invoice Description"
                    val={this.state.invoicedescription}
                    changeHandler={this.inputHandler}
                  />
                </CustomCard>
              </Col>
            </Row>
            <Row style={{ marginTop: "2em" }}>
              <Col>
                <CustomCard head="SELLERS INFORMATION">
                  <CustomTextField
                    customId="seller-name"
                    label="Seller's name"
                    val={this.state.sellername}
                    name="sellername"
                    placeholder="Enter name..."
                    changeHandler={this.inputHandler}
                    aid="Enter the full name"
                  />
                  <CustomTextField
                    customId="seller-address"
                    label="Seller's address"
                    val={this.state.selleraddress}
                    name="selleraddress"
                    placeholder="Enter address..."
                    changeHandler={this.inputHandler}
                    aid="Enter the full address"
                  />
                </CustomCard>
              </Col>
              <Col>
                <CustomCard head="CUSTOMERS INFORMATION">
                  <CustomTextField
                    customId="customer-name"
                    label="Customer's name"
                    val={this.state.customername}
                    name="customername"
                    placeholder="Enter name..."
                    changeHandler={this.inputHandler}
                    aid="Enter the full name"
                  />
                  <CustomTextField
                    customId="customer-address"
                    label="Customer's address"
                    val={this.state.customeraddress}
                    name="customeraddress"
                    placeholder="Enter address..."
                    changeHandler={this.inputHandler}
                    aid="Enter the full address"
                  />
                </CustomCard>
              </Col>
            </Row>
            <Row style={{ marginTop: "2em" }}>
              <Col>
                <CustomCard head="TOTAL PRICE">
                  <CustomTextField
                    customId="finalprice"
                    label="Price"
                    val={this.state.finalprice}
                    name="finalprice"
                    placeholder="Enter price..."
                    changeHandler={this.inputHandler}
                    aid="Enter the price"
                  />
                </CustomCard>
              </Col>
            </Row>
            <Row style={{ marginTop: "2em" }}>
              <Col>
                <CustomCard head="TERMS AND CONDITIONS">
                  <CustomTextArea
                    label="Terms and Conditions"
                    name="termsandconditions"
                    val={this.state.termsandconditions}
                    changeHandler={this.inputHandler}
                  />
                </CustomCard>
              </Col>
            </Row>
            <Row style={{ marginTop: "2em" }}>
              <Col>
                <Card>
                  <Card.Body>
                    {this.props.updateMode ? (
                      <React.Fragment>
                        <Button
                          type="submit"
                          style={{ marginTop: "2em" }}
                          variant="warning"
                          size="lg"
                        >
                          Update Invoice
                        </Button>
                        <ButtonToShowAllInvoices />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Button
                          type="submit"
                          style={{ marginTop: "2em" }}
                          variant="primary"
                          size="lg"
                        >
                          Create Invoice
                        </Button>
                        <ButtonToMainMenu />
                      </React.Fragment>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Form>
        <CustomAlert
          show={this.state.show}
          title={this.state.title}
          content={this.state.content}
          close={this.closeAlert}
        />
      </div>
    );
  }
}
