import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  {id_persona: 1, no_persona: "Juan", ap_persona: "Henandez", ci_persona: "5.962.586", sx_persona: "Masulino"},
  {id_persona: 2, no_persona: "Jan", ap_persona: "Henndez", ci_persona: "2962.586", sx_persona: "Masci_personano"},
  {id_persona: 3, no_persona: "Jun", ap_persona: "Herandez", ci_persona: "25962.586", sx_persona: "Mculino"},
  {id_persona: 4, no_persona: "Jua", ap_persona: "ernandez", ci_persona: "25.62.586", sx_persona: "asculino"},
  {id_persona: 5, no_persona: "uan", ap_persona: "Hrnandez", ci_persona: "25.962.586", sx_persona: "Masclino"},
  {id_persona: 6, no_persona: "Jsuan", ap_persona: "nandez", ci_persona: "25.2.586", sx_persona: "Masulino"},
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id_persona: "",
      no_persona: "",
      ap_persona: "",
      ci_persona: "",
      sx_persona:"",

    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id_persona == registro.id_persona) {
        arreglo[contador].no_persona = dato.nombre;
        arreglo[contador].ap_persona = dato.ap_persona;
        arreglo[contador].ci_persona = dato.ci_persona;
        arreglo[contador].sx_persona = dato.sx_persona;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id_persona);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id_persona == registro.id_persona) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };
  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id_persona=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cedula</th>
                <th>Sexo</th>
                <th>Accion</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id_persona}>
                  <td>{dato.id_persona}</td>
                  <td>{dato.no_persona}</td>
                  <td>{dato.ap_persona}</td>
                  <td>{dato.ci_persona}</td>
                  <td>{dato.sx_persona}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id_persona}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre
              </label>
              <input
                className="form-control"
                name="no_persona"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.no_persona}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellido 
              </label>
              <input
                className="form-control"
                name="ap_persona"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.ap_persona}
              />
              
            </FormGroup>

            <FormGroup>
              <label>
                CI:
              </label>
              <input
                className="form-control"
                name="ci_persona"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.ci_persona}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Sexo:
              </label>
              <input
                className="form-control"
                name="sx_persona"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.sx_persona}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Persona</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>

              <input
                className="form-control"
                name="no_persona"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellido: 
              </label>

              <input
                className="form-control"
                name="ap_persona"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup> 
            
            <FormGroup>
              <label>
                CI: 
              </label>
              <input
                className="form-control"
                name="ci_persona"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Sexo:
              </label>
              <input
                className="form-control"
                name="sx_persona"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;