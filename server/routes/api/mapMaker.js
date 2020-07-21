const express = require('express');
const router = express.Router();

// @route  GET api/mapMaker
// @desc   Get a randomly generated map
// @access Public
router.get('/', (req, res) => {
    var map = generateMap();
    res.json(map);
});

const mapHeight = 15;
const mapWidth = 15;
const maxLength = 12;

const above = [-1, 0];
const right = [0, 1];
const bottom = [1, 0];
const left = [0, -1];

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



        if (x >= 0 && y >= 0 && x <= mapWidth && y <= mapHeight) {
            position = [x, y];

            if (!visited.includes([x, y].toString())) {
                map.push(position);
                visited.push(position.toString());
            }
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
    let index;

    switch(direction) {
        case 'above': 
            index = indexOfCords(coordinates[i], stringOfCoordinates, above);

            if (index != -1) {
                obj[typeIds[i]].above = typeIds[index];
            }

            break;
        case 'right':
            index = indexOfCords(coordinates[i], stringOfCoordinates, right);

            if (index != -1) {
                obj[typeIds[i]].right = typeIds[index];
            }
            break;
        case 'bottom':
            index = indexOfCords(coordinates[i], stringOfCoordinates, bottom);

            if (index != -1) {
                obj[typeIds[i]].bottom = typeIds[index];
            }

            break;
        // left 
        default:
            index = indexOfCords(coordinates[i], stringOfCoordinates, left);

            if (index != -1) {
                obj[typeIds[i]].left = typeIds[index];
            }
            break;

    }
}

indexOfCords = ( coordinates, stringOfCoordinates, direction ) => {
    let x = coordinates[0] + direction[0];
    let y = coordinates[1] + direction[1];

    return stringOfCoordinates.indexOf([x, y].toString());
}  

module.exports = router;