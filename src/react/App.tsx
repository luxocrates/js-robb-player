import { type FC } from "react";
import { RobbPlayerProvider } from "./RobbPlayerProvider";
import { Page } from "./Page";
import { SidProvider } from "./SidProvider";

const App: FC<{}> = () => (
  <SidProvider>
    <RobbPlayerProvider>
      <Page />
    </RobbPlayerProvider>
  </SidProvider>
);

export default App;
