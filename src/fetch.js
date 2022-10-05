var jsonres = [];

export const TxnFetch = async (Address) => {
  const response = await fetch(
    `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${Address.toLowerCase()}&startblock=0&endblock=99999999&sort=asc&apikey=7Z1Z4TTFIGFT94JI8NS7NRZ5MIK6NASV96`
  );
  const JsonResponse = await response.json();
  // console.log(JsonResponse)

  for (let i = 0; i < JsonResponse.result.length; i++) {
    switch (true) {
      case JsonResponse.result[i].value > 5000:
        let jsonData = {};
        jsonData.hash = JsonResponse.result[i].hash;
        jsonData.timeStamp = JsonResponse.result[i].timeStamp;
        jsonData.date = new Date(
          jsonData.timeStamp * 1000
        ).toLocaleDateString();
        jsonData.blockNumber = JsonResponse.result[i].blockNumber;
        jsonData.from = JsonResponse.result[i].from;
        jsonData.to = JsonResponse.result[i].to;
        //console.log("jsonData.to",jsonData.to);
        jsonData.value = JsonResponse.result[i].value / 1e18;
        switch (true) {
          case jsonData.to === Address.toLowerCase():
            jsonData.in_out = "IN";
            break;
          case jsonData.from === Address.toLowerCase():
            jsonData.in_out = "OUT";
            break;
        }
        jsonres.push(jsonData);
        break;
    }
  }
  console.log("jsonres.length", jsonres.length);

  let Txn_Data = {},
    IN_Txn = [],
    OUT_Txn = [];
  console.log("JsonResponse.result.length", JsonResponse.result.length);
  console.log("Jjsonres.length", jsonres.length);
  for (let i = 0; i < jsonres.length; i++) {
    switch (true) {
      case jsonres[i].value > 0:
        switch (true) {
          case jsonres[i].to === Address.toLowerCase(): //case:IN
            let Single_txn_in = {};
            Single_txn_in.date = new Date(
              jsonres[i].timeStamp * 1000
            ).toLocaleDateString(); //jsonres[i].date;
            Single_txn_in.value = jsonres[i].value; //jsonres[i].value;
            IN_Txn.push(Single_txn_in);
            // jsonData.in_out = "IN";
            break;

          case jsonres[i].from === Address.toLowerCase(): //case:OUT
            let Single_txn_out = {};
            Single_txn_out.date = new Date(
              jsonres[i].timeStamp * 1000
            ).toLocaleDateString(); //jsonres[i].date;
            Single_txn_out.value = jsonres[i].value; //jsonres[i].value;
            OUT_Txn.push(Single_txn_out);
            //jsonData.in_out = "OUT";
            break;
        }
        break;
    }
    Txn_Data.IN = IN_Txn;
    Txn_Data.OUT = OUT_Txn;
  }
  let GraphData_In = [],
    GraphData_Out = [];
  for (let i = 0; i < Txn_Data.IN.length; ) {
    let graphData = {};
    let tempdate = Txn_Data.IN[i].date;
    let value = Txn_Data.IN[i].value;
    let valueRounded = parseFloat(value.toFixed(4));
    let counter = 1;
    for (let j = i + 1; j < Txn_Data.IN.length; j++) {
      if (Txn_Data.IN[j].date == tempdate) {
        counter++;
        value += Txn_Data.IN[j].value;
      } else {
        break;
      }
    }
    i += counter;
    graphData.date = tempdate;
    graphData.value = valueRounded;
    GraphData_In.push(graphData);
  }

  for (let i = 0; i < Txn_Data.OUT.length; ) {
    let graphData = {};
    let tempdate = Txn_Data.OUT[i].date;
    let value = Txn_Data.OUT[i].value;
    let valueRounded = parseFloat(value.toFixed(4));
    let counter = 1;
    for (let j = i + 1; j < Txn_Data.OUT.length; j++) {
      if (Txn_Data.OUT[j].date == tempdate) {
        counter++;
        value += Txn_Data.OUT[j].value;
      } else {
        break;
      }
    }
    i += counter;
    graphData.date = tempdate;
    graphData.value = valueRounded;
    GraphData_Out.push(graphData);
  }
  //console.log("Response",jsonres);

  //return(GraphData_Out,GraphData_In)
  return { jsonres, GraphData_Out, GraphData_In };
};

//chartData("0xb6bef66e24a32a372d28e7d97c1da410a2a89662");
//TxnFetch("0xb6bef66e24a32a372d28e7d97c1da410a2a89662");
//chartData("0xD4f6Cb0C1Fe07407b7098ac7Fe4265f3B2AE61f2");
//TxnFetch("0xb6bef66e24a32a372d28e7d97c1da410a2a89662");
//TxnFetch("0xd4f6cb0c1fe07407b7098ac7fe4265f3b2ae61f2");
