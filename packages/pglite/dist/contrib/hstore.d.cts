import { d as PGliteInterface } from '../pglite-DHC5nJfj.cjs';

declare const hstore: {
    name: string;
    setup: (_pg: PGliteInterface, _emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { hstore };
