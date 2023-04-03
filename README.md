# gpt4all-ts 🌐🚀📚

gpt4all-ts is a TypeScript library that provides an interface to interact with GPT4All, which was originally implemented in Python using the [nomic SDK](https://github.com/nomic-ai/nomic/blob/main/nomic/gpt4all/gpt4all.py). This library aims to extend and bring the amazing capabilities of GPT4All to the TypeScript ecosystem.

gpt4all-ts is inspired by and built upon the GPT4All project, which offers code, data, and demos based on the LLaMa large language model with around 800k GPT-3.5-Turbo Generations 😲. You can find the GPT4All Readme [here](https://github.com/nomic-ai/gpt4all#readme) to learn more about the project.

🙏 We would like to express our gratitude to the [GPT4All](https://github.com/nomic-ai/gpt4all#readme) team for their efforts and support in making it possible to bring this library to life.

## Getting Started 🏁

To install and start using gpt4all-ts, follow the steps below:

### 1. Install the package

Use your preferred package manager to install gpt4all-ts as a dependency:

```sh
npm install gpt4all
# or
yarn add gpt4all
```

### 2. Import the GPT4All class

In your TypeScript (or JavaScript) project, import the `GPT4All` class from the `gpt4all-ts` package:

```typescript
import { GPT4All } from 'gpt4all-ts';
```

### 3. Instantiate and use the GPT4All class

Create an instance of the `GPT4All` class and follow the example in the [Example Usage](#example-usage-) section to interact with the model.

Happy coding! 💻🎉

## Example Usage 🌟

Below is an example of how to use the `GPT4All` class in TypeScript:

```typescript
import { GPT4All } from 'gpt4all-ts';

const main = async () => {
    // Instantiate GPT4All with default or custom settings
    const gpt4all = new GPT4All('gpt4all-lora-unfiltered-quantized', true); // Default is 'gpt4all-lora-quantized' model
  
    // Initialize and download missing files
    await gpt4all.init();

    // Open the connection with the model
    await gpt4all.open();
    // Generate a response using a prompt
    const prompt = 'Tell me about how Open Access to AI is going to help humanity.';
    const response = await gpt4all.prompt(prompt);
    console.log(`Prompt: ${prompt}`);
    console.log(`Response: ${response}`);
  
    const prompt2 = 'Explain to a five year old why AI is nothing to be afraid of.';
    const response2 = await gpt4all.prompt(prompt2);
    console.log(`Prompt: ${prompt2}`);
    console.log(`Response: ${response2}`);
  
    // Close the connection when you're done
    gpt4all.close();
}
  
main().catch(console.error);
```

To use the library, simply import the `GPT4All` class from the `gpt4all-ts` package. Create an instance of the `GPT4All` class and optionally provide the desired model and other settings.

After the gpt4all instance is created, you can open the connection using the `open()` method. To generate a response, pass your input prompt to the `prompt()` method. Finally, remember to close the connection using the `close()` method once you're done interacting with the model.

Here's some output from the GPT4All model which you can look forward to: 

> **Prompt:** Tell me about how Open Access to AI is going to help humanity.
> 
> **Response:** Open access to AI has already helped in numerous ways, such as improving medical diagnosis and treatment options through machine learning algorithms that analyze patient data more efficiently than humans can alone. It's also helping with the development of autonomous vehicles by using deep neural networks for image recognition and object detection tasks. Open Access is expected to play a crucial role in solving complex problems like climate change, drug discovery or even creating new jobs through AI-enabled automation technologies such as robotics process automation (RPA).

> **Prompt:** Explain to a five year old why AI is nothing to be afraid of.
> 
> **Response:** Artificial Intelligence, also known as AI or machine learning, are systems that can learn and improve themselves through data analysis without being explicitly programmed for each task they perform. They have the ability to understand complex patterns in large datasets which makes them useful tools across various industries such as healthcare, transportation, finance etc.
>
> AI is not something we should be afraid of because it has been designed with our best interests at heart and can help us make better decisions based on data analysis rather than gut feelings or personal preferences. AI systems are also becoming more transparent to users so that they understand how the system works, which helps build trust between them and their machines.
>
> AI is here to stay as it has already been adopted by many industries for its benefits in terms of cost savings, efficiency gains etc., but we need not be afraid or suspicious about this technology because AI can also benefit us if used properly with the right intentions behind it.


## Citation 📝

If you utilize this repository, the original GPT4All project, or its data in a downstream project, please consider citing it with:

```bibtex
@misc{gpt4all,
  author = {Yuvanesh Anand and Zach Nussbaum and Brandon Duderstadt and Benjamin Schmidt and Andriy Mulyar},
  title = {GPT4All: Training an Assistant-style Chatbot with Large Scale Data Distillation from GPT-3.5-Turbo},
  year = {2023},
  publisher = {GitHub},
  journal = {GitHub repository},
  howpublished = {\url{https://github.com/nomic-ai/gpt4all}},
}
```

If you have any questions or need help, feel free to join the [Discord](https://discord.com/invite/3qGUpKjY) channel and ask for assistance at the **#gpt4all-help** section.

## About the Author 🧑‍💻

gpt4all-ts was created by Conner Swann, founder of Intuitive Systems. Conner is a passionate developer and advocate for democratizing AI models, believing that access to powerful machine learning tools should be available to everyone 🌍. In the words of the modern sage, "When the AI tide rises, all boats should float" 🚣.

You can find Conner on Twitter, sharing insights and occasional shenanigans 🎭 at [@YourBuddyConner](https://twitter.com/YourBuddyConner). While he definitely enjoys being on the bandwagon for advancing AI 🤖, he remains humbly committed to exploring and delivering state-of-the-art technology for everyone's benefit.