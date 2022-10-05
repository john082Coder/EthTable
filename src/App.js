import "./App.css";
import * as ReactBootStrap from "react-bootstrap";
import { TxnFetch } from "./fetch";
import TransactionChart from "./components/TransactionChart";
import { useEffect, useState } from "react";
function App() {
  const [inData, setInData] = useState([]);
  const [outData, setOutData] = useState([]);

  let players = [
    {
      hash: "0xda00ac952421356247fd5717b60ba1e45765a985f96d41e3954fd1e9be3699c6",
      blockNumber: "10948508",
      from: "0xb6bef66e24a32a372d28e7d97c1da410a2a89662",
      to: "0xef524766eea8e9541fbbfdb10a02f5686cdee497",
      value: 0,
      in_out: "OUT",
    },
    {
      hash: "0xf9abd329358fb7db2ca2ace96bbd990e0ba0d659a180298e6725359110bac29e",
      blockNumber: "10948583",
      from: "0xb6bef66e24a32a372d28e7d97c1da410a2a89662",
      to: "0xef524766eea8e9541fbbfdb10a02f5686cdee497",
      value: 0,
      in_out: "OUT",
    },
    {
      hash: "0xd5ec3353a01528c6bb2cb5cd87b1428b16a54dd2392b8b1adfe6b4eb2ab42402",
      blockNumber: "11131843",
      from: "0xa7e4ef0a9e15bdef215e2ed87ae050f974ecd60b",
      to: "0xb6bef66e24a32a372d28e7d97c1da410a2a89662",
      value: 0.5,
      in_out: "OUT",
    },
    {
      hash: "0x0c0a5979989710814252787c94cc43e386211b57dc65410780a568b58b91c976",
      blockNumber: "11131864",
      from: "0xb6bef66e24a32a372d28e7d97c1da410a2a89662",
      to: "",
      value: 0,
      in_out: "OUT",
    },
    {
      hash: "0x0de5eea8e9753de26ef4b81bc8baa842932579110fd0b31f6140255785f12091",
      blockNumber: "11131875",
      from: "0xb6bef66e24a32a372d28e7d97c1da410a2a89662",
      to: "0x2eca93bfc9e78ab35b90a886fd456712edae0bf9",
      value: 0,
      in_out: "OUT",
    },
    {
      hash: "0xcef9d9db99e343b16f4103bb4b333825a509f30759de5b906f3d1bd6f1416d50",
      blockNumber: "11132366",
      from: "0xb6bef66e24a32a372d28e7d97c1da410a2a89662",
      to: "0x2eca93bfc9e78ab35b90a886fd456712edae0bf9",
      value: 0.08,
      in_out: "OUT",
    },
    {
      hash: "0x55100f5f7682ceadbce79f024d9f85e2710db5876e573ce0c40f81a529ac9bf3",
      blockNumber: "11136452",
      from: "0xb6bef66e24a32a372d28e7d97c1da410a2a89662",
      to: "0x66c71d8e8d058e48a6784f20e880ba4fc95bfba0",
      value: 0.8,
      in_out: "OUT",
    },
  ];
  const renderData = (players, index) => {
    return (
      <tr
        style={{ background: "#25312D", color: "#e2e2e2", borderRadius: "4px" }}
        key={index}
      >
        <td>
          {players.hash.substring(0, 6)}.....{players.hash.substring(0, 6)}
        </td>
        <td>{players.blockNumber}</td>
        <td>
          {players.from.substring(0, 6)}.....
          {players.from.substring(0, 6)}
        </td>
        <td>
          {players.to.substring(0, 6)}...
          {players.to.substring(0, 6)}
        </td>
        <td>{players.in_out}</td>
        <td>{players.value}</td>
      </tr>
    );
  };

  const dataHandler = async () => {
    const { GraphData_Out, GraphData_In } = await TxnFetch(
      "0xD4f6Cb0C1Fe07407b7098ac7Fe4265f3B2AE61f2"
    );
    setOutData(GraphData_Out.slice(Math.max(GraphData_Out.length - 5, 1)));

    setInData(GraphData_In.slice(Math.max(GraphData_In.length - 5, 1)));
  };
  useEffect(() => {
    dataHandler();
    // TODO  NEED TO PERFORM THIS ON BUTTON CLICK
  }, []);

  return (
    <div className="App container m-auto mt-5">
      <div className="d-flex" style={{ margin: "10px auto" }}>
        <div style={{ width: "40%" }}>
          <input style={{ width: "96%" }} type="text" placeholder="Address" />
        </div>
        <div style={{ width: "40%" }}>
          <select style={{ width: "96%" }} name="" id="">
            <option>Eth</option>
            <option>Solana</option>
          </select>
        </div>
        <div style={{ width: "20%" }}>
          <button style={{ width: "96%" }}>Search</button>
        </div>
      </div>
      <hr />
      {inData && outData && (
        <div className="d-flex align-items-center justify-content-center mb-4">
          <div style={{ width: "50%" }}>
            <h4 className="px-3 pt-2">Credit</h4>
            <TransactionChart data={inData} />
          </div>
          <div style={{ width: "50%" }}>
            <h4 className="px-3 pt-2">Debit</h4>
            <TransactionChart data={outData} />
          </div>
        </div>
      )}
      <ReactBootStrap.Table bordered size="sm">
        <thead>
          <tr
            style={{
              background: "#25312D",
              color: "#e2e2e2",
              borderRadius: "4px",
            }}
          >
            <th>TransactionHash</th>
            <th>BlockNumber</th>
            <th>From</th>
            <th>To</th>
            <th>IN/OUT</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>{players.map(renderData)}</tbody>
      </ReactBootStrap.Table>
    </div>
  );
}

export default App;
