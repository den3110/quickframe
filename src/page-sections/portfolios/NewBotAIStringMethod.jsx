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

const NewBotAIStringMethod = ({ open, onClose, is_edit, setIsEdit, selectedBot }) => {
  const theme= useTheme()
  const { decodedData } = useContext(JwtContext)
  const downLg = useMediaQuery(theme => theme.breakpoints.down("lg"));
  const [idBotAI, setIdBotAI]= useState()
  const [name, setName] = useState("");
  const [strategy, setStrategy] = useState("STRING_METHOD");
  const [chainSignal, setChainSignal] = useState([]);
  const [allResults, setAllResults] = useState(false);
  const [isDefault, setIsDefault]= useState(false)
  const isDisableButton = name?.length <= 0 || chainSignal?.length <= 0;
  const [submitting, setSubmitting]= useState(false)
  const {t }= useTranslation()
  const handleChangeChainSignal = (value) => {
    setChainSignal(value);
  };

  const handleChangeAllResult = (e) => {
    setAllResults(e.target.checked);
  };

  const handleClose= ()=> {
    setIsEdit(false)
    onClose()
  }

  const handleSubmit = async () => {
    try {
      const data = {
        name,
        sources: {
          allResults,
          conditions: chainSignal,
        },
        type: strategy,
      };
      let response
      setSubmitting(true)
      if(is_edit=== true) {
        response = await signalStrategyApi.userBudgetSignalUpdate(idBotAI, data);
      }
      else {
          response = await signalStrategyApi.userBudgetSignalCreate(data);
      }
      if (response?.data?.ok === true) {
        showToast(is_edit=== true? "Lưu phương pháp thành công" : "Tạo phương pháp thành công", "success");
        setName("")
        setChainSignal([])
        setAllResults(false)
        handleClose()
      } else if (response?.data?.ok === false) {
        showToast(response?.data?.m, "error");
      }
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
    }
    finally {
      setSubmitting(false)
    }
  };

  useEffect(()=> {
    if(is_edit=== true) {
        setIdBotAI(selectedBot?._id)
        setName(selectedBot?.name)
        setChainSignal(selectedBot?.sources?.conditions)
        setAllResults(selectedBot?.sources?.allResults)
        setIsDefault(selectedBot?.is_default)
    }
    else {
      setName("")
      setChainSignal([])
      setAllResults(false)
      setIsDefault(false)
    }
  }, [is_edit, selectedBot])

  return (
    <Drawer anchor={downLg ? "bottom" : "right"} open={open} onClose={handleClose} sx={{zIndex: ""}}>
      <Box
        sx={{
          width: downLg ? "100%" : 850,
          height: downLg ? "70vh" : "100vh",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "space-between",
          overflow: "auto"
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
            placeholder={t("Enter Bot Name")}
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Typography variant="subtitle1">2. Chiến lược*</Typography>
          <Select
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
          />
          <Typography variant="subtitle1">
            4. {t("Use both waiting and resulting candles")}
          </Typography>
          <FormControlLabel
            control={
              <Checkbox checked={allResults} onChange={handleChangeAllResult} />
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
            * {t("Multiple strings can be combined, and longer strings take precedence.")}
            <br />
            s-bbbbb → s-5b, sxx-b → s2x-b
          </Typography>
          {decodedData?.data?.levelStaff >= 3 && (
              <Box sx={{ padding: "8px 16px" }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        // disabled={readOnly}
                        checked={isDefault}
                        onChange={(e) => setIsDefault(e.target.checked)}
                        name="gilad"
                      />
                    }
                    label={t("Default Strategy")}
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
            position: downLg? "sticky": "",
            bottom: downLg ? 0: "",
            zIndex: downLg ? 2 : "",
            background: downLg ? theme.palette.background.paper : ""
          }}
        >
          <Button variant="outlined" onClick={handleClose} sx={{ padding: "10px" }}>
            {t("Close")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: "10px" }}
            disabled={(isDisableButton=== false && submitting=== false) ? false : true}
            onClick={handleSubmit}
          >
            {is_edit=== true ? t("Save Bot") : t("Create Bot")}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default NewBotAIStringMethod;
