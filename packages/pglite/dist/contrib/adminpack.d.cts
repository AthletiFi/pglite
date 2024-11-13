import { d as PGliteInterface } from '../pglite-DHC5nJfj.cjs';

declare const adminpack: {
    name: string;
    setup: (_pg: PGliteInterface, _emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { adminpack };
