import { Content } from "../../components/content/content"
import { SideBar } from "../../components/side-bar/SideBar"
import "./HomePage.css"
export const HomePage = () => {
  return (
    
    <>
      <div className="home-container">
        <SideBar/>
        <Content/>
      </div>
      
    </>
  )
}