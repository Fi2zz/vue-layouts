<script setup lang="ts">
import {
  Container,
  Center,
  Text,
  Column,
  Row,
  SizedBox,
  TextStyle,
  IgnorePointer,
} from "flue";
</script>

<template>
  <Container color="#f0f2f5" height="100vh" width="100vw">
    <IgnorePointer ignoring>
      <Center>
        <Container
          color="white"
          :padding="{ all: 20 }"
          :decoration="{
            borderRadius: { all: 16 },
            boxShadow: {
              color: '#0000001a',
              blurRadius: 10,
              offsetX: 0,
              offsetY: 4,
            },
          }">
          <Column alignment="center">
            <Text
              :style="
                TextStyle({ fontSize: 24, fontWeight: 'bold', color: '#333' })
              "
              text="Vue Layouts Example" />
            <SizedBox :height="20" />
            <Row alignment="spaceBetween" width="100%">
              <Container
                width="80px"
                height="80px"
                color="#42b883"
                :decoration="{ borderRadius: { all: 8 } }">
                <Center><Text text="Vue" color="white" /></Center>
              </Container>
              <Container
                width="80px"
                height="80px"
                color="#646cff"
                :decoration="{ borderRadius: { all: 8 } }">
                <Center><Text text="Vite" color="white" /></Center>
              </Container>
              <Container
                width="80px"
                height="80px"
                color="#007bff"
                :decoration="{ borderRadius: { all: 8 } }">
                <Center><Text text="TS" color="white" /></Center>
              </Container>
            </Row>
            <SizedBox :height="20" />
            <Text
              text="This is a demo of Flutter-like layouts in Vue 3."
              :style="TextStyle({ color: '#666' })" />
          </Column>
        </Container>
      </Center>
    </IgnorePointer>
  </Container>
</template>
