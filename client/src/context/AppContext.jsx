import React, { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [notification, setNotification] = useState(null);

  return (
    <AppContext.Provider
      value={{
        selectedLabel,
        setSelectedLabel,
        searchTerm,
        setSearchTerm,
        taskToEdit,
        setTaskToEdit,
        notification,
        setNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
