import React from 'react';
import { WeavyClient, WeavyProvider, Chat } from '@weavy/uikit-react';

const weavyClient = new WeavyClient({ 
   url: "https://12a9cea76b70416bb72da2808aad9fe9.weavy.io", 
   tokenFactory: async () => "wyu_Lhod5jpfgPFhVlGbzW6JP32holHp2n1XnZ2h"
});

function WeavyApp() {
   return (
      <div className="App">
        <WeavyProvider client={weavyClient}>
          <Chat uid="demochat" />
        </WeavyProvider>
      </div>
   )
}

export default WeavyApp;