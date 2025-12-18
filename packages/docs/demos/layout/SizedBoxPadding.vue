<template>
  <Row>
    <Container color="orange">
      <Padding :all="10">
        <Text data="Padding" :style="{ color: 'white' }" />
      </Padding>
    </Container>

    <SizedBox :width="20" />
    <!-- Spacer -->

    <Container color="purple">
      <SizedBox :width="80" :height="40">
        <Center>
          <Text data="SizedBox" :style="{ color: 'white' }" />
        </Center>
      </SizedBox>
    </Container>
  </Row>
</template>

<script setup lang="ts">
import { Container, Row, Padding, SizedBox, Center, Text } from "fluekit";
</script>
