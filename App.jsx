import React from 'react';
import DragScreen from './src/components/DragScreen.jsx';

class App extends React.Component {
   render() {
      return (
         <div>
            <DragScreen shape = "square"/>
         </div>
      );
   }
}

export default App;