import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  DARK_GREY,
  Data,
  GraphCard,
  H2,
  H3,
  Header,
  Ids,
  Layout,
} from "./AppStyles";

interface WSData {
  id: string;
  timestamp: number;
  temperature: number;
  data: number;
}

const App = () => {
  const [plot1Data, setPlot1Data] = useState<WSData[]>([]);
  const [plot2Data, setPlot2Data] = useState<WSData[]>([]);
  const [temperatures, setTemperatures] = useState<number[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8999");

    ws.onopen = () => {
      toast.success("WebSocket connected", {
        position: "top-right",
      });
    };

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      const temperatures = newData.map((data: WSData) => data.temperature);
      setTemperatures(temperatures);
      // plot data - only 5 minutes data and not bigger than 100
      if (
        newData[0].timestamp >= Date.now() - 300000 &&
        newData[0].data <= 100
      ) {
        setPlot1Data((prevData) => [...prevData, newData[0]]);
      }
      if (
        newData[1].timestamp >= Date.now() - 300000 &&
        newData[1].data <= 100
      ) {
        setPlot2Data((prevData) => [...prevData, newData[1]]);
      }
    };

    ws.onerror = () => {
      toast.error("WebSocket disconnected", {
        position: "top-right",
      });
    };

    return () => {
      if (ws.readyState === 1) {
        ws.close();
      }
    };
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <Layout>
        <Header>
          <H2>WILIOT</H2>
          <H3>Test</H3>
        </Header>
        <Data>
          <Ids>
            <Card>
              <H2>ID 1</H2>
              <H3>{`Temp: ${
                temperatures[0] ? `${temperatures[0]} C` : "Unknown"
              }`}</H3>
            </Card>
            <Card>
              <H2>ID 2</H2>
              <H3>{`Temp: ${
                temperatures[1] ? `${temperatures[1]} C` : "Unknown"
              }`}</H3>
            </Card>
          </Ids>
          <GraphCard>
            <Plot
              data={[
                {
                  x: plot1Data.map((data) => new Date(data.timestamp)),
                  y: plot1Data.map((data) => data.temperature),
                  type: "scatter",
                  mode: "lines",
                  marker: { color: "purple" },
                  name: "1",
                },
                {
                  x: plot2Data.map((data) => new Date(data.timestamp)),
                  y: plot2Data.map((data) => data.temperature),
                  type: "scatter",
                  mode: "lines",
                  marker: { color: "blue" },
                  name: "2",
                },
              ]}
              layout={{
                width: 1300,
                height: 600,
                title: "DATA",
                font: {
                  color: DARK_GREY,
                  family: "Montserrat",
                },
              }}
              config={{ displayModeBar: false }}
            />
          </GraphCard>
        </Data>
      </Layout>
    </React.Fragment>
  );
};

export default App;
