import React from "react"
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./Components/side_bar/Sidebar";
import Routing from "./Components/display_Main_content/Routing";
import './App.css';
import Audiobar from "./Components/side_bar/Audioplayer/Audiobar";
import { SkeletonTheme } from "react-loading-skeleton";


const App=()=>{
  
  
  return(
    <BrowserRouter>
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <div className="side_bar_main_content">
        <Sidebar/>
        <div className="main_content"><Routing/></div>
      </div>
      <Audiobar/>
      </SkeletonTheme>
    </BrowserRouter>
 
  )
}

export default App