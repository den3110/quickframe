import React, { useContext, useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  useTheme,
  FormGroup,
  Switch,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MuiChipsInput } from "mui-chips-input";
import signalStrategyApi from "api/singal-strategy/signalStrategyApi";
import { showToast } from "components/toast/toast";
import { JwtContext } from "contexts/jwtContext";
import { useTranslation } from "react-i18next";

const NewBotAIStringMethod = ({
  open,
  onClose,
  is_edit,
  setIsEdit,
  selectedBot,
  setChange,
  isFromCopyPlan

}) => {
  const { decodedData } = useContext(JwtContext);
  const theme = useTheme();
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [idBotAI, setIdBotAI] = useState();
  const [name, setName] = useState("");
  const [strategy, setStrategy] = useState("STRING_METHOD");
  const [chainSignal, setChainSignal] = useState([]);
  const [allResults, setAllResults] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const {t }= useTranslation()

  const isDisableButton = name?.length <= 0 || chainSignal?.length <= 0;
  const handleChangeChainSignal = (value) => {
    setChainSignal(value);
  };

  const handleChangeAllResult = (e) => {
    setAllResults(e.target.checked);
  };

  const handleClose = () => {
    setIsEdit(false);
    onClose();
  };

  const handleSubmit = async () => {
    try {
      setReadOnly(true)
      const data = {
        name,
        sources: {
          allResults,
          conditions: chainSignal,
        },
        is_default: isDefault,
        type: strategy,
      };
      let response;
      if (is_edit === true && isFromCopyPlan !== true) {
        response = await signalStrategyApi.userBudgetSignalUpdate(
          idBotAI,
          data
        );
      } else {
        response = await signalStrategyApi.userBudgetSignalCreate(data);
      }
      if (response?.data?.ok === true) {
        showToast(
          (is_edit === true && isFromCopyPlan !== true)
            ? "Lưu phương pháp thành công"
            : "Tạo phương pháp thành công",
          "success"
        );
        setName("");
        setChainSignal([]);
        setAllResults(false);
        handleClose();
        setChange((prev) => !prev);
      } else if (response?.data?.ok === false) {
        showToast(response?.data?.m, "error");
      }
    } catch (error) {
      console.log(error)
      showToast(error?.response?.data?.m, "error");
    }
    finally {
      setReadOnly(false)
    }
  };

  useEffect(() => {
    if (is_edit === true) {
      setIdBotAI(selectedBot?._id);
      setName(selectedBot?.name);
      setChainSignal(selectedBot?.sources?.conditions);
      setAllResults(selectedBot?.sources?.allResults);
      setIsDefault(selectedBot?.is_default);
    } else {
      setName("");
      setChainSignal([]);
      setAllResults(false);
      setIsDefault(false);
    }
  }, [is_edit, selectedBot]);

  useEffect(() => {
    if (is_edit === true && selectedBot?.userId !== decodedData?.data?._id) {
      setReadOnly(true);
    } else if (
      is_edit === true &&
      selectedBot?.userId === decodedData?.data?._id
    ) {
      setReadOnly(false);
    } else if (is_edit !== true) {
      setReadOnly(false);
    }
  }, [is_edit, selectedBot, decodedData]);

  return (
    <Drawer
      anchor={downLg ? "bottom" : "right"}
      open={open}
      onClose={handleClose}
      sx={{ zIndex: "" }}
    >
      <Box
        sx={{
          width: downLg ? "100%" : 850,
          height: downLg ? "70vh" : "100vh",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "space-between",
          overflow: "auto",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Typography variant="h6">{t("Set up your Bot AI")}</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography variant="subtitle1">1. {t("Bot Name")}*</Typography>
          <TextField
            inputProps={{ readOnly: readOnly }}
            placeholder={t("Enter Bot Name")}
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Typography variant="subtitle1">2. {t("Strategy")}*</Typography>
          <Select
            disabled={readOnly}
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            fullWidth
          >
            <MenuItem value="STRING_METHOD">String method</MenuItem>
          </Select>

          <Typography variant="subtitle1">3. {t("Set pattern")}</Typography>
          <MuiChipsInput
            value={chainSignal}
            onChange={handleChangeChainSignal}
            placeholder={t("Press enter to add...")}
            disabled={readOnly}
          />
          <Typography variant="subtitle1">
            4. {t("Use both waiting and resulting candles")}
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                disabled={readOnly}
                checked={allResults}
                onChange={handleChangeAllResult}
              />
            }
            label="All results"
          />
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", marginTop: 2 }}
          >
            * s = SELL, b = BUY <br />
            * {t("The resulting string and the wanted signal are separated by -")}
            <br />
            * Nhiều chuỗi có thể kết hợp và các chuỗi dài hơn được ưu tiên. Một
            chuỗi hợp lệ phải có ký tự 's' hoặc 'b' và ký tự 'x' không nằm ở đầu
            chuỗi.
            <br />
            * Ngoài ra, chuỗi tín hiệu có thể được rút ngắn nếu chuỗi bị trùng
            lặp hoặc quá dài như sau:
            <br />
            s-bbbbb → s-5b, sxx-b → s2x-b
          </Typography>
          {decodedData?.data?.levelStaff >= 3 && (
            <Box sx={{}}>
              <Typography fontSize={14} variant="subtitle1">
                {t("Usage strategy")}
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      disabled={readOnly}
                      checked={isDefault}
                      onChange={(e) => setIsDefault(e.target.checked)}
                      name="gilad"
                    />
                  }
                  label=<Typography fontSize={14} variant="subtitle1">
                    {t("Default Strategy")}
                  </Typography>
                />
              </FormGroup>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
            gap: 1,
            position: downLg ? "sticky" : "",
            bottom: downLg ? 0 : "",
            zIndex: downLg ? 2 : "",
            background: downLg ? theme.palette.background.paper : "",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ padding: "10px" }}
          >
            {t("Close")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: "10px" }}
            disabled={
              isDisableButton !== true && readOnly !== true ? false : true
            }
            onClick={handleSubmit}
          >
            {is_edit === true ? t("Save Bot") : t("Create Bot")}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default NewBotAIStringMethod;
