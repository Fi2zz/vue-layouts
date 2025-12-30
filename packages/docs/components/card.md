# Card

A sheet of Material used to represent some related information.
A card has slightly rounded corners and an elevation shadow.

## Usage

<demo src="../demos/card/BasicCard.vue"></demo>

## Props

| Name         | Type           | Default               | Description                                                                    |
| ------------ | -------------- | --------------------- | ------------------------------------------------------------------------------ |
| elevation    | `number`       | `1`                   | The z-coordinate at which to place this card. Controls the size of the shadow. |
| color        | `string`       | `'#ffffff'`           | The card's background color.                                                   |
| shadowColor  | `string`       | `'#000000'`           | The color to paint the shadow.                                                 |
| shape        | `BorderRadius` | `BorderRadius.all(4)` | The shape of the card's border.                                                |
| margin       | `EdgeInsets`   | `4`                   | The empty space that surrounds the card.                                       |
| clipBehavior | `Clip`         | `'none'`              | The content will be clipped (or not) according to this option.                 |
