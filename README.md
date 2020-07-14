<h1 align="center">
  🥑 The Grocery Quest Game 🍊
</h1>

MERN Stack grocery shopping game.

## 🍓 Quick start 🍉
1.  **Setup Config.**
    
    Inside of ./config create a default.json file
    Copy contents of placeholder-default.json into your new default.json file
    Update the following fields:

    "port": ["PORT"], -> 5000 
    "dbName": ["DB_NAME"] -> name of database you created on mongoAtlas 
    "mongoURI": ["MONGO_URI"], -> use the "connect" option on your database on mongoAtlas to obtain your mongoURI
    "jwtSecret": ["JWT_SECRET"] -> create any secret phrase for Json Web Tokens, example "super-Secret-987"
}

2.  **Start developing.**

    Navigate into The-Grocery-Quest-Game's directory and start it up.

    ```shell
    cd The-Grocery-Quest-Game/
    npm run dev
    ```

3.  **Open the source code and start editing!**

    Access client at: http://localhost:3000
    Access server at: http://localhost:5000/api/[endpoint]

## 🍅 Deploy 🥔

     ```shell
    heroku login
    heroku git:clone -a the-grocery-quest-game
    cd the-grocery-quest-game

    git add .
    git commit -am "commit message"
    git push heroku master
    ```