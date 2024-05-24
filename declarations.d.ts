declare var __IS_RECORD_REPLAY_RUNTIME__: boolean | undefined;

declare module "!raw-loader!*" {
  const contents: string;
  export = contents;
}
