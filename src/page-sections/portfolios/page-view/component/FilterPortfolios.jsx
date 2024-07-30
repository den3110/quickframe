import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  Box,
  useTheme,
  Typography,
} from "@mui/material";
import RestorePageIcon from "@mui/icons-material/RestorePage";
import { useTranslation } from "react-i18next";
import { AutoTypesTitleValueFilter } from "type/AutoTypes";
import { JwtContext } from "contexts/jwtContext";

const FilterPortfolios = ({ open, onClose, setData, data, setPage }) => {
  const { decodedData } = useContext(JwtContext);
  const { t } = useTranslation();
  const theme = useTheme();

  // State to manage selected filter types
  const [selectedFilterTypes, setSelectedFilterTypes] = useState([]);

  // States for various filters
  const [runningFilters, setRunningFilters] = useState({
    running: false,
    paused: false,
    all: false,
  });
  const [autoTypeFilters, setAutoTypeFilters] = useState({
    botAI: false,
    copyTrade: false,
    telegramSignal: false,
    telebot: false,
  });
  const [accountTypeFilters, setAccountTypeFilters] = useState({
    demo: false,
    live: false,
  });

  // Handle changes for filter type selection
  const handleFilterTypeChange = (event) => {
    setSelectedFilterTypes(event.target.value);
  };

  // Handle changes for different filters
  const handleRunningChange = (event) => {
    setRunningFilters({
      ...runningFilters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleAutoTypeChange = (event) => {
    setAutoTypeFilters({
      ...autoTypeFilters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleAccountTypeChange = (event) => {
    setAccountTypeFilters({
      ...accountTypeFilters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCheckboxChange = (filterType) => (event) => {
    // const value = event.target.value;
    setSelectedFilterTypes((prevSelected) => {
      if (prevSelected.includes(filterType)) {
        return prevSelected.filter((v) => v !== filterType);
      } else {
        return [...prevSelected, filterType];
      }
    });
  };

  // Apply filters based on selected filter types
  const applyFilters = () => {
    let filteredData = [...data];

    selectedFilterTypes.forEach((filterType) => {
      switch (filterType) {
        case "isRunning":
          const { running, paused, all } = runningFilters;
          if (running || paused || all) {
            filteredData = filteredData.filter(
              (item) =>
                (running && item.isRunning) ||
                (paused && !item.isRunning) ||
                all
            );
          }
          break;
        case "autoType":
          const { botAI, telegramSignal, copyTrade, telebot } = autoTypeFilters;
          filteredData = filteredData.filter(
            (item) =>
              (botAI && item.autoType === 0) ||
              (copyTrade && item.autoType === 1) ||
              (telebot && item.autoType === 2) ||
              (telegramSignal && item.autoType === 3)
          );
          break;
        case "accountType":
          const { demo, live } = accountTypeFilters;
          filteredData = filteredData.filter(
            (item) =>
              (demo && item.accountType === "DEMO") ||
              (live && item.accountType === "LIVE")
          );
          break;
        default:
          break;
      }
    });

    setPage(1);
    setData(filteredData);
    onClose();
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedFilterTypes([]);
    setRunningFilters({
      running: false,
      paused: false,
      all: false,
    });
    setAutoTypeFilters({
      botAI: false,
      telegramSignal: false,
      copyTrade: false,
      telebot: false,
    });
    setAccountTypeFilters({
      demo: false,
      live: false,
    });
    setData(data);
    setPage(1);
    onClose();
  };

  // Render filter options based on filter type
  const renderFilterOptions = (filterType) => {
    switch (filterType) {
      case "isRunning":
        return (
          <Box>
            <Typography>Gói đang chạy</Typography>
            <FormControl component="fieldset" key="isRunning">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={runningFilters.running}
                    onChange={handleRunningChange}
                    name="running"
                  />
                }
                label={t("Running")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={runningFilters.paused}
                    onChange={handleRunningChange}
                    name="paused"
                  />
                }
                label={t("Paused")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={runningFilters.all}
                    onChange={handleRunningChange}
                    name="all"
                  />
                }
                label={t("All")}
              />
            </FormControl>
          </Box>
        );
      case "autoType":
        return (
          <Box>
            <Typography>Loại gói</Typography>
            <FormControl component="fieldset" key="autoType">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={autoTypeFilters.botAI}
                    onChange={handleAutoTypeChange}
                    name="botAI"
                  />
                }
                label={AutoTypesTitleValueFilter[0]}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={autoTypeFilters.copyTrade}
                    onChange={handleAutoTypeChange}
                    name="copyTrade"
                  />
                }
                label={AutoTypesTitleValueFilter[1]}
              />
              {decodedData?.data?.levelStaff >= 3 && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={autoTypeFilters.telebot}
                      onChange={handleAutoTypeChange}
                      name="telebot"
                    />
                  }
                  label={AutoTypesTitleValueFilter[2]}
                />
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={autoTypeFilters.telegramSignal}
                    onChange={handleAutoTypeChange}
                    name="telegramSignal"
                  />
                }
                label={AutoTypesTitleValueFilter[3]}
              />
            </FormControl>
          </Box>
        );
      case "accountType":
        return (
          <Box>
            <Typography>Dạng tài khoản</Typography>
            <FormControl component="fieldset" key="accountType">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={accountTypeFilters.demo}
                    onChange={handleAccountTypeChange}
                    name="demo"
                  />
                }
                label="Demo"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={accountTypeFilters.live}
                    onChange={handleAccountTypeChange}
                    name="live"
                  />
                }
                label="Live"
              />
            </FormControl>
          </Box>
        );
      default:
        return null;
    }
  };
  const allFilters = ["isRunning", "autoType", "accountType"];
  // Get remaining filter options that can be added
  const getRemainingFilterOptions = () => {
    const allFilters = ["isRunning", "autoType", "accountType"];
    return allFilters.filter((f) => !selectedFilterTypes.includes(f));
  };

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>
        {t("Filter")}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <Button
            variant="text"
            color="primary"
            onClick={resetFilters}
            startIcon={<RestorePageIcon />}
          >
            {t("Reset")}
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box pt={2}>
          <FormControl fullWidth>
            <InputLabel
              sx={{ background: theme.palette.background.paper }}
              id="filter-select-label"
            >
              {t("Filters")}
            </InputLabel>
            <Select
              labelId="filter-select-label"
              multiple
              value={selectedFilterTypes}
              onChange={handleFilterTypeChange}
              renderValue={(selected) => (
                <Box
                  mt={0}
                  padding={0}
                  sx={{ display: "flex", flexWrap: "wrap" }}
                >
                  {selected.map((value) => (
                    <Box
                      key={value}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Checkbox
                        checked={selectedFilterTypes.includes(value)}
                        onChange={handleCheckboxChange(value)}
                        value={value}
                      />
                      <Box ml={1}>
                        {t(
                          value === "isRunning"
                            ? "On Going Plan"
                            : value === "autoType"
                            ? "Loại gói"
                            : "Account Type"
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            >
              {allFilters?.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox
                    checked={selectedFilterTypes.includes(option)}
                    onChange={handleCheckboxChange(option)}
                    value={option}
                  />
                  {t(
                    option === "isRunning"
                      ? "On Going Plan"
                      : option === "autoType"
                      ? "Loại gói"
                      : "Account Type"
                  )}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {selectedFilterTypes.map((filterType) => (
          <Box key={filterType} mt={2}>
            {renderFilterOptions(filterType)}
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("Cancel")}</Button>
        <Button onClick={applyFilters}>{t("Apply")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterPortfolios;
