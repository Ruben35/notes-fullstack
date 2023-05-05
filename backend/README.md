# Backend API for Notes 👾
This API was implemented using **Python** with its library **FastAPI**.

## Installation 💻
It requires to have [python3.9+](https://www.python.org/) previously installed. Also it needs the package manager [pip](https://pip.pypa.io/en/stable/) to install the requirements of the project. Because we use **``sqlite``** it is not necessary to install anything else for the database management. 

First of all, be positioned on the root of this `backend` folder.

Then, for **Windows** run the following commands:
```bash
python -m venv venv  
.\venv\Scripts\activate
pip install -r requirements.txt
```
For **Unix/MacOS** run the following commands:
```bash
python -m venv venv  
source venv/bin/activate
pip install -r requirements.txt
```

With the past step it is created a new virtual environment, then it is activated and finally the dependencies (contained on the file `requirements.txt`) are installed.

## Execution ⚙️
In this development environment the FlaskAPI is served by ``uvicorn`` so the way to run it you just need to type the following comand:
```bash
uvicorn main:app --reload --port 5000 --host 0.0.0.0
```
Where the following flags:
  - ``--reload``: It indicates to uvicorn to reload the entire application when a new change has been done on a file.
  - ``--port``: It indicates in which port of the server will run. 
    - **Note:** The port **5000** it's important because is the one we use to connect the Frontend.
  - ``--host``: It indicates in which subnets the server will be available. As it is in the example, it means that will be on every subnet of our network interfaces.
  
When it is the first run you will notice that a new file `database-notes.sqlite` will be created.

## Structure of Project 🧩
The project has it's entry point on the file ``main.py`` where:
- The **FastAPI** is initialized.
- Some configuration for Swagger is done (Swagger is a tool for creating documentation and testing on endpoints of an API).
- The SQLite database is initialized.
- Some middlewares are added.
  - **Note:** For development purposes it was added a CORS middleware with the rule that it allows origins from any place but it is highly recomended **don't use this rule on production**.
- And finally, many routers (for User, Auth and the Notes) where inclded in the app.
- 
The folder structure is organized as shown:
```
backend
├── config
├── middlewares
├── models
├── routers
├── services
├── utils
└── venv
    ├── Include
    ├── Lib
    └── Scripts
```
Where each folder represents the following:
- `/config`: It is the place where all the database configuration is done (the sqlite and sqlalchemy is initialized) and where other variables can be colected (like the JWT secret key).
  - **Note:** In this repository for development and easy installation purposes you can find the ``.env`` file on the root of ``/backend``. However is highly recommended do not upload the `.env` files to the GitHub repository and ignore them on the ``.gitignore``.
- `/middlewares`: Here is located a middleware that can return on each endpoint any error caused by the server sending a status 500, in other words an **error handler**. Another middleware located here is the one that checks the **JWT Bearer** on some endpoints, verifying the token and also providing to the endpoint the ``user_id`` which comes from the payload of the acces_token.
- `/models`: Here is located models for the SQLAlchemy in order to manipulate the querys and also it has a BaseModel for endpoint arguments validation.
- ``/routers``: Here are the construction of all the endpoints of the app, divided on "Auth", "User" and "Notes". Each one of them manages their requests and responses as needed and also depends of some middlewares.
- `/services`:It is the place where all the data operations on the database are done for "Note" and "User".
- `/utils`: Here is a folder for utils functions and classes for example the one here which is a module where they can use the common jwt operations such encode and decode a token.
- `/venv`: Here is the automatic folder created for our virtual environment.

## Endpoints 🌐
For this API the endpoints were divided in three groups:
- **User Endpoints**: In this category they are the main endpoints in order to generate a user and use it. Here we have:
  - **GET: /user** - That returns all users on a list.
  - **POST: /user** - That createsa new user verifyng if its name is not used by another.
- **Auth Endpoints**: In this category live the endpoints that gives us authentication. Here it is:
  - **POST: /login** - Where if the login is successfull it returns an ``access_token``.
- **Notes Endpoints**: In this category are located all the endpoints requested for the notes (with the change that all of them are securized by an ``access_token`` and some of them requires the ``user_id`` coming from the ``jwt_bearer`` middleware). THe endpoints are:
  - **GET: /notes** - To retrieve all the notes of a user.
  - **POST: /notes** - To save a note on the database.
  - **GET: /notes/{id}** - To get the specific information of a Note given his id.
  - **PUT: /notes/{id}** - To edit the information of a Note given his id.
  - **DELETE: /notes/{id}** - To delete the information of a Note given his id.

For more information about each endpoint (and a way for testing them and discover how to make requests with them) you should check the Swagger documentation available at [http://localhost:5000/docs](http://localhost:5000/docs) when the server is running.