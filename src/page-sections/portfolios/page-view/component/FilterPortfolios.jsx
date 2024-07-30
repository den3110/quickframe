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
} from "@mui/material";
import RestorePageIcon from "@mui/icons-material/RestorePage";
import { useTranslation } from "react-i18next";
import { AutoTypesTitleValue } from "type/AutoTypes";
import { JwtContext } from "contexts/jwtContext";

const FilterPortfolios = ({ open, onClose, setData, data, setPage }) => {
  const { decodedData } = useContext(JwtContext);
  const { t } = useTranslation();
  const theme = useTheme();
  const [filterType, setFilterType] = useState("");
  const [runningFilters, setRunningFilters] = useState({
    running: false,
    paused: false,
    all: false,
  });
  const [autoTypeFilters, setAutoTypeFilters] = useState({
    botAI: false,
    telegramSignal: false,
    copyTrade: false,
    telebot: false,
  });
  const [accountTypeFilters, setAccountTypeFilters] = useState({
    demo: false,
    live: false,
  });

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

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

  const applyFilters = () => {
    let filteredData = [...data];

    if (filterType === "isRunning") {
      const { running, paused, all } = runningFilters;
      if (running || paused || all) {
        filteredData = filteredData.filter(
          (item) =>
            (running && item.isRunning) || (paused && !item.isRunning) || all
        );
      }
    } else if (filterType === "autoType") {
      const { botAI, telegramSignal, copyTrade, telebot } = autoTypeFilters;
      filteredData = filteredData.filter(
        (item) =>
          (botAI && item.autoType === 0) ||
          (telegramSignal && item.autoType === 1) ||
          (copyTrade && item.autoType === 2) ||
          (telebot && item.autoType === 3)
      );
    } else if (filterType === "accountType") {
      const { demo, live } = accountTypeFilters;
      filteredData = filteredData.filter(
        (item) =>
          (demo && item.accountType === "DEMO") ||
          (live && item.accountType === "LIVE")
      );
    }
    setPage(1);
    setData(filteredData);
    onClose();
  };

  const resetFilters = () => {
    setFilterType("");
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

  const renderFilterOptions = () => {
    switch (filterType) {
      case "isRunning":
        return (
          <FormControl component="fieldset">
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
              label={t("pause")}
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
        );
      case "autoType":
        return (
          <FormControl component="fieldset">
            <FormControlLabel
              control={
                <Checkbox
                  checked={autoTypeFilters.botAI}
                  onChange={handleAutoTypeChange}
                  name="botAI"
                />
              }
              label={AutoTypesTitleValue[0]}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={autoTypeFilters.telegramSignal}
                  onChange={handleAutoTypeChange}
                  name="telegramSignal"
                />
              }
              label={AutoTypesTitleValue[1]}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={autoTypeFilters.copyTrade}
                  onChange={handleAutoTypeChange}
                  name="copyTrade"
                />
              }
              label={AutoTypesTitleValue[2]}
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
                label={AutoTypesTitleValue[3]}
              />
            )}
          </FormControl>
        );
      case "accountType":
        return (
          <FormControl component="fieldset">
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
        );
      default:
        return null;
    }
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
              value={filterType}
              onChange={handleFilterTypeChange}
            >
              <MenuItem value="isRunning">{t("On Going Plan")}</MenuItem>
              <MenuItem value="autoType">Loại gói</MenuItem>
              <MenuItem value="accountType">{t("account_type")}</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {renderFilterOptions()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("Cancel")}</Button>
        <Button onClick={applyFilters}>{t("apply")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterPortfolios;
