import React, { useContext, useState, useEffect } from "react";
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
import AuthContext from "contexts/AuthContext";
import { constant } from "constant/constant";

const FilterPortfolios = ({ open, onClose, setData, data, setPage }) => {
  const { decodedData } = useContext(JwtContext);
  const { t } = useTranslation();
  const theme = useTheme();
  const { selectedLinkAccount, userLinkAccountList } = useContext(AuthContext);
  const [selectedFilterTypes, setSelectedFilterTypes] = useState([]);

  const [runningFilters, setRunningFilters] = useState({
    running: true,
    paused: true,
    all: true,
  });
  const [autoTypeFilters, setAutoTypeFilters] = useState({
    botAI: true,
    copyTrade: true,
    telegramSignal: true,
    telebot: true,
  });
  const [accountTypeFilters, setAccountTypeFilters] = useState({
    demo: true,
    live: true,
  });

  const [accountLinkedFilter, setAccountLinkedFilter] = useState([]);

  useEffect(() => {
    if (selectedLinkAccount) {
      setAccountLinkedFilter([selectedLinkAccount]);
    }
  }, [selectedLinkAccount]);

  const handleFilterTypeChange = (event) => {
    setSelectedFilterTypes(event.target.value);
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

  const handleAccountLinkedChange = (event) => {
    const { value, checked } = event.target;
    setAccountLinkedFilter((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleCheckboxChange = (filterType) => (event) => {
    setSelectedFilterTypes((prevSelected) => {
      if (prevSelected.includes(filterType)) {
        return prevSelected.filter((v) => v !== filterType);
      } else {
        return [...prevSelected, filterType];
      }
    });
  };

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
        case "accountLinked":
          filteredData = filteredData.filter((item) =>
            accountLinkedFilter.includes(item.linkAccountId)
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
    setAccountLinkedFilter([selectedLinkAccount]);
    setData(data);
    setPage(1);
    onClose();
  };

  const renderFilterOptions = (filterType) => {
    switch (filterType) {
      case "isRunning":
        return (
          <Box>
            <Typography>{t("On Going Plan")}</Typography>
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
            <Typography>{t("auto_type")}</Typography>
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
            <Typography>{t("Account Type")}</Typography>
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
      case "accountLinked":
        const handleAllAccountsChange = (event) => {
          const { checked } = event.target;
          if (checked) {
            setAccountLinkedFilter(userLinkAccountList.map((item) => item._id));
          } else {
            setAccountLinkedFilter([]);
          }
        };

        const isAllAccountsChecked =
          userLinkAccountList.length > 0 &&
          accountLinkedFilter.length === userLinkAccountList.length;

        return (
          <Box>
            <Typography>{t("Show all account")}</Typography>
            <FormControl component="fieldset" key="accountLinked">
              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={isAllAccountsChecked}
                    onChange={handleAllAccountsChange}
                  />
                }
                label={t("Show all account")}
              /> */}
              {userLinkAccountList?.map((item, key) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={accountLinkedFilter.includes(item._id)}
                      onChange={handleAccountLinkedChange}
                      value={item._id}
                    />
                  }
                  label={
                    <Box display={"flex"} alignItems={"center"} gap={0.5}>
                      <img
                        style={{
                          width: 32,
                          height: 32,
                          border: "10px",
                          overflow: "hidden",
                        }}
                        src={
                          constant.URL_ASSETS_LOGO +
                          "/" +
                          item?.clientId +
                          ".ico"
                        }
                        alt="Can't open"
                      />{" "}
                      <Typography
                        fontSize={14}
                        textOverflow={"ellipsis"}
                        overflow={"hidden"}
                        whiteSpace={"nowrap"}
                      >
                        {item?.nickName}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </FormControl>
          </Box>
        );
      default:
        return null;
    }
  };

  const allFilters = ["isRunning", "autoType", "accountType", "accountLinked"];

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
                            : value === "accountType"
                            ? "Account Type"
                            : "linked_account"
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
                      : option === "accountType"
                      ? "Account Type"
                      : "linked_account"
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
        <Button variant="contained" onClick={applyFilters}>
          {t("Apply")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterPortfolios;
