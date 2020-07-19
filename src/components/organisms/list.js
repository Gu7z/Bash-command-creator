import React, { useState, useEffect } from "react";
import { Button } from "../atoms";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getCommands, deleteCommand } from "../../utils";

const List = () => {
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    const commands = getCommands();
    setCommands(commands);
  }, []);

  const deleteCommands = (commandName) => {
    const commands = deleteCommand(commandName);
    setCommands(commands);
  };

  return (
    <div
      style={{
        color: "white",
      }}
    >
      {commands.map((command, key) => (
        <Box
          key={key}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box component="h3" maxWidth="40%">
            {command.name}
          </Box>
          <Box>
            <Button
              component={Link}
              to={{
                pathname: "/",
                state: {
                  nameToSet: command.name,
                  codeToSet: command.code,
                },
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                deleteCommands(command.name);
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      ))}
    </div>
  );
};

export default List;
