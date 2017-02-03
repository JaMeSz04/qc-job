import React from 'react';
import Game from './src/components/Game.jsx';
import PlatePumper from './src/components/PlatePumper.jsx';

class App extends React.Component {
   render() {
      const Games = <Game shape = "square"/>;
      const Plate = <PlatePumper/>;
      return (
         <div>
            <Game/>
         </div>
      );
   }
}

export default App;