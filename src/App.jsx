import React from "react";

const ChildComponent = () => {
  return <div></div>;
};

// Set custom displayName
ChildComponent.displayName = "GFGCustomComponent";

const App = () => {
  return (
    <div>
      <p>
        displayName of child component is: {ChildComponent.displayName}
      </p>
    </div>
  );
};

export default App;