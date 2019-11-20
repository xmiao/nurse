import React, {useState} from 'react';
import './App.css';

const App: React.FC = () => {
    const [voiceCommand, setCommand] = useState("");
  const [ptData, setPtData] = useState({1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: ""} as any);
  const [activeLine, setActiveLine] = useState("");
  const [cnt, refresh] = useState(0);


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
        [/八/g, 8],
        [/九/g, 9],
        [/十/g, 0]
      ];

      for (let [rpl, val] of map) {
        v = v.replace(rpl, '' + val);
      }

      let [all, bed, temp] = v.match(/([\d\w]+)[^\d]([\d.]+)/) || [];
      if (!all) return;

      ptData[bed] = temp;
      setActiveLine(bed);
      setPtData(ptData);
      setCommand("");
      refresh(cnt + 1);
    }

  function simulate(cmd: string) {
    doInput({target: {innerText: cmd}})
  }

    return (
        <div className="App">
          <div className="cn1">
            <h4>患者血压录入</h4>
            <div className="tab">
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
                              return <tr key={`bed-${bed}:${temp}`} className={+activeLine === +bed ? "active" : ""}>
                                <td style={{fontWeight: "bold"}}>{bed}</td>
                                <td key={`temp${temp}`}>{temp}</td>
                              </tr>;
                            })}
                        </tbody>
                    </table>
                </div>
            <div contentEditable={true}
                 className="overlay full"
                 tabIndex={1}
                 onInput={doInput}/>
          </div>
          <div>
            {voiceCommand}
            {["3床5好", "3床70都"]
                .map((x) => {
                  return <button key={`${x}`} style={{margin: "3px"}} onClick={() => simulate(x)}>
                    {x}
                  </button>;
                })}
          </div>

        </div>
    );
};

export default App;
