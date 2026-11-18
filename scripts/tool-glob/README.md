# FURU build-tool file matching

Vite, its file watcher and its file enumerator use a glob predicate and path scanner. The Pages publisher also enumerates files with fast-glob, which calls the scanner and the predicate's `.test()` interface. The npm override in the application supplies these build-time interfaces from this private package on Windows, Linux and macOS.

All file matching runs through the project's pinned minimatch 11 segment matcher, backed by `@isaacs/nonrecursive-glob-match`. No pattern-to-JavaScript-RegExp compiler is bundled here. The syntax-only scanner in `lib/scan.js` and its character constants and helpers are from picomatch 4.0.4 under the accompanying MIT license. This package implements the interfaces consumed by FURU's pinned tools. If those tools change, run the file-selection and real Pages publishing checks again.
