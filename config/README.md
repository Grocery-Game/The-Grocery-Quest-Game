Instructions to create config.env

1. make a new file in this folder ./config called config.env
2. copy paste below text into config.env

PORT = 5000
MONGO_URI = <MONGO_URI>
JWT_SECRET = <JWT_SECRET>

3. change values for MONGO_URI
example: 

MONGO_URI = mongodb+srv://<account>:<user>@<database>.adklafd.mongodb.net/<collection>?etcetc
 - notice there are no " or '

JWT_SECRET = whateverStringYouWant

4. save config.env
