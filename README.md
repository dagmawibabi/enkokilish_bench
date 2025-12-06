# Enkokilish Bench

This is a new benchmark for LLMs focused on evaluating an LLMs ability to understand, reason and solve Amharic riddles. 

I used [Evalite](evalite.dev) as the evals framework. It's typesafe, open-source and can scale to thousands of evals. It also integrates well with [AI-SDK](ai-sdk.dev) which I've used to make calls to LLMs. 

For the quickest setup, just clone, set your AI Gateway API Key in the `.env` file and just `pnpm eval:dev` then open `localhost:3000` and explore. Oh and quick tip :), I've organized and arranged it all in a way that you can rename and create any other benchmark of your choice just by changing the dataset and eval title. 

All the riddles and their answers are listed in datasets/enkokilsh.ts file and will keep on being updated. 
If you've got a few Enkokilish you know, please contribute in the GitHub. Thanks ❤️
