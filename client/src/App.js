import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CrearProducto from './views/CrearProducto';
import VerProductos from './views/VerProductos';
import DetalleProducto from './views/DetalleProducto';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch> 
          <Route exact path="crear-producto">
            <CrearProducto />
          </Route>
          <Route exact path="/detalle-producto/:id">
            <DetalleProducto/>
          </Route>
          <Route exact path="/actualizar-producto/:id">
            <CrearProducto />
          </Route>
          <Route exact path="/">
            <VerProductos/>
          </Route>
          
          <CrearProducto/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
