import React, { createContext, useState } from "react";


// init and create global context

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {

    


    return  <GlobalContext.Provider 
                value={{
               
                }}>

                    {children} 

            </GlobalContext.Provider>

}