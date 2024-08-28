import { MouseLocation, ScaledScreenShot } from "../interfaceTypes";
import { useState } from "react";

// Displays a screen shot with optional annotations that can be expanded
// or shrunk by clicking on it.

interface ExpandableScreenShotProps {
  title: string;
  scaledScreenShot: ScaledScreenShot;
  mouseLocation?: MouseLocation;
}

// Height of a collapsed image.
const CollapsedHeightPx = 150;

export function ExpandableScreenShot(props: ExpandableScreenShotProps) {
  const [screenExpanded, setScreenExpanded] = useState(false);

  function toggleScreenExpanded() {
    setScreenExpanded(!screenExpanded);
  }

  const { title, scaledScreenShot, mouseLocation } = props;
  const { screen, originalHeight, originalWidth, scaledHeight, scaledWidth } = scaledScreenShot;

  const heightPx = screenExpanded ? scaledHeight : CollapsedHeightPx;
  const widthPx = screenExpanded
    ? scaledWidth
    : Math.round(scaledWidth * (CollapsedHeightPx / scaledHeight));

  const containerStyle: any = {
    position: "relative",
    display: "inline-block",
    height: `${heightPx}px`,
    width: `${widthPx}px`,
    overflow: "hidden",
  };

  const imageStyle: any = {
    height: "100%", // Make the image fill the container width
    width: "100%", // Make the image fill the container height
    objectFit: "cover", // This maintains the aspect ratio of the image by covering the entire container
  };

  const imageSource = `data:image/jpeg;base64,${screen}`;

  let mouseLocationDiv;
  if (mouseLocation) {
    const circleX = Math.round((mouseLocation.clientX / originalWidth) * widthPx);
    const circleY = Math.round((mouseLocation.clientY / originalHeight) * heightPx);
    const circleRadius = screenExpanded ? 15 : 5;
    const borderWidth = screenExpanded ? 3 : 2;
    const borderColor = "red";
    const circleStyle: any = {
      position: "absolute",
      left: `${circleX - circleRadius - borderWidth}px`, // Adjust the position to center the circle
      top: `${circleY - circleRadius - borderWidth}px`, // Adjust the position to center the circle
      height: `${circleRadius * 2}px`,
      width: `${circleRadius * 2}px`,
      borderRadius: "50%",
      border: `${borderWidth}px solid ${borderColor}`, // Border only, no background color
      pointerEvents: "none", // Ensures that the circle does not interfere with interactions on the image
    };
    mouseLocationDiv = <div style={circleStyle}></div>;
  }

  return (
    <div>
      <div className="ScreenShotTitle">{title}</div>
      <div className="ScreenShot" style={containerStyle}>
        <img style={imageStyle} src={imageSource} onClick={toggleScreenExpanded}></img>;
        {mouseLocationDiv}
      </div>
    </div>
  );
}
