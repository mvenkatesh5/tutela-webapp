export const RenderSlateContent = (value: any) => {
  if (value.length > 0 && Array.isArray(value)) {
    return value;
  } else {
    return [
      {
        type: "paragraph",
        children: [{ text: value.length > 0 ? value : "" }],
      },
    ];
  }
};
