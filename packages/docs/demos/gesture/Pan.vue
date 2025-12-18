<template>
  <Container :height="300" :width="300" color="#f9f9f9" clipBehavior="hardEdge">
    <Stack fit="expand">
      <Positioned :left="panPos.x" :top="panPos.y">
        <GestureDetector
          @pan-start="handlePanStart"
          @pan-update="handlePanUpdate"
          @pan-end="handlePanEnd"
          behavior="opaque"
        >
          <Container
            :width="80"
            :height="80"
            alignment="center"
            :decoration="{
              color: isPanning ? 'orange' : 'blue',
              borderRadius: { all: 40 },
              boxShadow: isPanning
                ? [
                    {
                      color: 'rgba(0,0,0,0.2)',
                      blurRadius: 10,
                      spreadRadius: 2,
                    },
                  ]
                : [],
            }"
          >
            <Text data="Drag" />
          </Container>
        </GestureDetector>
      </Positioned>
    </Stack>
  </Container>
</template>

<script setup lang="ts">
import { Container, GestureDetector, Positioned, Stack, Text } from "fluekit";
import { ref } from "vue";

const panPos = ref({ x: 20, y: 50 });
const isPanning = ref(false);

const handlePanStart = () => {
  isPanning.value = true;
};

const handlePanUpdate = (detail: any) => {
  // detail.delta 是增量
  panPos.value.x += detail.delta.x;
  panPos.value.y += detail.delta.y;
};

const handlePanEnd = () => {
  isPanning.value = false;
};
</script>
