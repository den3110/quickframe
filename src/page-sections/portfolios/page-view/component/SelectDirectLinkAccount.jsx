import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import portfolioApi from "api/portfolios/portfolioApi";
import { showToast } from "components/toast/toast";
import { constant } from "constant/constant";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const SelectDirectLinkAccount = ({plan, userLinkAccountList, setData, data}) => {
  const [submitting, setSubmitting]= useState(false)
  const [linkAccountIdSelected, setLinkAccountIdSelected]= useState(plan?.linkAccountId) 
  const {t }= useTranslation()
  
//   const {id }= useParams()
  useEffect(()=> {
    setLinkAccountIdSelected(plan?.linkAccountId)
  }, [plan?.linkAccountId])

  const handleChange= async (e)=> {
      try {
        
        const payload= {
            linkAccountId: e.target.value
        }
        setSubmitting(true)
        const response= await portfolioApi.postUserBotLinkAccount(plan?._id, payload)
        if(response?.data?.ok=== true) {
            showToast(t("update_successful"), "success")
            // console.log(linkAccountIdSelected, e.target.value)
            const tempData= data
            // console.log("temp data 1", tempData)
            const findIndex= data?.findIndex(item=> item?.linkAccountId=== linkAccountIdSelected)
            // console.log("find index", findIndex )
            tempData[findIndex]= {...data?.find(item=> item?.linkAccountId=== linkAccountIdSelected), linkAccountId: e.target.value}
            // console.log("temp data 2", tempData)
            setData(tempData)
            setLinkAccountIdSelected(e.target.value)
        }
        else if(response?.data?.ok=== false) {
            showToast(response?.data?.m)
        }
    } catch (error) {
        showToast(error?.response?.data?.m)
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <Box width={180}> 
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select">{plan?.accountType}</InputLabel>
        <Select
          disabled={submitting}
          label={plan?.accountType}// botinfo.accountType
          size="small"
          id="demo-simple-select"
          value={linkAccountIdSelected}
          onChange={handleChange}
        >
          {userLinkAccountList?.map((item, key) => (
            <MenuItem key={key} value={item?._id}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <img
                  style={{ width: 32, height: 32 }}
                  src={constant.URL_ASSETS_LOGO + "/" + item?.clientId + ".ico"}
                  alt="Can't open"
                />{" "}
                <Typography fontSize={14} textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"}>{item?.nickName}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectDirectLinkAccount;
