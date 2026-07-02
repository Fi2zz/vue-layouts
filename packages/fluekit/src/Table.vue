<template>
  <Container
    :width="width"
    :height="height"
    :decoration="decoration"
    :margin="margin"
    :padding="padding"
    :clip-behavior="clipBehavior"
  >
    <table
      :style="{
        width: '100%',
        borderCollapse: 'collapse',
        borderSpacing: 0,
        tableLayout: fixed ? 'fixed' : 'auto',
      }"
    >
      <thead v-if="showHeader">
        <tr :style="headerRowStyle">
          <th
            v-for="col in columns"
            :key="col.key"
            :style="{
              textAlign: col.align || 'left',
              width: col.width ? px2vw(col.width) : undefined,
              padding: px2vw(cellPadding),
              borderBottom: border ? `1px solid ${resolveColor(dividerColor)}` : undefined,
              ...headerCellStyle,
            }"
          >
            <slot name="header" :column="col">
              <Text :style="headerTextStyle">{{ col.title }}</Text>
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in dataSource"
          :key="getRowKey(row, rowIndex)"
          :style="{
            backgroundColor:
              stripe && rowIndex % 2 === 1 ? resolveColor(stripeColor) : 'transparent',
            borderBottom:
              border && rowIndex < dataSource.length - 1
                ? `1px solid ${resolveColor(dividerColor)}`
                : 'none',
          }"
          @click="handleRowClick(row, rowIndex)"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            :style="{
              textAlign: col.align || 'left',
              width: col.width ? px2vw(col.width) : undefined,
              padding: px2vw(cellPadding),
              ...cellStyle,
            }"
          >
            <slot :name="col.key" :record="row" :index="rowIndex">
              <Text :style="cellTextStyle">{{ row[col.key] }}</Text>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="!dataSource || dataSource.length === 0"
      :style="{ textAlign: 'center', padding: px2vw(20) }"
    >
      <slot name="empty">
        <Text :style="emptyTextStyle">No Data</Text>
      </slot>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { CSSProperties } from "vue";
import Container from "./Container.vue";
import Text from "./Text.vue";
import { px2vw } from "./px2vw";
import { Colors } from "./Colors";
import type { EdgeInsets } from "./EdgeInsets";
import type { BoxDecoration } from "./BoxDecoration";
import type { TextStyle } from "./TextStyle";
import { Color } from "./Color";
import { resolveColor } from "./resolveColor";
import { Clip } from "./Clip";

defineOptions({ inheritAttrs: false });

export interface TableColumn {
  title: string;
  key: string;
  width?: number | string;
  align?: "left" | "center" | "right";
}

interface Props {
  columns: TableColumn[];

  dataSource: any[];

  rowKey?: string | ((row: any) => string | number);
  width?: number | string;
  height?: number | string;
  margin?: EdgeInsets;
  padding?: EdgeInsets;
  decoration?: BoxDecoration;
  border?: boolean;
  stripe?: boolean;
  fixed?: boolean;
  showHeader?: boolean;
  cellPadding?: number | string;
  dividerColor?: Color | string;
  stripeColor?: Color | string;
  headerTextStyle?: TextStyle;
  cellTextStyle?: TextStyle;
  emptyTextStyle?: TextStyle;
  headerRowStyle?: CSSProperties;
  headerCellStyle?: CSSProperties;
  rowStyle?: CSSProperties;
  cellStyle?: CSSProperties;
  clipBehavior?: Clip;
}

const props = withDefaults(defineProps<Props>(), {
  dataSource: () => [],
  border: true,
  stripe: false,
  fixed: false,
  showHeader: true,
  cellPadding: 16,
  dividerColor: () => Colors.grey200,
  stripeColor: () => Colors.grey50,
  clipBehavior: () => Clip.hardEdge,
});

const emit = defineEmits<{
  (e: "rowClick", row: any, index: number): void;
}>();

const getRowKey = (row: any, index: number) => {
  if (props.rowKey) {
    if (typeof props.rowKey === "function") {
      return props.rowKey(row);
    }
    return row[props.rowKey];
  }
  return index;
};

const handleRowClick = (row: any, index: number) => {
  emit("rowClick", row, index);
};
</script>
