<h1 align="center">
  🥑 The Grocery Quest Game 🍊
</h1>

MERN Stack grocery shopping game.

## 🍓 Quick start 🍉
1.  **Setup Config.**
    
    1. Inside of ./config create a config.env file
    2. Copy the text below into your config.env file
    
        PORT = <PORT>
        MONGO_URI = <MONGO_URI>
        JWT_SECRET = <JWT_SECRET>

    3. Update the following fields:

        PORT = ["PORT"], -> 5000 
        MONGO_URI = ["MONGO_URI"], -> use the "connect" option on your database on mongoAtlas to obtain your mongoURI
        JWT_SECRET = ["JWT_SECRET"] -> create any secret phrase for Json Web Tokens, example "super-Secret-987"

    4. save config.env
    5. for more detailed instructions and examples refer to the README.md inside of ./config folder


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