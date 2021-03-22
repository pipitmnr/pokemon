const labelDisplay = (label) => (
  <div>
    {/* {icon || <br />} */}
    <div>{label}</div>
  </div>
);

export function columns(props) {
  return [
    {
      name: 'name',
      label: props.name,
      options: {
        filter: false,
        sort: false,
        customHeadLabelRender: () => labelDisplay(props.name),
      },
    },
    {
      name: 'url',
      label: props.url,
      options: {
        filter: false,
        sort: false,
        customHeadLabelRender: () => labelDisplay(props.url),
      },
    },
  ];
}
