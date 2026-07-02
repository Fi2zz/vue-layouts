export const OverlayVisibilityMode = {
  /// Overlay will never appear regardless of the text entry state.
  never: "never",

  /// Overlay will only appear when the current text entry is not empty.
  ///
  /// This includes prefilled text that the user did not type in manually. But
  /// does not include text in placeholders.
  editing: "editing",

  /// Overlay will only appear when the current text entry is empty.
  ///
  /// This also includes not having prefilled text that the user did not type
  /// in manually. Texts in placeholders are ignored.
  notEditing: "notEditing",

  /// Always show the overlay regardless of the text entry state.
  always: "always",
};

export type OverlayVisibilityMode =
  (typeof OverlayVisibilityMode)[keyof typeof OverlayVisibilityMode];
