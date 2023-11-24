import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import RoutesList from './RoutesList';
import './index.css';


const container = document.getElementById('result')
const root = createRoot(container)
root.render(<RoutesList />);