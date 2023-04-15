export type GPTArguments = {
    seed: number; // RNG seed (default: -1)
    threads: number; // number of threads to use during computation (default: 4)
    n_predict: number; // number of tokens to predict (default: 128)
    top_k: number; // top-k sampling (default: 40)
    top_p: number; // top-p sampling (default: 0.9)
    repeat_last_n: number; // last n tokens to consider for penalize (default: 64)
    repeat_penalty: number; // penalize repeat sequence of tokens (default: 1.3)
    ctx_size: number; // size of the prompt context (default: 2048)
    temp: number; // temperature (default: 0.1)
    batch_size: number; // batch size for prompt processing (default: 8)
    model: string; // model path (default: gpt4all-lora-quantized.bin)
};
