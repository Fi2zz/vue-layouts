<template>
  <div class="demo-box">
    <Column :gap="30" alignment="center">
      <!-- Rotation -->
      <Column :gap="10" alignment="center">
        <Text data="Rotation" :style="labelStyle" />
        <Row :gap="20">
          <Transform :transform="Matrix4.rotationZ(Math.PI / 4)" alignment="center">
            <Container :width="80" :height="80" color="purple" alignment="center">
              <Text data="45°" :style="textStyle" />
            </Container>
          </Transform>
          <Transform :transform="Matrix4.rotationZ(Math.PI / 2)" alignment="center">
            <Container :width="80" :height="80" color="indigo" alignment="center">
              <Text data="90°" :style="textStyle" />
            </Container>
          </Transform>
        </Row>
      </Column>

      <!-- Scale -->
      <Column :gap="10" alignment="center">
        <Text data="Scale" :style="labelStyle" />
        <Row :gap="40">
          <Transform :transform="Matrix4.scaling(0.5, 0.5)" alignment="center">
            <Container :width="80" :height="80" color="blue" alignment="center">
              <Text data="0.5x" :style="textStyle" />
            </Container>
          </Transform>
          <Transform :transform="Matrix4.scaling(1.5, 1.5)" alignment="center">
            <Container :width="80" :height="80" color="blue" alignment="center">
              <Text data="1.5x" :style="textStyle" />
            </Container>
          </Transform>
        </Row>
      </Column>

      <!-- Translate -->
      <Column :gap="10" alignment="center">
        <Text data="Translate" :style="labelStyle" />
        <Container :width="200" :height="100" color="#eeeeee" alignment="center">
          <Transform :transform="Matrix4.translation(20, -20)" alignment="center">
            <Container :width="60" :height="60" color="green" alignment="center">
              <Text data="Offset" :style="textStyle" />
            </Container>
          </Transform>
        </Container>
      </Column>

      <!-- Skew -->
      <Column :gap="10" alignment="center">
        <Text data="Skew" :style="labelStyle" />
        <Row :gap="20">
          <Transform :transform="Matrix4.skewX(0.3)" alignment="center">
            <Container :width="80" :height="80" color="orange" alignment="center">
              <Text data="Skew X" :style="textStyle" />
            </Container>
          </Transform>
          <Transform :transform="Matrix4.skewY(0.3)" alignment="center">
            <Container :width="80" :height="80" color="deepOrange" alignment="center">
              <Text data="Skew Y" :style="textStyle" />
            </Container>
          </Transform>
        </Row>
      </Column>

      <!-- 3D Rotation -->
      <Column :gap="10" alignment="center">
        <Text data="3D Rotation" :style="labelStyle" />
        <Row :gap="20">
          <Transform :transform="Matrix4.rotationX(Math.PI / 4)" alignment="center">
            <Container :width="80" :height="80" color="teal" alignment="center">
              <Text data="Rot X" :style="textStyle" />
            </Container>
          </Transform>
          <Transform :transform="Matrix4.rotationY(Math.PI / 4)" alignment="center">
            <Container :width="80" :height="80" color="cyan" alignment="center">
              <Text data="Rot Y" :style="textStyle" />
            </Container>
          </Transform>
        </Row>
      </Column>

      <!-- Stack & Positioned -->
      <Column :gap="10" alignment="center">
        <Text data="Stack & Positioned" :style="labelStyle" />
        <Container :width="200" :height="200" color="#f0f0f0">
          <Stack>
            <Positioned :top="40" :left="40">
              <Transform :transform="Matrix4.rotationZ(-0.2)" alignment="center">
                <Container
                  :width="120"
                  :height="120"
                  color="rgba(255, 0, 0, 0.5)"
                  alignment="center"
                >
                  <Text data="Back" :style="textStyle" />
                </Container>
              </Transform>
            </Positioned>
            <Positioned :top="40" :left="40">
              <Transform :transform="Matrix4.rotationZ(0.2)" alignment="center">
                <Container
                  :width="120"
                  :height="120"
                  color="rgba(0, 0, 255, 0.5)"
                  alignment="center"
                >
                  <Text data="Front" :style="textStyle" />
                </Container>
              </Transform>
            </Positioned>
          </Stack>
        </Container>
      </Column>
    </Column>
  </div>
</template>

<script setup lang="ts">
import {
  Transform,
  Container,
  Column,
  Row,
  Text,
  TextStyle,
  Matrix4,
  Stack,
  Positioned,
} from "fluekit";

const textStyle = TextStyle({ color: "white", fontSize: 14 });
const labelStyle = TextStyle({ fontWeight: "bold", fontSize: 16, color: "#333" });
</script>
