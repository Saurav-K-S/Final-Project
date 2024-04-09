import React, {useState} from "react"
import TabBar from "../../components/TabBar"
import HomePage from "../homepage/HomePage";
import TreePage from "../treepage/TreePage";
import Profile from "../profile/Profile";
import EventPage from "../events/EventPage";
import AlbumPage from "../album/AlbumPage";

function MainElement({index}) {
    switch (index) {
        case 0:
            return(<HomePage/>)
        case 1:
            return(<Profile/>)
        case 2:
            return(<TreePage/>)
        case 3:
            return(<EventPage/>)
        case 4:
            return(<AlbumPage/>)
        default:
            break;
    }
    
}

export default function BasePage() {

    const [index, setIndex] = useState(0);

    const handleTabChange = (newIndex) => {
      setIndex(newIndex);
    };

    return(
        <div className="h-screen w-screen flex">
            <TabBar onTabChange={handleTabChange} selectedIndex={index}/>
            <div className="w-[85%] h-screen">
                <MainElement index={index}/>
            </div>

        </div>
    )
    
}