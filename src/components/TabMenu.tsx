import { useState } from "react";
import styled from "styled-components";
import Today from "./Today";
import Feed from "./Feed";

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
        { name: "TODAY", content: <Today /> },
        { name: "FEED", content: <Feed /> },
    ];

    const selectMenuHandler = (index: any) => {
        clickTab(index);
        localStorage.setItem("tab", index);
    };

    const tabIndex = localStorage.getItem("tab");

    return (
        <>
            <div>
                <TabMenuItem>
                    {menuArr.map((el, index) => (
                        <li key={index} className={index === +tabIndex ? "submenu focused" : "submenu"} onClick={() => selectMenuHandler(index)}>
                            {el.name}
                        </li>
                    ))}
                </TabMenuItem>
                <Desc>
                    <div>{menuArr[+tabIndex].content}</div>
                </Desc>
            </div>
        </>
    );
};

export default TabMenu;
