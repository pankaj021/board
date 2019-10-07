export const getElementValue = (element) => {
    if(element) return element.value;
    return "";
}

export const getCardsByColumnId = (cards, columnId) => {
    if(!cards) return [];
    return cards.filter(card => card.columnId === columnId);
}