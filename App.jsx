import React from 'react';
import DragScreen from './src/components/DragScreen.jsx';
import PlatePumper from './src/components/PlatePumper.jsx';

class App extends React.Component {
   render() {
      const DragScreen = <DragScreen shape = "square"/>;
      return (
         <div>
            <PlatePumper/>
         </div>
      );
   }
}

export default App;