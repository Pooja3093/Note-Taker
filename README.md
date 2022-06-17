## miniature-spork

# Note Taker Application

## Module 11 challenge

## Description

This application was created for module 11 Express challenge. In this challenge, the ability to design a basic server using express is to be demonstrated.

This is a note taker application. In this application, user can save new note, delete existing note and view existing notes.

The landing page for this application is a simple HTML with "Get Started" button. When the user clicks on the button, a new HTML pageis opened. Here all the notes functionalities mentioned above can be executed.

The notes HTML loads with any existing notes on the left and an empty editor on hte right. If the user clicks on any existing note, it will be displayed in the editor. In the background, for this a GET request is made to the server, to fetch all notes.

In an empty editor, if a user writes a new note, a save button will appear on the top right. When clicked it will save the note. In the background, for this a POST request is made with the note data in the body.

When the user clicks a delete button, a POST request is made alongwith the ID of the note and the notelist is refreshed.


## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  - [Links](#links)
  - [Screenshot](#screenshot)


## Installation

The user should clone the repository from GitHub and download Node. This application also requires a file system and inquirer module.

After cloning the repository, run "npm install" command to install all dependencies.


## Usage

Run command "npm start" in terminal to start the server. Then in your browser open url "http://localhost:3001"

This will start the application. Watch the walk through video for reference on how to navigate throught he application.


## Links

[Github repository](https://github.com/Pooja3093/miniature-spork.git)

[Walk through video]()


## Screenshot
![screenshot_index](\Develop\public\assets\images\index.png)

![screenshot_notes](\Develop\public\assets\images\notes.png)
