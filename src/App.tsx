import React, {useState} from 'react';
import './App.css';

const App: React.FC = () => {
    const [voiceCommand, setCommand] = useState("");
    const [elem, setElem] = useState(null);

    function doInput(event: any) {
        debugger;
        console.log("some");
        setCommand(voiceCommand + event.key);
        if (elem) {
            // @ts-ignore
            elem.innerHTML = "";
        }
    }

    return (
        <div className="App">
            <div className="full">
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

                        </tbody>
                    </table>
                </div>
            </div>
            <div ref={(e: any) => setElem(e)} contentEditable={true} className="full" style={{border: "5px solid blue"}}
                 tabIndex={1}
                 onKeyPress={doInput}>

            </div>

        </div>
    );
};

export default App;
