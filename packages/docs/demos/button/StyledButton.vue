<template>
  <Wrap :spacing="20" :run-spacing="20">
    <!-- 类似 TextButton -->
    <Button :style="textButtonStyle" @pressed="handleClick('Text Button')">
      <Text>Text Button</Text>
    </Button>

    <!-- 类似 ElevatedButton -->
    <Button :style="elevatedButtonStyle" @pressed="handleClick('Elevated Button')">
      <Text>Elevated Button</Text>
    </Button>

    <!-- 类似 OutlinedButton -->
    <Button :style="outlinedButtonStyle" @pressed="handleClick('Outlined Button')">
      <Text>Outlined Button</Text>
    </Button>

    <!-- 圆形按钮 -->
    <Button :style="circleButtonStyle" @pressed="handleClick('Circle Button')">
      <Text>+</Text>
    </Button>
  </Wrap>
</template>

<script setup lang="ts">
import { BorderRadius, BorderSide, Button, ButtonStyle, EdgeInsets, Text, Wrap } from "fluekit";

const handleClick = (msg: string) => {
  console.log("Clicked:", msg);
  alert(`Clicked: ${msg}`);
};

// 文本按钮样式
const textButtonStyle = ButtonStyle({
  foregroundColor: "#1976D2", // Primary Blue
  padding: EdgeInsets.symmetric({ horizontal: 16, vertical: 8 }),
  shape: BorderRadius.circular(4),
});

// 凸起按钮样式
const elevatedButtonStyle = ButtonStyle({
  backgroundColor: "#1976D2",
  foregroundColor: "white",
  padding: EdgeInsets.symmetric({ horizontal: 24, vertical: 12 }),
  elevation: 2,
  shadowColor: "rgba(0,0,0,0.3)",
  shape: BorderRadius.circular(4),
});

// 轮廓按钮样式
const outlinedButtonStyle = ButtonStyle({
  foregroundColor: "#1976D2",
  padding: EdgeInsets.symmetric({ horizontal: 24, vertical: 12 }),
  side: BorderSide({ color: "#1976D2", width: 1 }),
  shape: BorderRadius.circular(4),
});

// 圆形按钮样式
const circleButtonStyle = ButtonStyle({
  backgroundColor: "#4CAF50",
  foregroundColor: "white",
  fixedSize: { width: 56, height: 56 }, // 固定尺寸
  shape: BorderRadius.circular(28), // 半径为尺寸的一半
  elevation: 6,
  alignment: "center", // 内容居中
});
</script>
