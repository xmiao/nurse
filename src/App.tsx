import React, {useState} from 'react';
import './App.css';

const App: React.FC = () => {
    const [voiceCommand, setCommand] = useState("");
    const [elem, setElem] = useState(null);
  const [ptData, setPtData] = useState({} as any);

    function doInput(event: any) {
      let v = event.target.innerText;
      if (!v) return;
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

      let [all, bed, temp] = v.match(/([\d\w]+)[^\d]+([\d.]+)/) || [];
      if (!all) return;

      // setPtData([...ptData, [bed, temp]]);
      ptData[bed] = temp;
      setPtData(ptData);
      setCommand("");

        if (elem) {
            // @ts-ignore
          elem.innerText = "";
        }
    }

    return (
        <div className="App">
          <div className="full" style={{border: "10px solid red"}}>
                {voiceCommand}
                <div>
                    <table>
                        <thead>
                        <th>
                            <td>床位号</td>
                            <td>Temp</td>
                        </th>
                        </thead>
                        <tbody>
                        {Object.keys(ptData)
                            .map((bed: any) => {
                              let temp = ptData[bed];
                              return <tr>
                                <td>{bed}</td>
                                <td>{temp}</td>
                              </tr>;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
          <div ref={(e: any) => setElem(e)} contentEditable={true} className="full"
               style={{
                 border: "5px solid blue", display: "flex",
                 alignItems: "flex-end"
               }}
               tabIndex={1}
               onInput={doInput}>

            </div>

        </div>
    );
};

export default App;
