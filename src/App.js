import { useCallback, useState } from "react";
import { Circles } from "./components/Circles/Circles";
import { Chart } from "./components/Charts";
import { CirclePacking } from "./components/CirclePacking";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  const [data, setData] = useState([10, 20, 30, 40, 50, 60, 70, 80]);
  const updateData = useCallback(() => {
    const count = 5 + Math.round(Math.random() * 15);
    const values = [];
    for (let i = 0; i < count; i++) {
      values[i] = 10 + Math.round(Math.random() * 70);
    }
    setData(values);
  }, []);

  return (
    <>
      <Router>
        <div style={{ display: "flex" }}>
          <nav style={{ width: "300px" }}>
            <ul>
              <li>
                <Link to="/circles">Circles</Link>
              </li>
              <li>
                <Link to="/chart">Chart</Link>
              </li>
              <li>
                <Link to="/circle-packing">Circle Packing</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/circles">
              <Circles data={data} updateData={updateData} />
            </Route>
            <Route path="/chart">
              <Chart />
            </Route>
            <Route path="/circle-packing">
              <CirclePacking />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
