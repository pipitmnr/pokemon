import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

export default function Table({ title, data, columns, options }) {
  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableToolbar: {
          root: {
            textAlign: 'left',
          },
        },
        // MUIDataTable: {
        //   root: {
        //     backgroundColor: "#AAF",
        //   },
        //   paper: {
        //     boxShadow: "none",
        //   }
        // },
        // MUIDataTableBodyCell: {
        //   root: {
        //     backgroundColor: "#FFF"
        //   }
        // },
        // MuiToolbar: {
        //   root: {
        //     backgroundColor: '#f00'
        //   }
        // },
        // MuiTableCell: {
        //   head: {
        //     backgroundColor: 'purple',
        //   }
        // },
        // MUIDataTableSelectCell: {
        //   headerCell: {
        //     backgroundColor: 'blue',
        //   }
        // },
      },
    });
  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={options}
      />
    </MuiThemeProvider>
  );
}
