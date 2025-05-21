import { createRoot } from 'react-dom/client'
import './scss/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import "./i18n.js"
import { BrowserRouter } from 'react-router'
import {Provider} from "react-redux";
import store from "./redux/store";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
  </BrowserRouter>,
)
