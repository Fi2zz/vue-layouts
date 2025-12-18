<template>
  <Row wrap gap="10">
    <!-- Cover -->
    <Column>
      <Text>Cover</Text>
      <Container
        :width="100"
        :height="100"
        :decoration="{
          color: '#eee',
          borderRadius: { all: 10 },
          image: {
            image: NetworkImage('https://picsum.photos/200/300'),
            fit: BoxFit.cover,
          },
        }"
      />
    </Column>

    <!-- Contain -->
    <Column>
      <Text>Contain</Text>
      <Container
        :width="100"
        :height="100"
        :decoration="{
          color: '#eee',
          borderRadius: { all: 10 },
          image: {
            image: NetworkImage('https://picsum.photos/200/300'),
            fit: BoxFit.contain,
          },
        }"
      />
    </Column>

    <!-- Alignment TopLeft -->
    <Column>
      <Text>Align TopLeft</Text>
      <Container
        :width="100"
        :height="100"
        :decoration="{
          color: '#eee',
          borderRadius: { all: 10 },
          image: {
            image: NetworkImage('https://picsum.photos/50/50'),
            fit: BoxFit.none,
            alignment: BoxAlignment.topLeft,
          },
        }"
      />
    </Column>

    <!-- Repeat -->
    <Column>
      <Text>Repeat</Text>
      <Container
        :width="100"
        :height="100"
        :decoration="{
          color: '#eee',
          borderRadius: { all: 10 },
          image: {
            image: NetworkImage('https://picsum.photos/20/20'),
            repeat: 'repeat',
          },
        }"
      />
    </Column>

    <!-- Gradient as Image -->
    <Column>
      <Text>Gradient Img</Text>
      <Container
        :width="100"
        :height="100"
        :decoration="{
          color: '#eee',
          borderRadius: { all: 10 },
          image: {
            image: 'linear-gradient(to right, red, blue)',
            fit: BoxFit.cover,
          },
        }"
      />
    </Column>
  </Row>
</template>

<script setup lang="ts">
import { Container, NetworkImage, BoxFit, BoxAlignment, Row, Column, Text } from "fluekit";
</script>
