import { GPTArguments } from './types';
declare const availableModels: readonly ["gpt4all-lora-quantized"];
export type AvailableModels = (typeof availableModels)[number];
export declare class GPT4All {
    private bot;
    private model;
    private decoderConfig;
    private executablePath;
    private modelPath;
    private downloadPromises;
    constructor(model?: AvailableModels, forceDownload?: boolean, decoderConfig?: Partial<GPTArguments>);
    init(forceDownload?: boolean): Promise<void | void[]>;
    open(): Promise<void>;
    close(): void;
    private downloadExecutable;
    private downloadModel;
    private downloadFile;
    prompt(prompt: string): Promise<string>;
}
export {};
//# sourceMappingURL=gpt4all.d.ts.map