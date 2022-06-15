import React, { useState } from "react";
import { Radio, Space, Tabs } from "antd";

export default function HomeMenu(props) {
  const [tabPosition, setTabPosition] = useState("left");
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  const { TabPane } = Tabs;
  return (
    <Tabs tabPosition={tabPosition}>
      <TabPane
        tab={
          <img
            src="https://picsum.photos/200"
            className="rounded-full"
            width="50"
          />
        }
        key="1"
      >
        Content of Tab 1
      </TabPane>
      <TabPane
        tab={
          <img
            src="https://picsum.photos/200"
            className="rounded-full"
            width="50"
          />
        }
        key="2"
      >
        Content of Tab 2
      </TabPane>
      <TabPane
        tab={
          <img
            src="https://picsum.photos/200"
            className="rounded-full"
            width="50"
          />
        }
        key="3"
      >
        Content of Tab 3
      </TabPane>
    </Tabs>
  );
}
