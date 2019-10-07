import React from 'react';

export const getTitleList = (tabTitleList, currentTab, onSelectTab) => {
    let width = (100 / tabTitleList.length) + '%';
    return tabTitleList.map((title, index) => {
        let className = 'tab-title '
        if(index === currentTab) className += 'tab-selected';
        return (
            <div 
                key={index} style={{width}} className={className} 
                onClick={() => onSelectTab(index)}
            >
                {title}
            </div>
        )
    })
}

