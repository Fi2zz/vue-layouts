<template>
  <Row :gap="20">
    <GestureDetector @tap="() => logBehavior('Opaque')" behavior="opaque">
      <Container :width="100" :height="100" color="rgba(0,0,0,0.1)">
        <Center><Text data="Opaque" /></Center>
      </Container>
    </GestureDetector>
    <GestureDetector @tap="() => logBehavior('deferToChild')" behavior="deferToChild">
      <Container :width="100" :height="100" color="rgba(0,0,0,0.1)">
        <Center><Text data="DeferToChild" /></Center>
      </Container>
    </GestureDetector>
  </Row>
  <Text :data="behaviorLog" :style="{ color: 'grey', fontSize: 12 }" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Row, GestureDetector, Container, Center, Text } from "fluekit";

const behaviorLog = ref("Click boxes above");
const logBehavior = (type: string) => {
  behaviorLog.value = `Last clicked: ${type} at ${new Date().toLocaleTimeString()}`;
};
</script>
