<template>
  <Column :gap="20">
    <Box
      :width="100"
      :height="100"
      color="lightblue"
      :border-radius="BorderRadius.circular(10)"
      :box-shadow="[BoxShadow({ blurRadius: 10, color: 'rgba(0,0,0,0.1)' })]"
    >
      <Center>
        <Text data="Box" />
      </Center>
    </Box>

    <Box
      :width="100"
      :height="100"
      :border="Border.all({ color: 'blue', width: 2 })"
      shape="circle"
    >
      <Center>
        <Text data="Circle" />
      </Center>
    </Box>
  </Column>
</template>

<script setup lang="ts">
import { Box, Column, Center, Text, BorderRadius, Border, BoxShadow } from "fluekit";
</script>
