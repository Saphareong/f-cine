import {
  FormLabel,
  IconButton,
  Input,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getTicketTypeList } from "services/TicketTypeService";
import { MdAdd, MdDeleteOutline } from "react-icons/md";

const TicketTypeForm = ({
  showtimeTicketTypes,
  setShowtimeTicketTypes,
  ...props
}) => {
  const [ticketTypes, setTicketTypes] = useState([]);

  const fetchTicketType = () => {
    getTicketTypeList()
      .then((res) => {
        console.log(res);
        setTicketTypes(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddField = () => {
    let newFieldValues = [...showtimeTicketTypes];
    newFieldValues.push({ ticketTypeId: 0, receivePrice: null });
    setShowtimeTicketTypes(newFieldValues);
  };

  useEffect(() => {
    fetchTicketType();
  }, []);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            textTransform: "uppercase",
            fontSize: "0.75rem",
            fontWeight: 700,
            paddingBottom: "12px",
            letterSpacing: 0.5,
          }}
        >
          ticket type
        </Typography>
        <IconButton color="primary" onClick={handleAddField}>
          <MdAdd />
        </IconButton>
      </Stack>
      {showtimeTicketTypes?.map((item, index) => (
        <Stack
          key={index}
          direction="row"
          spacing={1.5}
          justifyContent="space-between"
          alignItems="end"
          sx={{
            marginBottom: "24px",
          }}
        >
          <Stack direction="column" spacing={1} sx={{ width: "50%" }}>
            <FormLabel
              htmlFor="ticketTypeId"
              sx={{
                fontWeight: "600",
                color: "neutral.800",
              }}
            >
              Type
            </FormLabel>
            <Select
              id="ticketTypeId"
              value={item?.ticketTypeId}
              onChange={(e) => {
                let newFieldValues = [...showtimeTicketTypes];
                newFieldValues[index].ticketTypeId = e.target.value;
                setShowtimeTicketTypes(newFieldValues);
              }}
              renderValue={
                item.ticketTypeId !== 0
                  ? undefined
                  : () => (
                      <Typography sx={{ color: "neutral.700" }}>
                        Ticket Type
                      </Typography>
                    )
              }
            >
              {ticketTypes?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack direction="column" spacing={1} sx={{ width: "50%" }}>
            <FormLabel
              htmlFor="receivePrice"
              sx={{
                fontWeight: "600",
                color: "neutral.800",
              }}
            >
              Price
            </FormLabel>
            <Input
              name="receivePrice"
              id="receivePrice"
              placeholder="Ticket Price"
              onChange={(e) => {
                let newFieldValues = [...showtimeTicketTypes];
                newFieldValues[index][e.target.name] = e.target.value;
                setShowtimeTicketTypes(newFieldValues);
              }}
              value={item.receivePrice === null ? "" : item.receivePrice}
            />
          </Stack>
          <IconButton
            disabled={index === 0}
            color="error"
            onClick={() => {
              let fields = [...showtimeTicketTypes];
              fields.splice(index, 1);
              setShowtimeTicketTypes(fields);
            }}
            sx={{
              width: "56px",
              height: "56px",
            }}
          >
            <MdDeleteOutline />
          </IconButton>
        </Stack>
      ))}
    </>
  );
};

export default TicketTypeForm;
