// ParentComponent.jsx
import React, { useState } from 'react';
import Home from './Home';

const ParentComponent = () => {
  const [user, setUser] = useState(/* your user object */);

  return (
    <div>
      {/* Other components */}
      <Home user={user} />
    </div>
  );
};

export default ParentComponent;
