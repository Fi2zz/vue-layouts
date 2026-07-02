<template>
  <Column :gap="30">
    <Text :style="TextStyle({ fontSize: 30, fontWeight: FontWeight.w500 })">AlertDialog</Text>
    <Button @click="showDefaultDialog">Default Dialog with default actions</Button>
    <Button @click="showDialog">Show Dialog with custom actions</Button>
    <Button @click="showIOSDialog">Show iOS Style Dialog</Button>
    <Button @click="showImperativeDialog">Imperative Dialog</Button>
  </Column>
  <SizedBox height="50"></SizedBox>
  <Column :gap="30">
    <Text :style="TextStyle({ fontSize: 30, fontWeight: FontWeight.w500 })">LiquidGlassDialog</Text>
    <Button @pressed="showOnly1ActionDialog">Only One Action Dialog</Button>
    <Button @pressed="showNetworkDialog"> Three Actions Dialog</Button>
    <Button @pressed="showPasteDialog">Two Actions Dialog</Button>
    <Button @pressed="showImperativeLiquidGlassDialog">Imperative LiquidGlassDialog</Button>
  </Column>

  <AlertDialog
    v-model:visible="dialogVisible"
    :constraints="BoxConstraints({ minWidth: 400, maxWidth: 600 })"
    title="Alert with custom actions"
    content="This is an alert dialog with custom actions."
  >
    <template #actions>
      <Button @click="dialogVisible = false">Cancel</Button>
      <Button @click="dialogVisible = false">OK</Button>
    </template>
  </AlertDialog>
  <AlertDialog
    v-model:visible="iosDialogVisible"
    title="Confirm Delete"
    content="Are you sure you want to delete this item? This action cannot be undone."
    variant="ios"
  />

  <AlertDialog
    v-model:visible="defaultDialogVisible"
    :constraints="BoxConstraints({ minWidth: 400, maxWidth: 600 })"
    title="Alert with default actions"
    content="This is an alert dialog."
  >
  </AlertDialog>

  <LiquidGlassDialog
    v-model="liquidGlassDialogs.one"
    title="Note"
    message="Hello"
    :actions="singleAction"
  />
  <LiquidGlassDialog
    v-model="liquidGlassDialogs.network"
    title="Allow Wireless Data Usage?"
    message="Some features may not be available when wireless data is turned off."
    :actions="networkActions"
    @action="handleNetworkAction"
    @close="onDialogClose"
  />
  <LiquidGlassDialog
    v-model="liquidGlassDialogs.paste"
    title="Paste from MacBook Pro'"
    message="Do you allow this?"
    :actions="pasteActions"
    @action="handlePasteAction"
  />
</template>

<script setup lang="ts">
import {
  FontWeight,
  ImageProvider,
  LiquidGlassDialog,
  LiquidGlassDialogAction,
  LiquidGlassDialogActionPayload,
  SizedBox,
  Text,
  TextStyle,
} from "fluekit";
import { reactive, ref } from "vue";
import {
  AlertDialog,
  BoxConstraints,
  Button,
  Column,
  showAlertDialog,
  showLiquidGlassDialog,
} from "fluekit";

const dialogVisible = ref(false);
const defaultDialogVisible = ref(false);
const iosDialogVisible = ref(false);

const showDialog = () => {
  dialogVisible.value = true;
};
const showDefaultDialog = () => {
  defaultDialogVisible.value = true;
};
const showIOSDialog = () => {
  iosDialogVisible.value = true;
};

const showImperativeDialog = () => {
  showAlertDialog({
    title: "Imperative Dialog",
    content: "This dialog was created using showAlertDialog().",
    onOk: () => alert("Imperative OK"),
    onClose: () => alert("Imperative Closed"),
  });
};

const showImperativeLiquidGlassDialog = () => {
  showLiquidGlassDialog({
    title: "Imperative LiquidGlassDialog",
    message: "This dialog was created using showLiquidGlassDialog().",
    icon: ImageProvider("https://example.com/avatar.png"),
    actions: [
      {
        title: "Cancel",
        style: "default",
        onPressed: async () => console.log("Imperative Cancel"),
      },
      {
        title: "OK",
        style: "primary",
        onPressed: async () => console.log("Imperative OK"),
      },
    ],
    onClose: () => console.log("Imperative LiquidGlassDialog Closed"),
  });
};

interface LiquidGlassDialogs {
  network: boolean;
  paste: boolean;
  one: boolean;
}
const liquidGlassDialogs = reactive<LiquidGlassDialogs>({
  network: false,
  paste: false,
  one: false,
});
const singleAction = ref<LiquidGlassDialogAction[]>([{ title: "OK", style: "default" }]);
const networkActions = ref<LiquidGlassDialogAction[]>([
  { title: "WLAN & Cellular", style: "default" },
  { title: "WLAN Only", style: "default" },
  { title: "Don't Allow", style: "primary" },
]);
const pasteActions = ref<LiquidGlassDialogAction[]>([
  { title: "Allow Paste", style: "default" },
  { title: "Don't Allow Paste", style: "primary" },
]);
const showNetworkDialog = () => (liquidGlassDialogs.network = true);
const showOnly1ActionDialog = () => (liquidGlassDialogs.one = true);
const showPasteDialog = () => (liquidGlassDialogs.paste = true);
const handleNetworkAction = (payload: LiquidGlassDialogActionPayload): void => {
  const { action, index } = payload;
  console.log("Network Permisson:", action.title, "Index:", index, action.title);
};

const handlePasteAction = (payload: LiquidGlassDialogActionPayload): void => {
  const { action, index } = payload;
  console.log("Paste  :", action.title, "Allowed:", index === 0);
};
const onDialogClose = (): void => console.log("Dialog Closed");
</script>
