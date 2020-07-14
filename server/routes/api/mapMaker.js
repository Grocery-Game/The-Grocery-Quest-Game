const express = require('express');
const router = express.Router();

// @route  GET api/map
// @desc   Get a randomly generated map
// @access Public
router.get('/', (req, res) => {
    var map = generateMap();
    res.json(map);
});

const mapHeight = 15;
const mapWidth = 15;
const maxLength = 12;

generateMap = () => {
    
    let visited = [];
    let map = [];
     //up, right, down, left 
    const directions = [[-1, 0], [0, 1], [1 , 0], [0, -1]];
    const startingX = Math.floor(Math.random() * mapWidth);
    const startingY = Math.floor(Math.random() * mapHeight);
    let position = [startingX, startingY];

    //Creates coordinate map
    while (maxLength > visited.length) {

        if (visited.length == 0) {
            map.push(position);
            visited.push(position.toString());
        }

        //randomized direction
        let whereTo = directions[Math.floor(Math.random() * directions.length)];
        let x = position[0] + whereTo[0];
        let y = position[1] + whereTo[1];

        if (x >= 0 && y >= 0 && x <= mapWidth && y <= mapHeight && !visited.includes([x, y].toString())) {
            position = [x, y];
            map.push(position);
            visited.push(position.toString());
        }
    }
    
    return defineConnections(map, visited, generateRoomTypes(maxLength));
}

generateRoomTypes = (maxLength) => {
    
    //Generates list of roomTypes as IDs used later in obj
    let tricks = Math.round(maxLength * 0.2);
    let ingredients = 4;
    let specialItems = Math.round(maxLength * 0.2);

    //p = path, t = traps, 
    //i = ingredient, s = special item
    //b = beginning, e = end/checkout
    const types = ['p', 't', 'i', 's', 'b', 'e']; 
    let listOfRoomTypes = [];

    listOfRoomTypes.push(types[4]);
    listOfRoomTypes.push(types[5]);

    for (i = 2; i < tricks + 2; i++) {
        listOfRoomTypes.push(types[1] + i);
    }
    for (i = 2 + tricks; i < ingredients + 2 + tricks; i++) {
        listOfRoomTypes.push(types[2] + i);
    }
    for (i = 2 + tricks + ingredients; i < specialItems + 2 + tricks + ingredients; i++) {
        listOfRoomTypes.push(types[3] + i);
    }
    for (i = listOfRoomTypes.length; i < maxLength; i++) {
        listOfRoomTypes.push(types[0] + listOfRoomTypes.length);
    }

    //shuffles the array to randomize
    for (let i = listOfRoomTypes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [listOfRoomTypes[i], listOfRoomTypes[j]] = [listOfRoomTypes[j], listOfRoomTypes[i]];
    }

    return listOfRoomTypes;
}

defineConnections = (coordinates, stringOfCoordinates, typeIds) => {

    let obj = {};

    for (i = 0; i < coordinates.length; i++) {

        obj[typeIds[i]] = {};

        getDirection('above', obj, coordinates, stringOfCoordinates, typeIds, i);
        getDirection('right', obj, coordinates, stringOfCoordinates, typeIds, i);
        getDirection('bottom', obj, coordinates, stringOfCoordinates, typeIds, i);
        getDirection('left', obj, coordinates, stringOfCoordinates, typeIds, i);
    }
    
    return obj;
}

getDirection = (direction, obj, coordinates, stringOfCoordinates, typeIds, i) => {

    //the 3 arrays are correlated by the array index
    const up = [-1, 0];
    const right = [0, 1];
    const bottom = [1, 0];
    const left = [0, -1];

    switch(direction) {
        case 'above': 
            let ax = coordinates[i][0] + up[0];
            let ay = coordinates[i][1] + up[1];

            let aVal = stringOfCoordinates.indexOf([ax, ay].toString());
            if (aVal != -1) {
                obj[typeIds[i]].above = typeIds[aVal];
            };
            
            break;
        case 'right':
            let rx = coordinates[i][0] + right[0];
            let ry = coordinates[i][1] + right[1];

            let rVal = stringOfCoordinates.indexOf([rx, ry].toString());
            if (rVal != -1) {
                obj[typeIds[i]].right = typeIds[rVal];
            };
    
            break;
        case 'bottom':
            let bx = coordinates[i][0] + bottom[0];
            let by = coordinates[i][1] + bottom[1];

            let bVal = stringOfCoordinates.indexOf([bx, by].toString());
            if (bVal != -1) {
                obj[typeIds[i]].bottom = typeIds[bVal];
            }
            break;
        case 'left':
            let lx = coordinates[i][0] + left[0];
            let ly = coordinates[i][1] + left[1];

            let lVal = stringOfCoordinates.indexOf([lx, ly].toString());
            if (lVal != -1) {
                obj[typeIds[i]].left = typeIds[lVal];
            }
            break;
        default:
    }
} 

module.exports = router;