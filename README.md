# jupyterlite_remote_kernel

A JupyterLite extension to use a remote kernel

## Requirements

- JupyterLab >= 4.4.0 or Notebook >= 7.4.0

## Install

To install the extension, execute:

```bash
pip install .
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlite_remote_kernel
```

## Testing with jupyterlab kernel

Launch jupyterlab

```bash
jupyter lab --no-browser --port=8888   --ServerApp.token=''   --ServerApp.allow_origin='http://127.0.0.1:8000'   --ServerApp.allow_credentials=True   --ServerApp.disable_check_xsrf=True
```

Build and launch jupyterlite in other terminal

```bash
jupyter lite build
jupyter lite serve
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlite_remote_kernel directory
# Install package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyterlite_remote_kernel
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyterlite-remote-kernel` within that folder.

### Packaging the extension

See [RELEASE](RELEASE.md)
