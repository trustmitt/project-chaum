import { useState } from "react";
import styled from "styled-components";
import MainComponent from "./MainComponent";
import FeedComponent from "./FeedComponent";

const TabMenuItem = styled.ul`
    background-color: #9ac3f4;
    color: #343a40;
    font-weight: bold;
    display: flex;
    align-items: center;
    list-style: none;
    margin-bottom: 1rem;
    border-radius: 10px 10px 0px 0px;
    cursor: pointer;

    .submenu {
        display: flex;
        width: calc(100% / 2);
        padding: 10px;
        font-size: 15px;
        transition: 0.5s;
        border-radius: 10px 10px 0px 0px;
    }

    .focused {
        background-color: #2f7ded;
        color: white;
    }

    & div.desc {
        text-align: center;
    }
`;

const Desc = styled.div`
    text-align: center;
`;

const TabMenu = () => {
    const [currentTab, clickTab] = useState(0);
    const menuArr = [
        { name: "TODAY", content: <MainComponent /> },
        { name: "FEED", content: <FeedComponent /> },
    ];

    const selectMenuHandler = (index: any) => {
        clickTab(index);
    };
    return (
        <>
            <div>
                <TabMenuItem>
                    {menuArr.map((el, index) => (
                        <li key={index} className={index === currentTab ? "submenu focused" : "submenu"} onClick={() => selectMenuHandler(index)}>
                            {el.name}
                        </li>
                    ))}
                </TabMenuItem>
                <Desc>
                    <div>{menuArr[currentTab].content}</div>
                </Desc>
            </div>
        </>
    );
};

export default TabMenu;
