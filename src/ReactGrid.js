import GridLayout from "react-grid-layout";
import React, { useState } from "react";
import "react-grid-layout/css/styles.css";

export default function Grid(props) {

  let layout = [{ i: "a", x: 0, y: 0, w: 3, h: 1 }];
  let timeline = [{ width: 1200, days: 31 }];
  if (props.theLayout[0] !== null) {
    layout = props.theLayout;
  }

  if (props.timelineItems[0] !== null) {
    timeline = props.timelineItems;
  }

  const getItem = e => {
    console.log(e.target.id);
  };

  return (
    <GridLayout
      style={{ backgroundColor: "#e8dfc5", border: "3px solid black" }}
      className="layout"
      layout={layout}
      autoSize={true}
      cols={timeline[0].days}
      rowHeight={30}
      width={timeline[0].width}
      compactType={null}
    >

{timeline.map((item, key) =>
    <div style={{ background: "gray" }} key={item.id} id={item.id} onClick={getItem}>
      {item.name}
      </div>
)} 
    </GridLayout>
  );
}
