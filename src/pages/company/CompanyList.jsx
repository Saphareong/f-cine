import React, { useState, useEffect } from "react";
import { Typography, Stack } from "@mui/material";
import { SearchBar } from "components/header/SearchBar";
import { DataTable } from "components";
import { getCompanyList } from "services/CompanyService";

const CompanyList = () => {
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    search: "",
    page: 1,
    pageSize: 10,
  });

  const gridOptions = {
    columns: [
      {
        headerName: "ID",
        field: "id",
        width: 80,
      },
      {
        headerName: "Logo",
        field: "logo",
        width: 100,
        renderCell: (cellValue) => {
          return (
            <div>
              <img
                className="avatar-cell"
                src={cellValue.value}
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  // border: "1.5px solid #E4E4E4",
                }}
              ></img>
            </div>
          );
        },
      },
      {
        headerName: "Company Name",
        field: "name",
        width: 250,
      },
      {
        headerName: "Manager's Name",
        field: "managerName",
        width: 200,
        valueGetter: ({ value }) => value || "-",
      },
      {
        headerName: "Manager's Email",
        field: "managerEmail",
        width: 350,
        valueGetter: ({ value }) => value || "-",
      },
      {
        headerName: "is Active",
        type: "boolean",
        field: "isActive",
        width: 100,
        valueGetter: ({ value }) => value || "-",
      },
    ],
    pageState: pageState,
  };

  const pageChangeHandler = (newPage) => {
    setPageState((old) => ({ ...old, page: newPage + 1 }));
  };

  const pageSizeChangeHandler = (newPageSize) => {
    setPageState((old) => ({ ...old, pageSize: newPageSize }));
  };

  const searchHandler = (searchValue) => {
    setPageState((old) => ({
      ...old,
      search: searchValue.searchTerm,
      page: 1,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true, data: [] }));

      const res = await getCompanyList({
        PageSize: pageState.pageSize,
        Page: pageState.page,
        SearchKey: pageState.search,
      });

      const dataRow = res.companies.results.map((data) => ({
        id: data.id,
        logo: data.logoUrl,
        name: data.name,
        managerName: data.managerName,
        managerEmail: data.managerEmail,
        isActive: data.isActive,
      }));

      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: dataRow,
        total: res.companies.total,
      }));
    };
    fetchData();
  }, [pageState.page, pageState.pageSize, pageState.search]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Companies
        </Typography>
        <SearchBar
          placeholder="Enter company's name..."
          onSubmit={searchHandler}
        />
      </Stack>

      <DataTable
        gridOptions={gridOptions}
        onPageChange={pageChangeHandler}
        onPageSizeChange={pageSizeChangeHandler}
      ></DataTable>
    </>
  );
};

export default CompanyList;