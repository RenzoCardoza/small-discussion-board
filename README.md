# Overview

This is a small discussion board app that allows users to post a topic of interest and other users can comment and share their thoughts wheter they agree or not with the same topic. To use the app simple download the repo, install the project's dependencies, and then use the following command to start the server: npm run dev. The app will be running on the localhost:3000. it is required also to have an mongodb connection string to access the files.

I wrote this app since it was a challenge to me learn how to integrate TypeScript with an actual database and use it to render dynamic content from the server. I had the purpose of also learning about cloud databases with this project which was very interesting since I learned far more than only the database, I aimed to create a close to production app that has authentication and authorization rules that ensure that data is protected and accessed by the authorized users.

[Software Demo Video](https://youtu.be/F8xdDzO-xVE)

# Web Pages

- Home page: The home page serves to display the users or visitors the topics that are created on the website. It allows users to click and see details for the topics. Clicking any of the topics on the home page will take to the other page
- Topic details page: The topic details page shows the details of the topic, as well as allows users to post a comment, edit, or delete their own topics and comments. 
- Register/Log In pages: The pages serve as authentication and authorizing users to do specific actions such as posting comments, editing them or removing them. Only the owner of such comment or topic is authorized to manage it.
- Edit Topic/comment (Sub page): Simple UI that allows users to update comments and topics.

# Development Environment

- VS Code
- TypeScript
- Node.js
- Express.js
- EJS
- MongoDB
- Mongoose
- Express-session
- bcrypt
- method-override
- express-ejs-layouts


# Useful Websites

* [EJS Official Documentation](https://ejs.co/#docs)
* [TypeScript Official Documentation: Control Flow](http://typescriptlang.org/static/TypeScript%20Control%20Flow%20Analysis-8a549253ad8470850b77c4c5c351d457.png)
* [MongoDB Documentation](https://www.mongodb.com/docs/manual/)
* [TypeScript Official Documentation: Modules .d.ts](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html)
* [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
* [Express Docs: Error Handling](https://expressjs.com/en/5x/guide/error-handling/)
* [Express-ejs-layouts documentation](https://www.npmjs.com/package/express-ejs-layouts)
* [Bcrypt Docs](https://www.npmjs.com/package/bcrypt)
* [Method Override docs](https://www.npmjs.com/package/method-override)

# Future Work

* Refactor the code to avoid repetition in error handling functions
* Refactor code for efficiency in CRUD operations so I would use same functions for different collections but different inputs.
* Add messages with flash-messages another library in express.