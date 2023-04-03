export declare class GPT4All {
    private bot;
    private model;
    private decoderConfig;
    private executablePath;
    private modelPath;
    constructor(model?: string, forceDownload?: boolean, decoderConfig?: Record<string, any>);
    init(forceDownload?: boolean): Promise<void>;
    open(): Promise<void>;
    close(): void;
    private downloadExecutable;
    private downloadModel;
    private downloadFile;
    prompt(prompt: string): Promise<string>;
}
