<template>
  <Container color="#F2F2F7" :padding="EdgeInsets.all(20)">
    <Column :gap="20">
      <Text
        data="iOS Style Cards"
        :style="TextStyle({ fontWeight: FontWeight.bold, fontSize: 18, color: '#000' })"
      />

      <Card variant="ios">
        <Padding :padding="EdgeInsets.all(16)">
          <Column :gap="8">
            <Text
              data="iOS Card"
              :style="TextStyle({ fontWeight: FontWeight.w600, fontSize: 16 })"
            />
            <Text data="This card has larger border radius (12px) and subtle shadow." />
          </Column>
        </Padding>
      </Card>

      <Card variant="ios">
        <Padding :padding="EdgeInsets.all(16)">
          <Row mainAxisAlignment="spaceBetween">
            <Text data="Settings Item" />
            <Text data=">" :style="TextStyle({ color: '#999' })" />
          </Row>
        </Padding>
      </Card>
    </Column>
  </Container>
</template>

<script setup lang="ts">
import {
  Card,
  Column,
  Row,
  Padding,
  Text,
  EdgeInsets,
  Container,
  TextStyle,
  FontWeight,
} from "fluekit";
</script>
