<template>
  <Fixed v-if="visible" :z-index="9999" :top="0" :left="0" :right="0" :bottom="0">
    <GestureDetector @tap="onBarrierDismiss">
      <Container width="100%" height="100%" alignment="center" :color="barrierColor">
        <Container v-bind="dialogProps">
          <Container :alignment="titleAlignment" width="100%" v-if="title">
            <Text :style="dialogTitleStyle" :data="title" />
          </Container>
          <slot>
            <Container
              :padding="EdgeInsets.symmetric({ vertical: 16 })"
              alignment="topLeft"
              width="100%"
            >
              <Text v-if="content" :style="dialogContentStyle" :data="content" />
            </Container>
          </slot>
          <Row
            main-axis-size="max"
            :main-axis-alignment="actionsAlignment"
            cross-axis-alignment="center"
            :gap="8"
          >
            <slot name="actions">
              <Button @pressed="close">Cancel</Button>
              <Button @pressed="ok">OK</Button>
            </slot>
          </Row>
        </Container>
      </Container>
    </GestureDetector>
  </Fixed>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Container from "./Container.vue";
import Row from "./Row.vue";
import Text from "./Text.vue";
import Fixed from "./Fixed.vue";
import { Alignment } from "./Alignment";
import { FontWeight } from "./TextStyle";
import { EdgeInsets } from "./EdgeInsets";
import { BoxDecoration } from "./BoxDecoration";
import { BorderRadius } from "./BorderRadius";
import { BoxConstraints } from "./BoxConstraints";
import { Size } from "./Size";
import { TextStyle } from "./TextStyle";
import { MainAxisAlignment } from "./FlexProps";
import GestureDetector from "./GestureDetector.vue";
import Button from "./Button.vue";
interface Props {
  visible: boolean;
  title?: string;
  content?: string;
  barrierDismissible?: boolean;
  alignment?: Alignment;
  barrierColor?: string;
  constraints?: BoxConstraints;
  decoration?: BoxDecoration;
  size?: Size;
  actionsAlignment?: MainAxisAlignment;
  titleAlignment?: Alignment;
  padding?: EdgeInsets;
  titleStyle?: TextStyle;
  titleColor?: string;
  titleFontSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  barrierDismissible: true,
  alignment: Alignment.center,
  barrierColor: "rgba(0, 0, 0, 0.54)",
  actionsAlignment: MainAxisAlignment.end,
});

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
  (e: "close"): void;
  (e: "ok"): void;
}>();
const close = () => {
  emit("update:visible", false);
  emit("close");
};
const ok = () => emit("ok");
const onBarrierDismiss = () => {
  if (props.barrierDismissible) {
    close();
  }
};

const dialogProps = computed(() => {
  return Object.assign(
    {},
    {
      padding: props.padding || EdgeInsets.all(24),
      alignment: props.alignment,
      constraints: props.constraints || BoxConstraints({ maxWidth: 400 }),
      decoration:
        props.decoration ||
        BoxDecoration({
          color: "white",
          borderRadius: BorderRadius.circular(4),
          boxShadow: [
            {
              color: "rgba(0,0,0,0.2)",
              blurRadius: 24,
              offset: { x: 0, y: 11 },
            },
          ],
        }),
    },
    props.size ? Size(props.size) : {},
  );
});

const dialogTitleStyle = computed(() => {
  return (
    props.titleStyle ||
    TextStyle({
      fontSize: props.titleFontSize || 20,
      fontWeight: FontWeight.bold,
      color: props.titleColor || "rgba(0,0,0,0.87)",
    })
  );
});

const dialogContentStyle = TextStyle({
  fontSize: 16,
  color: "rgba(0,0,0,0.6)",
});
</script>
