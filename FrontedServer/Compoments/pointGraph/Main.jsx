import React, { Component } from "react";
import axios from "axios";
import { Grid, Paper, styled, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { saveAs } from "file-saver";

// Utility functions to calculate mean, mode, median
const calculateMean = (data) => {
  return data.reduce((a, b) => a + b, 0) / data.length;
};

const calculateMedian = (data) => {
  data.sort((a, b) => a - b);
  const half = Math.floor(data.length / 2);
  if (data.length % 2 === 0) {
    return (data[half - 1] + data[half]) / 2;
  }
  return data[half];
};

const calculateMode = (data) => {
  const frequency = {};
  let maxFreq = 0;
  let mode = [];
  data.forEach((value) => {
    frequency[value] = (frequency[value] || 0) + 1;
    if (frequency[value] > maxFreq) {
      maxFreq = frequency[value];
      mode = [value];
    } else if (frequency[value] === maxFreq) {
      mode.push(value);
    }
  });
  return mode;
};

// Styled component for bold text with additional CSS
const BoldCell = styled("div")({
  color: "#fff",
  "&:hover": {
    boxShadow: "2px 2px 10px #ccc", // Hover box shadow
  },
});

// Animated delay class
const AnimatedDelay = styled("div")({
  animation: "fadeIn 1s forwards",
  opacity: 0,
  animationDelay: "0.5s",
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
});

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statistics: {
        sum: 0,
        mean: 0,
        total: 0,
        mode: [],
        median: 0,
      },
      loading: true, // State for loading indicator
    };
  }

  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(this.fetchData, 10000); // Update data every 10 seconds
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchData = () => {
    axios
      .get("https://vendobackend-2.onrender.com/users")
      .then((result) => {
        const salaries = result.data.map((user) => user.salary);
        const sum = salaries.reduce((a, b) => a + b, 0);
        const mean = calculateMean(salaries);
        const median = calculateMedian(salaries);
        const mode = calculateMode(salaries);

        // Assuming 'total' is the total number of users
        const total = result.data.length;

        this.setState({
          statistics: {
            sum: sum,
            mean: mean,
            total: total,
            mode: mode,
            median: median,
          },
          loading: false, // Update loading state when data is fetched
        });

        // Update Google Sheets
        this.updateGoogleSheets(sum, mean, total, mode.join(", "), median);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        this.setState({ loading: false }); // Update loading state in case of error
      });
  };

  updateGoogleSheets = (sum, mean, total, mode, median) => {
    // Example of how to use Axios to post data to Google Sheets API
    // Replace with your actual endpoint and sheet ID
    const endpoint = "YOUR_GOOGLE_SHEETS_ENDPOINT";
    const sheetId = "YOUR_GOOGLE_SHEET_ID";
    const accessToken = "YOUR_GOOGLE_ACCESS_TOKEN";

    const rowData = {
      datetime: new Date().toLocaleString(),
      total: total,
      sum: sum,
      mean: mean,
      mode: mode,
      median: median,
    };

    axios
      .post(
        `${endpoint}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED&access_token=${accessToken}`,
        {
          values: [[
            rowData.datetime,
            rowData.total,
            rowData.sum,
            rowData.mean,
            rowData.mode,
            rowData.median,
          ]],
        }
      )
      .then((response) => {
        console.log("Successfully updated Google Sheets:", response);
      })
      .catch((error) => {
        console.error("Error updating Google Sheets:", error);
      });
  };

  handleDownloadExcel = () => {
    const { statistics } = this.state;
    const fileName = `statistics_${new Date().toLocaleString().replace(/[\/, :]/g, '-')}.xlsx`;

    // Example using exceljs to generate Excel file
    const ExcelJS = require('exceljs');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Statistics');

    worksheet.columns = [
      { header: 'DateTime', key: 'datetime', width: 25 },
      { header: 'Total', key: 'total', width: 15 },
      { header: 'Sum', key: 'sum', width: 15 },
      { header: 'Mean', key: 'mean', width: 15 },
      { header: 'Mode', key: 'mode', width: 25 },
      { header: 'Median', key: 'median', width: 15 }
    ];

    const data = [
      {
        datetime: new Date().toLocaleString(),
        total: statistics.total,
        sum: statistics.sum,
        mean: statistics.mean,
        mode: statistics.mode.join(", "),
        median: statistics.median
      }
    ];

    data.forEach((row) => {
      worksheet.addRow(row);
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, fileName);
    });
  };

  render() {
    const { statistics, loading } = this.state;

    const rows = [
      { id: 1, statistic: "Total Emp.", value: statistics.total },
      { id: 2, statistic: "Sum", value: statistics.sum },
      { id: 3, statistic: "Mean", value: statistics.mean },
      { id: 4, statistic: "Mode", value: statistics.mode.join(", ") },
      { id: 5, statistic: "Median", value: statistics.median },
    ];

    const columns = [
      {
        field: "statistic",
        headerName: "Statistic",
        width: 150,
        renderCell: (params) => (
          <AnimatedDelay>
            <BoldCell>{params.value}</BoldCell>
          </AnimatedDelay>
        ),
        headerClassName: "bold-header", // Add class for header to make it bold
      },
      {
        field: "value",
        headerName: "Value",
        width: 150,
        renderCell: (params) => (
          <AnimatedDelay>
            <div>{params.value}</div>
          </AnimatedDelay>
        ),
      },
    ];

    return (
      <Grid container spacing={3} style={{ color: "#fff" }}>
        <Grid item xs={12} sm={6}>
          <div className="px-5 mt-3">
            <div className="justify-content-center">
              <h2>Statistics</h2>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleDownloadExcel}
              >
                Download Excel
              </Button>
            </div>
            <div className="mt-3">
              <Paper
                style={{
                  height: 400,
                  width: "100%",
                  backgroundColor: "#000", // Black background color
                  color: "#fff", // White text color
                }}
              >
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <DataGrid
                    style={{
                      color: "#fff", // White text color
                   
 // White text color
                    }}
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    autoHeight // Adjust height automatically
                  />
                )}
              </Paper>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Add your chart components here */}
        </Grid>
      </Grid>
    );
  }
}

export default Main;
