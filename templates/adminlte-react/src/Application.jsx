import logo from './logo.svg';
import './application.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from "./layouts/PublicLayout"
import HomeIndex from './pages/Home';
import useBreakpoints from './hooks/useBreakpoints';
import  AuthProvider from "./contexts/AuthContext";
import BREAKPOINTS from './assets/theme/base/breakpoints';
import PrivateRoute from './components/Route/PrivateRoute';

function Application() {
  
  const screenSize = useBreakpoints();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(screenSize == "sm" ? true :  screenSize == "xs" ? true : false);
  const [smallScreenSidebar, setSmallScreenSidebar] = useState(screenSize == "sm" ? true : screenSize == "xs" ? true : false);
  
  function handleSidebarToggle(flag) {
    if(flag === undefined){
      setSidebarCollapsed(!sidebarCollapsed);
    }else{
      
      setSidebarCollapsed(flag);
    }
  }
  function handleWindowResize() {
    if (screenSize == "sm" || screenSize == "xs") {
      setSidebarCollapsed(true);
      setSmallScreenSidebar(true);
    } else {
      setSmallScreenSidebar(false);
      if (!sidebarCollapsed) {
        setSidebarCollapsed(false);
      }
    }
  }
  
  return (
    <div className={"App sidebar-mini ".concat(
                                                sidebarCollapsed && (screenSize !="sm" && screenSize !="xs") ? "sidebar-collapse" :
                                                sidebarCollapsed && (screenSize =="sm" || screenSize =="xs") ? "sidebar-open" : "")}>
        <div className="wrapper">
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Navigate to={"home"} />} />
                <Route exact path = "/" element={<PrivateRoute screenSize={screenSize} sidebarCollapsed={sidebarCollapsed} sidebarToggleHandler={handleSidebarToggle}></PrivateRoute>}>
                    <Route path="home" element={<HomeIndex></HomeIndex>} />
                  </Route>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </div>
    </div>
  );
}

export default Application;
