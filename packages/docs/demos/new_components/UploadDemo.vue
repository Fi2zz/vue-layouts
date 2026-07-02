<script setup lang="ts">
import { Upload, Button, Column, Text, type UploadFile } from "fluekit";
import { ButtonStylePreset } from "@fluekit/presets";
import { ref } from "vue";

const fileList = ref<UploadFile[]>([]);

const handleChange = (files: UploadFile[]) => {
  console.log("Files changed:", files);
};

const handleRequest = async (file: UploadFile) => {
  return new Promise((resolve, reject) => {
    console.log("Uploading...", file.name);
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Success");
      } else {
        reject(new Error("Failed"));
      }
    }, 2000);
  });
};

const handleValidate = (file: File) => {
  if (file.size > 1024 * 1024) {
    alert("File size must be less than 1MB");
    return false;
  }
  return true;
};
</script>

<template>
  <Column :gap="20">
    <Text>Basic Usage</Text>
    <Upload
      v-model:fileList="fileList"
      @change="handleChange"
      :request="handleRequest"
      :validate="handleValidate"
    >
      <Button :style="ButtonStylePreset.cupertinoFilled"> Select File</Button>
    </Upload>

    <Text>Multiple Selection</Text>
    <Upload multiple :request="handleRequest" :validate="handleValidate">
      <Button :style="ButtonStylePreset.cupertinoFilled">Select Multiple Files</Button>
    </Upload>
  </Column>
</template>
