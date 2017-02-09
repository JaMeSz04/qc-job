import React from 'react';
import Game from './src/components/Game.jsx';
import PlatePumper from './src/components/PlatePumper.jsx';
import MainMenu from './src/components/MainMenu.jsx';

class App extends React.Component {
   render() {
      const Games = <Game shape = "square" min = {5}/>;
      const Plate = <PlatePumper/>;
      return (
         <div>
            {Plate}
         </div>
      );
   }
}

export default App;