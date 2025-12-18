<template>
  <Container :width="200" color="#f0f0f0" :padding="{ all: 10 }">
    <Text
      data="This is a very long text that should be truncated because maxLines is set to 1 and overflow is ellipsis."
      :maxLines="1"
      :overflow="TextOverflow.ellipsis"
    />
  </Container>
  <div style="height: 10px"></div>
  <Container :width="200" color="#f0f0f0" :padding="{ all: 10 }">
    <Text
      data="This text fades out at the end because overflow is set to fade. It's a nice effect for content previews."
      :overflow="TextOverflow.fade"
      :softWrap="false"
    />
  </Container>
</template>

<script setup lang="ts">
import { Text, Container, TextOverflow } from "fluekit";
</script>
