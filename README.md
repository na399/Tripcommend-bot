# Tripcommender Bot

A chatbot that helps tourists discover Copenhagen

This project was made during the Copenhacks 2018. 


## Instruction


Install node (v.8) and npm  


Add values in `.env` using a template from `sample.env`

run  

```
npm install
```

run  

```
npm start dev
```

run the Bot Framework emulator and connect it to http://localhost:3978/api/messages with Microsoft App ID and password

## Recommendation Engine

We used Microsoft's [Product Recommendations Preconfigured Solution](https://github.com/Microsoft/Product-Recommendations/tree/334fc6f3db5366b6b5a9b8e8fd47b6e6af7308f9).

Training data can be found in [`./recommendation`](./recommendation).

