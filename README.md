# Evil Traps for Firefox 🦊
A collection of web experiments that slow / crash the browser or annoy, spam or phish the user by exploiting bugs.

## Setup
Node v10 or higher recommended.

Install dependencies:
```
npm install
```

## Deploy
In order to run, you need to build the files once:
```
npm run build
```

Then you can start the application:
```
npm start
```

If you want to change the host / port the web server listens on simply pass the environment variables `HOST`, `PORT`.

Example in bash:
```
HOST=0.0.0.0 PORT=80 npm start
```

## Development
To run the app in development use
```
npm run dev
```
This will automatically compile and run the application and restart it if you make changes to the code.

### Add a new Evil Trap
To add a new evil trap to the app, create a new folder in [src/traps](src/traps). It should contain an `index.js` file exporting an [EvilTrap](src/EvilTrap.js) instance. Once created it should appear in the main navigation.

See the [HelloWorld trap](src/traps/hello-world) for an example.