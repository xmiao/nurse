import React, {useState} from 'react';
import './App.css';

const App: React.FC = () => {
    const [voiceCommand, setCommand] = useState("");
    const [elem, setElem] = useState(null);
  const [ptData, setPtData] = useState({1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: ""} as any);

    function doInput(event: any) {
      let v = event.target.innerText;
      if (!v) return;
      event.target.innerText = "";

      setCommand(voiceCommand + v);
      const map = [
        [/一/g, 1],
        [/二/g, 2],
        [/三/g, 3],
        [/四/g, 4],
        [/五/g, 5],
        [/六/g, 6],
        [/七/g, 7],
        [/八"/g, 8],
        [/九/g, 9],
        [/十/g, 0]
      ];

      for (let [rpl, val] of map) {
        v = v.replace(rpl, '' + val);
      }

      let [all, bed, temp] = v.match(/([\d\w]+)[^\d]([\d.]+)/) || [];
      if (!all) return;

      // setPtData([...ptData, [bed, temp]]);
      ptData[bed] = temp;
      // setPtData({});
      setPtData(ptData);
      setCommand("");
    }

    return (
        <div className="App">
          <div className="full" style={{padding: "1em"}}>
                <div>
                    <table>
                        <thead>
                        <tr>
                          <th>床位号</th>
                          <th>Temp</th>
                        </tr>
                        </thead>
                        <tbody>

                        {Object.keys(ptData)
                            .map((bed: any) => {
                              let temp = ptData[bed];
                              return <tr>
                                <td style={{fontWeight: "bold"}}>{bed}</td>
                                <td>{temp}</td>
                              </tr>;
                            })}
                        </tbody>
                    </table>
                  {voiceCommand}

                </div>
            </div>
          <div ref={(e: any) => setElem(e)} contentEditable={true} className="full"
               style={{
                 display: "flex",
                 alignItems: "flex-end",
                 outline: "none"

               }}
               tabIndex={1}
               onInput={doInput}>
            </div>
        </div>
    );
};

export default App;
