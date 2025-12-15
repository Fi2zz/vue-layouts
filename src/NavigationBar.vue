<template>
  <Positioned position="fixed" width="100%" height="88" z-index="9999">
    <Container style="background-color: white">
      <Positioned left="0" top="0">
        <Container v-bind="back" @click="() => $emit('back')" />
      </Positioned>
      <Positioned centered>
        <Text :style="titleStyle" :text="title" />
      </Positioned>
    </Container>
  </Positioned>
  <SizedBox height="88" width="100%"></SizedBox>
</template>
<script lang="ts" setup>
import Positioned from "@/Positioned.vue";
import Text from "@/Text.vue";
import { TextAlign, TextStyle } from "@/TextStyle";

import { BoxDecoration, DecorationImage } from "@/BoxDecoration";
import Container from "@/Container.vue";
import SizedBox from "@/SizedBox.vue";
import { Size } from "@/Size";
import { computed } from "vue";
const emit = defineEmits(["back"]);
const props = defineProps({ title: { type: String, default: "标题" } });

const titleStyle = TextStyle({
  fontWeight: 500,
  fontSize: 36,
  lineHeight: "48px",
  textAlign: TextAlign.center,
  color: "#333",
});

const src = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICBmaWxsPSJub25lIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZGVmcz48Y2xpcFBhdGggaWQ9Im1hc3Rlcl9zdmcwXzBfNzk4OCI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iMCIvPjwvY2xpcFBhdGg+PC9kZWZzPjxnIGNsaXAtcGF0aD0idXJsKCNtYXN0ZXJfc3ZnMF8wXzc5ODgpIj48Zz48cGF0aCBkPSJNMTUuNzA2OTY1NCw2LjcwNjk2NTUxUTE1Ljg0NzU4OTUsNi41NjYzNDE0LDE1LjkyMzY5NDYwMDAwMDAwMSw2LjM4MjYwNzAxUTE1Ljk5OTgwMDIsNi4xOTg4NzI2NiwxNS45OTk4MDAyLDZRMTUuOTk5Nzk5Nyw1LjkwMTUyODI5MSwxNS45ODA1ODg5LDUuODA0OTQ4N1ExNS45NjEzNzgxMDAwMDAwMDEsNS43MDgzNjkxMSwxNS45MjM2OTQwOTk5OTk5OTksNS42MTczOTMxNFExNS44ODYwMTA1OTk5OTk5OTksNS41MjY0MTcxNCwxNS44MzEzMDI2LDUuNDQ0NTQwOTJRMTUuNzc2NTk1MSw1LjM2MjY2NDcsMTUuNzA2OTY1NCw1LjI5MzAzNDY3UTE1LjYzNzMzNDgsNS4yMjM0MDQ2NSwxNS41NTU0NTg1LDUuMTY4Njk2NzZRMTUuNDczNTgyMyw1LjExMzk4ODgyLDE1LjM4MjYwNjUsNS4wNzYzMDUzM1ExNS4yOTE2MzA2OTk5OTk5OTksNS4wMzg2MjE3OCwxNS4xOTUwNTA3LDUuMDE5NDEwOTA5OTk5OTk5NVExNS4wOTg0NzE2LDUuMDAwMjAwMDMsMTUsNS4wMDAxOTk5N1ExNC44MDExMjc0LDUuMDAwMjAwMDMsMTQuNjE3MzkzLDUuMDc2MzA1MjdRMTQuNDMzNjU4NjAwMDAwMDAxLDUuMTUyNDEwNDUsMTQuMjkzMDM0Niw1LjI5MzAzNDQ5TDE0LjI5Mjg5MzQsNS4yOTI4OTMyM0w4LjI5Mjg5MzIzLDExLjI5Mjg5MzRROC4xNTIyNDA5OSwxMS40MzM1NDUxLDguMDc2MTIwNSwxMS42MTczMTYyMDAwMDAwMDFROC4wMDAwMDAxMiwxMS44MDEwODc0LDguMDAwMDAwMDYsMTEuOTk5OTk5NTAwMDAwMDAxUTguMDAwMDAwMTIsMTIuMTk4OTExNyw4LjA3NjEyMDU2LDEyLjM4MjY4MjgwMDAwMDAwMVE4LjE1MjI0MDk5LDEyLjU2NjQ1NDQsOC4yOTI4OTMyMywxMi43MDcxMDY2TDE0LjI5Mjg5MzQsMTguNzA3MTA2TDE0LjI5MzAzNDEsMTguNzA2OTY0UTE0LjQzMzY1ODA5OTk5OTk5OSwxOC44NDc1ODksMTQuNjE3MzkyNTAwMDAwMDAxLDE4LjkyMzY5NTAwMDAwMDAwMlExNC44MDExMjc0LDE4Ljk5OTgsMTUsMTguOTk5OFExNS4wOTg0NzE2LDE4Ljk5OTgsMTUuMTk1MDUwNywxOC45ODA1ODkwMDAwMDAwMDJRMTUuMjkxNjMwNjk5OTk5OTk5LDE4Ljk2MTM3OCwxNS4zODI2MDY1LDE4LjkyMzY5Mzk5OTk5OTk5OFExNS40NzM1ODIzLDE4Ljg4NjAxMSwxNS41NTU0NTg1LDE4LjgzMTMwM1ExNS42MzczMzQ4LDE4Ljc3NjU5NCwxNS43MDY5NjUsMTguNzA2OTY0UTE1Ljc3NjU5NDYsMTguNjM3MzM0LDE1LjgzMTMwMjYsMTguNTU1NDU4UTE1Ljg4NjAxMDIwMDAwMDAwMSwxOC40NzM1ODEsMTUuOTIzNjk0MDk5OTk5OTk5LDE4LjM4MjYwNlExNS45NjEzNzgxMDAwMDAwMDEsMTguMjkxNjI5OTk5OTk5OTk4LDE1Ljk4MDU4ODksMTguMTk1MDUwMDAwMDAwMDAyUTE1Ljk5OTc5OTcsMTguMDk4NDcxLDE1Ljk5OTgwMDIsMThRMTUuOTk5ODAwMiwxNy44MDExMjcsMTUuOTIzNjk1MSwxNy42MTczOTNRMTUuODQ3NTg5NSwxNy40MzM2NTksMTUuNzA2OTY1NCwxNy4yOTMwMzVMMTUuNzA3MTA2NiwxNy4yOTI4OTNMMTAuNDE0MjEzMywxMkwxNS43MDcxMDY2LDYuNzA3MTA2NzdMMTUuNzA2OTY1NCw2LjcwNjk2NTUxWiIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMEEwQTBBIiBmaWxsLW9wYWNpdHk9IjEiLz48L2c+PC9nPjwvc3ZnPg==`;
const image = DecorationImage({ src: src, alignment: "center", size: "48 48" });
const back = computed(() => {
  return {
    size: Size({ width: 88, height: 88 }),
    decoration: BoxDecoration({ image }),
  };
});
</script>
