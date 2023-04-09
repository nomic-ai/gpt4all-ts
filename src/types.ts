export const SUPPORTED_MODELS = [
    'gpt4all-lora-quantized',
    'gpt4all-lora-unfiltered-quantized'
] as const;
export type Model = typeof SUPPORTED_MODELS[number];
export const isSupportedModel = (model: string): model is Model => 
    SUPPORTED_MODELS.includes(model as Model);

export interface GPT4AllOptions {
    /**
     * The name of the model to use.
     * 
     * @default 'gpt4all-lora-quantized'
     */
    model?: Model;

    forceDownload?: boolean;
    decoderConfig?: Record<string, any>;

    /**
     * Path to the Nomic home directory. This is where downloaded models and
     * gpt4all executables will be stored and loaded from.
     * 
     * @default '~/.nomic'
     */
    nomicHome?: string;
}
