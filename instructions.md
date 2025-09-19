# Instructions by Super Admin (Martin)
*Note: Press Ctrl + Shift + V to access preview of this markdown sheet.*
## Things You Need to Have
1. VS Code IDE

    Download and Install from [Visual Studio Code Website](https://code.visualstudio.com/download)
2. Node JS
    
    Download and Install from [Node JS Website](https://nodejs.org/en/download/)
3. Live Server Extension on VS Code
   
   Install from the Extension Tab on VS Code. Search Live Server and then install extension.

   Kung dili mo man 

## How to Run Live Server and Node Server
### Live Server
1. **Activate Live Server**

    Open any HTML File and on the tab below of the VS Code. You could see the button named "Go Live", click and then you will be redirected to your default browser and flash the HTML File.

2. **Deactivate Live Server**

    From the same button namely the port the Live Server used. Click it again to deactivate and end session of the Live Server.

### Node Server
Right after installing Node JS straight from the browser. Let's start to configure 'em shii.

Follow the steps stupid ass pinoy bitch:
1. Press Ctrl + ` (Control at tilde boss, kung di mo alam kung ano yung tilde ay bahala ka na sa buhay mo) to open the built-in terminal of VSC. In the terminal, we gotta make some good shii by typing some cheapass terminal commands. Follow my lead.
    
    commands:
    
    1. let's initiate the node js in your working environment.
    
        ```npm init -y```

    2. After initiating the node js, let's install node dependencies. We will be installing the following dependencies and they are **express, nodemailer, and cors**.

        ```npm install express nodemailer cors```

        If there's already a package.json file in the working environment. You could just reinstall these dependencies thru:
            
        ```npm install``` or ```npm i```

    3. After installing these dependencies, we could now proceed on creating our *server.js* file. That will serve as the backend code for this static web page.

    4. Once done creating the *server.js* file, to start the Node Server that you have created in the terminal run:

        ```node server.js```

        You should see below the confirmation "Server running on http://localhost:3000"
    
    5. If you wanna deactivate them shii, just Press Ctrl + C to deactivate the Node Server.

Oh tapos na, naneto naubusan ako ng english sa 'yo.
    
