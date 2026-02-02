import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import Svg, { Line, Circle } from "react-native-svg";

const { width, height } = Dimensions.get("window");

// Generate circuit grid pattern
const generateCircuitLines = () => {
  const lines = [];
  const nodeSize = 80;
  
  // Vertical lines
  for (let x = 0; x < width; x += nodeSize) {
    for (let y = 0; y < height; y += nodeSize * 2) {
      lines.push({ x1: x, y1: y, x2: x, y2: y + nodeSize, color: "#4f7cff" });
    }
  }
  
  // Horizontal lines
  for (let y = 0; y < height; y += nodeSize * 1.5) {
    for (let x = 0; x < width; x += nodeSize * 2) {
      lines.push({ x1: x, y1: y, x2: x + nodeSize, y2: y, color: "#a855f7" });
    }
  }
  
  // Diagonal connectors
  for (let x = 0; x < width; x += nodeSize * 2.5) {
    for (let y = 0; y < height; y += nodeSize * 2.5) {
      lines.push({ x1: x, y1: y, x2: x + nodeSize, y2: y + nodeSize, color: "#ec4899" });
      lines.push({ x1: x + nodeSize, y1: y, x2: x, y2: y + nodeSize, color: "#f59e0b" });
    }
  }
  
  return lines;
};

// Generate circuit nodes
const generateNodes = () => {
  const nodes = [];
  const nodeSize = 80;
  
  for (let x = 0; x < width; x += nodeSize) {
    for (let y = 0; y < height; y += nodeSize) {
      if (Math.random() > 0.7) {
        nodes.push({ cx: x, cy: y, r: 3, color: "#4f7cff" });
      }
    }
  }
  
  return nodes;
};

const AnimatedLine = Animated.createAnimatedComponent(Line);

export default function NeonCircuitBackground() {
  const dashOffset1 = useRef(new Animated.Value(0)).current;
  const dashOffset2 = useRef(new Animated.Value(0)).current;
  const dashOffset3 = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Three different dash animations for flowing effect
    Animated.loop(
      Animated.timing(dashOffset1, {
        toValue: 100,
        duration: 3000,
        useNativeDriver: false,
      })
    ).start();

    Animated.loop(
      Animated.timing(dashOffset2, {
        toValue: -100,
        duration: 4000,
        useNativeDriver: false,
      })
    ).start();

    Animated.loop(
      Animated.timing(dashOffset3, {
        toValue: 100,
        duration: 5000,
        useNativeDriver: false,
      })
    ).start();

    // Opacity pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 0.25,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const lines = generateCircuitLines();
  const nodes = generateNodes();

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* White background */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#ffffff" }]} />

      {/* Circuit pattern layer */}
      <Animated.View
        style={{
          flex: 1,
          opacity: opacity,
        }}
      >
        <Svg width={width} height={height}>
          {/* Draw animated lines */}
          {lines.map((line, idx) => {
            const dashOffset = [dashOffset1, dashOffset2, dashOffset3][idx % 3];
            return (
              <AnimatedLine
                key={`line-${idx}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={line.color}
                strokeWidth="2"
                strokeDasharray="8 6"
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
              />
            );
          })}

          {/* Draw nodes */}
          {nodes.map((node, idx) => (
            <Circle
              key={`node-${idx}`}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={node.color}
              opacity="0.9"
            />
          ))}
        </Svg>
      </Animated.View>
    </View>
  );
}
