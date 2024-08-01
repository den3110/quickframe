import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  TableBody,
} from "@mui/material";
import affiliateApi from "api/affiliate/affiliateApi";
import { showToast } from "components/toast/toast";
import AuthContext from "contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { JwtContext } from "contexts/jwtContext";
import EmptyPage from "layouts/layout-parts/blank-list/BlankList";

const TriggerMember = (props) => {
  const { t } = useTranslation();
  const [type, setType] = useState("normal");
  const [nickName, setNickName] = useState("");
  const [activeList, setActiveList] = useState([]);
  const [loading, setLoading] = useState();
  const [change, setChange] = useState(false);
  const { selectedLinkAccount } = useContext(AuthContext);
  const { decodedData } = useContext(JwtContext);
  //   const {use}

  const CURRENCIES = [
    { name: "Tài khoản thường", value: "normal" },
    {
      name: "Tài khoản marketing",
      value: "mkt",
    },
  ];

  const handleChange = async (e) => {
    setType(e.target.value);
  };

  const handleScanf1 = async () => {
    try {
      const response = await affiliateApi.userExchangeLinkAccountScanActiveF1s(
        selectedLinkAccount
      );
      if (response?.data?.ok === true) {
        showToast("Quét hệ thống thành công", "success");
      } else if (response?.data?.ok === false) {
        showToast(t(response?.data?.err_code), "error");
      }
    } catch (error) {
      showToast(t(error?.response?.data?.m), "error");
    }
  };

  const handleActivateMkt = async () => {
    try {
      const payload = {
        nickName,
      };
      const response =
        await affiliateApi.userExchangeLinkAccountActiveMarketing(
          payload,
          selectedLinkAccount
        );
      if (response?.data?.ok === true) {
        showToast("Kích hoạt thành công", "success");
        setChange((prev) => !prev);
      } else if (response?.data?.ok === false) {
        showToast(t(response?.data?.err_code), "error");
      }
    } catch (error) {
      showToast(t(error?.response?.data?.m), "error");
    }
  };

  const handleActivateNormal = async () => {
    try {
      const payload = {
        nickName,
      };
      const response = await affiliateApi.userExchangeLinkAccountActiveNormal(
        payload,
        selectedLinkAccount
      );
      if (response?.data?.ok === true) {
        showToast("Kích hoạt thành công", "success");
        setChange((prev) => !prev);
      } else if (response?.data?.ok === false) {
        showToast(t(response?.data?.err_code), "error");
      }
    } catch (error) {
      showToast(t(error?.response?.data?.m), "error");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await affiliateApi.userExchangeLinkAccountActiveList(
          selectedLinkAccount
        );
        if (response?.data?.ok === true) {
          setActiveList(response?.data?.d);
        } else if (response?.data?.ok === false) {
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedLinkAccount, change]);

  return (
    <Box sx={{ width: "100%" }} mt={2}>
      <Box p={2}>
        <Box mb={2}>
          <Card>
            <Box p={1.5}>
              <TextField
                fullWidth
                select
                label={t("type")}
                value={type}
                onChange={handleChange}
              >
                {CURRENCIES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box style={{ display: "flex" }}>{t(option.name)}</Box>
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Card>
        </Box>
        <Box mt={2}>
          {type === "normal" && (
            <Box>
              {decodedData?.data?.levelStaff >= 3 && (
                <Box>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Card>
                          <Box p={1.5} mb={1} sx={{ width: "100%" }}>
                            <TextField
                              fullWidth
                              placeholder={t("Enter nickname")}
                              value={nickName}
                              onChange={(e) => setNickName(e.target.value)}
                            />
                            <Box
                              mt={2}
                              display={"flex"}
                              alignItems={"center"}
                              gap={2}
                            >
                              <Button onClick={handleActivateNormal}>
                                {t("active")}
                              </Button>
                              <Box>
                                <Button onClick={handleScanf1}>
                                  {t("system_scan")}
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        </Card>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Box>
                        <Card>
                          <Box p={1.5}>
                            {activeList?.length > 0 && (
                              <Table aria-label="simple table">
                                <TableHead>
                                  <TableRow>
                                    {/* <TableCell padding="checkbox" /> */}
                                    <TableCell>{t("Created time")}</TableCell>
                                    <TableCell>{t("nickname")}</TableCell>
                                    {/* <TableCell>{t("txid/description")}</TableCell> */}
                                    {/* <TableCell>{t("memo")}</TableCell> */}
                                    <TableCell>{t("status")}</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {activeList?.map((row, index) => (
                                    <TableRow
                                      hover
                                      sx={{
                                        borderBottom: (theme) =>
                                          index !== activeList.length - 1 &&
                                          `solid 1px ${theme.palette.border}`,
                                      }}
                                      key={row.ts}
                                    >
                                      <TableCell>
                                        {moment(row?.createdAt).format(
                                          "HH:mm:ss DD/MM"
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        {/* <Amount row={row} /> */}
                                        {row?.nickName}
                                      </TableCell>
                                      {/* <TableCell>
                                        <TxId row={row} />
                                        </TableCell>
                                        <TableCell>
                                        <Memo row={row} />
                                        </TableCell> */}
                                      <TableCell>
                                        {/* <Status row={row} /> */}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            )}
                            {activeList?.length <= 0 && (
                              <EmptyPage
                                title={t("no_data_to_display")}
                                disableButton={true}
                              />
                            )}
                          </Box>
                        </Card>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
              {decodedData?.data?.levelStaff < 3 && (
                <Box mt={1}>
                  <Button onClick={handleScanf1}>{t("system_scan")}</Button>
                </Box>
              )}
            </Box>
          )}
          {type === "mkt" && (
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Card>
                      <Box p={1.5} mb={1} sx={{ width: "100%" }}>
                        <TextField
                          fullWidth
                          placeholder={t("Enter nickname")}
                          value={nickName}
                          onChange={(e) => setNickName(e.target.value)}
                        />
                        <Box mt={2}>
                            <Button onClick={handleActivateMkt}>{t("active")}</Button>
                        </Box>
                      </Box>
                    </Card>
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box>
                    <Card>
                      <Box p={1.5}>
                        {activeList?.length > 0 && (
                          <Table aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                {/* <TableCell padding="checkbox" /> */}
                                <TableCell>{t("Created time")}</TableCell>
                                <TableCell>{t("nickname")}</TableCell>
                                {/* <TableCell>{t("txid/description")}</TableCell> */}
                                {/* <TableCell>{t("memo")}</TableCell> */}
                                <TableCell>{t("status")}</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {activeList?.map((row, index) => (
                                <TableRow
                                  hover
                                  sx={{
                                    borderBottom: (theme) =>
                                      index !== activeList.length - 1 &&
                                      `solid 1px ${theme.palette.border}`,
                                  }}
                                  key={row.ts}
                                >
                                  <TableCell>
                                    {moment(row?.createdAt).format(
                                      "HH:mm:ss DD/MM"
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {/* <Amount row={row} /> */}
                                    {row?.nickName}
                                  </TableCell>
                                  {/* <TableCell>
                                        <TxId row={row} />
                                        </TableCell>
                                        <TableCell>
                                        <Memo row={row} />
                                        </TableCell> */}
                                  <TableCell>
                                    {/* <Status row={row} /> */}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        )}
                        {activeList?.length <= 0 && (
                          <EmptyPage
                            title={t("no_data_to_display")}
                            disableButton={true}
                          />
                        )}
                      </Box>
                    </Card>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TriggerMember;
